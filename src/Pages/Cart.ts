import { Component } from '../Abstract/Component';
import { LogicService } from '../Services/LogicService';
import { TBasket, TGoodBasket } from '../Abstract/Types';

export class CartPage extends Component {
	stateUpdate: boolean = false;
	private basketContainer: Component | null = null;
	private totalElement: Component | null = null;

	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'div', ['cartpage']);

		new Component(this.root, 'h1', ['cartpage__title'], 'Корзина');

		this.basketContainer = new Component(this.root, 'div', ['cartpage__items']);
		this.totalElement = new Component(
			this.root,
			'div',
			['cartpage__total'],
			''
		);

		this.service.addListener('basket_update', (basket) => {
			this.renderBasket(basket as TBasket);
		});
	}

	renderWithUpdate(): void {
		if (!this.stateUpdate) {
			this.update();
			this.stateUpdate = true;
		}
		this.render();
	}

	update(): void {
		const basket = this.service.getBasket();
		if (basket) {
			this.renderBasket(basket);
		} else {
			// если корзина ещё не подгружена, покажем пустой интерфейс
			this.renderBasket({ id: '', goods: [], total: 0 });
		}
	}

	private renderBasket(basket: TBasket): void {
		if (!this.basketContainer || !this.totalElement) return;

		this.basketContainer.root.innerHTML = '';

		const goods = [...basket.goods].sort((a, b) =>
			a.title.localeCompare(b.title)
		);

		if (!goods.length) {
			new Component(
				this.basketContainer.root,
				'p',
				['cartpage__empty'],
				'Ваша корзина пуста'
			);
		} else {
			goods.forEach((good: TGoodBasket) => {
				const item = new Component(this.basketContainer!.root, 'div', [
					'cartpage__item',
				]);
				new Component(item.root, 'div', ['cartpage__item-title'], good.title);

				const countContainer = new Component(item.root, 'div', [
					'cartpage__item-count',
				]);
				const minusBtn = new Component(
					countContainer.root,
					'button',
					['cartpage__item-count-btn'],
					'-'
				);
				new Component(
					countContainer.root,
					'span',
					['cartpage__item-count-value'],
					String(good.count)
				);
				const plusBtn = new Component(
					countContainer.root,
					'button',
					['cartpage__item-count-btn'],
					'+'
				);

				minusBtn.root.addEventListener('click', () => {
					const newCount = good.count - 1;
					if (newCount <= 0) {
						this.service.removeGoodFromBasket(good.id);
					} else {
						this.service.changeGoodToBasket(good.id, newCount);
					}
				});

				plusBtn.root.addEventListener('click', () => {
					const newCount = good.count + 1;
					this.service.changeGoodToBasket(good.id, newCount);
				});

				const itemSum = Math.floor(good.price * good.count);
				new Component(
					item.root,
					'div',
					['cartpage__item-sum'],
					`Сумма: ${itemSum} BYN`
				);

				const removeBtn = new Component(
					item.root,
					'button',
					['cartpage__item-remove'],
					'Удалить'
				);
				removeBtn.root.addEventListener('click', () => {
					this.service.removeGoodFromBasket(good.id);
				});
			});
		}

		const total = Math.floor(basket.total / 100);
		this.totalElement.root.innerHTML = '';
		new Component(this.totalElement.root, 'span', [], `Итого: ${total} BYN`);

		const payButton = new Component(
			this.totalElement.root,
			'button',
			['cartpage__pay-button'],
			'Оплатить'
		);
		payButton.root.addEventListener('click', () => {
			this.service.closeBasket();
		});
	}
}
