import { Observer } from '../Abstract/Observer';
import { DBService } from './DBService';
import { CookieService } from './CookieService';
import {
	TGood,
	TTypeField,
	TTypeGood,
	TValueField,
	TGoodResponse,
	TCustomer,
	TBasket,
	TGoodBasket,
} from '../Abstract/Types';

export class LogicService extends Observer {
	private originalGoods: TGoodResponse[] | null = null;
	private filteredGoods: TGoodResponse[] | null = null;
	private currentFilter: string | null = null;
	private currentSortAsc: boolean | null = null;
	private basket: TBasket | null = null;
	userCustomer: TCustomer | null = null;
	constructor(
		private dbService: DBService,
		private cookieService: CookieService
	) {
		super();
	}

	async getTypesGoods(): Promise<TTypeGood[]> {
		const data = await this.dbService.getTypesGoods();
		return data.types;
	}

	async updateGoodsByType(idGood: string): Promise<void> {
		const data = await this.dbService.getGoodsByType(idGood.toString());
		const goods = data.goods;
		goods.forEach((good) => {
			(good as TGood)['fields'] = this.joinTypesWithValues(
				good.typeFields,
				good.valueFields
			);
		});
		this.originalGoods = goods;
		if (this.currentFilter) {
			this.filteredGoods = goods.filter(
				(good) => good.valueFields[0][1] === this.currentFilter
			);

			if (this.currentSortAsc !== null) {
				this.filteredGoods = [...this.filteredGoods].sort((a, b) =>
					this.currentSortAsc ? a.price - b.price : b.price - a.price
				);
			}
		} else {
			this.filteredGoods = goods;
		}

		this.disptach('updateGoodseOnPage', this.filteredGoods);
	}

	private joinTypesWithValues(
		arrTypes: TTypeField[],
		arrValues: TValueField[]
	): Record<string, string | number | Date> {
		const lenArr = arrTypes.length;
		const goodJson = {} as Record<string, string | number | Date>;
		for (let i = 0; i < lenArr; i++) {
			goodJson[arrTypes[i][1]] = arrValues[i][1];
		}
		return goodJson;
	}

	sortGoodsByPrice(bool: boolean): void {
		if (!this.filteredGoods) return;

		this.currentSortAsc = bool;
		this.filteredGoods = [...this.filteredGoods].sort((a, b) =>
			bool ? a.price - b.price : b.price - a.price
		);

		this.disptach('updateGoodseOnPage', this.filteredGoods);
	}

	filterItemByTypeParfym(type: string): void {
		if (!this.originalGoods) return;

		if (type === 'all') {
			this.currentFilter = null;
			this.filteredGoods = [...this.originalGoods];
		} else {
			this.currentFilter = type;
			this.filteredGoods = this.originalGoods.filter(
				(good) => good.valueFields[0][1] === type
			);
		}

		if (this.currentSortAsc !== null) {
			this.sortGoodsByPrice(this.currentSortAsc);
		}

		this.disptach('updateGoodseOnPage', this.filteredGoods);
	}

	openPageDetails(good: TGood): void {
		this.disptach('updatePageDetails', good);
		window.location.hash = '#details';
	}

	openPageCatalog(): void {
		this.disptach('updateGoodseOnPage');
		window.location.hash = '#shop';
	}

	registationCustomer(
		name: string,
		email: string,
		mobile: string,
		operatorType: string,
		adress: string
	): void {
		this.dbService
			.registationCustomer(name, email, mobile, operatorType, adress)
			.then((response) => {
				if (response) {
					this.disptach('confirm_registration', response);
				} else {
					alert('Сбой регистрации');
				}
			});
	}

	confirmRegistrationCustomer(customerId: string, code: string): void {
		this.dbService
			.confirmRegistrationCustomer(customerId, code)
			.then((response) => {
				if (response) {
					if (response.error.code === 0) {
						this.cookieService.saveUser(customerId, code);
						this.refreshBasket();
					}
					this.disptach('end_registration', response);
				} else {
					alert('Сбой регистрации');
				}
			});
	}

	identificationCustomer(customerId: string): void {
		this.dbService.identificationCustomer(customerId).then((response) => {
			if (response) {
				this.disptach('confirm_identification', response);
			} else {
				alert('Сбой авторизации');
			}
		});
	}

	confirmIdentificationCustomer(customerId: string, code: string): void {
		this.dbService
			.confirmIdentificationCustomer(customerId, code)
			.then(async (response) => {
				if (response) {
					if (response.error.code === 0) {
						this.userCustomer = response.customer;
						this.cookieService.saveUser(customerId, code);
						await this.refreshBasket();
					}
					this.disptach('end_identification', response);
				} else {
					alert('Сбой авторизации');
				}
			});
	}

	async updateUser(): Promise<void> {
		const userData = this.cookieService.getUser();

		if (userData?.userId && userData?.code) {
			try {
				const response = await this.dbService.confirmIdentificationCustomer(
					userData.userId,
					userData.code
				);

				if (response?.error.code === 0) {
					this.userCustomer = response.customer;
					await this.refreshBasket();
					this.disptach('autoAuth');
				} else {
					this.cookieService.clearUser();
					this.disptach('autoAuth');
				}
			} catch (error) {
				console.error('Ошибка при автоматической авторизации:', error);
				this.cookieService.clearUser();
				this.disptach('autoAuth');
			}
		} else {
			this.disptach('autoAuth');
		}
	}

	getUserCustomer(): TCustomer | null {
		return this.userCustomer;
	}

	logout(): void {
		this.cookieService.clearUser();
		this.userCustomer = null;
		this.disptach('logout');
	}

	getBasket(): TBasket | null {
		return this.basket;
	}

	async loadBasketIfNeeded(): Promise<void> {
		if (this.userCustomer && !this.basket) {
			await this.refreshBasket();
		}
	}

	getGoodFromBasket(goodId: string): TGoodBasket | null {
		if (!this.basket) return null;
		const good = this.basket.goods.find((g) => g.id === goodId);
		return good || null;
	}

	private async refreshBasket(): Promise<void> {
		if (!this.userCustomer) {
			console.warn(
				'Попытка загрузить корзину без авторизованного пользователя'
			);
			return;
		}
		try {
			const basket = await this.dbService.getBasket(this.userCustomer.id);
			this.basket = basket;
			this.disptach('basket_update', basket);
		} catch (e) {
			console.error('Ошибка получения корзины', e);
			// Устанавливаем пустую корзину при ошибке
			this.basket = { id: '', goods: [], total: 0 };
			this.disptach('basket_update', this.basket);
		}
	}

	async addGoodToBasket(good: TGood): Promise<void> {
		if (!this.userCustomer) return;

		const goodId = String(good.id);
		const oldGood = this.getGoodFromBasket(goodId);
		if (oldGood) return;

		const response = await this.dbService.addGoodToBasket(
			this.userCustomer.id,
			goodId,
			1
		);

		if (response.error.code === 0) {
			await this.refreshBasket();
		} else {
			alert(response.error.message);
		}
	}

	async removeGoodFromBasket(goodId: string): Promise<void> {
		if (!this.userCustomer) return;

		const response = await this.dbService.addGoodToBasket(
			this.userCustomer.id,
			goodId,
			0
		);

		if (response.error.code === 0) {
			await this.refreshBasket();
		} else {
			alert(response.error.message);
		}
	}

	async changeGoodToBasket(goodId: string, count: number): Promise<void> {
		if (!this.userCustomer) return;

		const response = await this.dbService.addGoodToBasket(
			this.userCustomer.id,
			goodId,
			count
		);

		if (response.error.code === 0) {
			await this.refreshBasket();
		} else {
			alert(response.error.message);
		}
	}

	async closeBasket(): Promise<void> {
		if (!this.userCustomer) return;

		const response = await this.dbService.closeBasket(this.userCustomer.id);

		if (response.error.code === 0) {
			await this.refreshBasket();
		} else {
			alert(response.error.message);
		}
	}
}
