import { Component } from '../Abstract/Component';
import { TGood, TTypeGood } from '../Abstract/Types';
import { ButtonTypeGood } from '../Common/Buttons';
import { CartProduct } from '../Common/CartProduct';
import { LogicService } from '../Services/LogicService';
import { SelectTypeSort } from '../Common/SelectTypeSort';
import { SelectTypeFilter } from '../Common/SelectTypeFilter';

export class Shop extends Component {
	stateUpdate: boolean = false;
	divButtons: null | Component = null;
	divGoods: null | Component = null;
	divSort: null | Component = null;
	divFilter: null | Component = null;
	goods: TGood[] = [];
	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'div', ['catalog']);

		const divData = new Component(this.root, 'div', ['catalog__wrapperDesc']);
		this.divButtons = new Component(divData.root, 'div', ['catalog__buttons']);

		new Component(
			this.root,
			'img',
			['img__catalog'],
			null,
			['src', 'alt'],
			['../assets/bg-shop.png', 'alt']
		);

		new Component(this.root, 'h1', ['catalog__title'], 'SHOP');
		const divLine = new Component(divData.root, 'div', ['catalog__line']);
		this.divSort = new Component(divLine.root, 'div', ['catalog__sort']);
		this.divFilter = new Component(divLine.root, 'div', ['catalog__filter']);
		const divContainer = new Component(this.root, 'div', ['container__cart']);
		this.divGoods = new Component(divContainer.root, 'div', ['catalog__goods']);

		service.addListener('updateGoodseOnPage', (goods) => {
			if (goods) this.updateGoodseOnPage(goods as TGood[]);
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
		this.service.getTypesGoods().then((typesGoods) => {
			if (this.divButtons && this.divSort && this.divFilter) {
				const allGoodsButton: TTypeGood = {
					id: 0,
					title: 'Все товары',
					typeFields: [],
				};
				new ButtonTypeGood(this.divButtons.root, this.service, allGoodsButton);
				typesGoods.forEach((typeGood) => {
					if (this.divButtons)
						new ButtonTypeGood(this.divButtons.root, this.service, typeGood);
				});
				new SelectTypeSort(this.divSort.root, this.service, typesGoods);
				new SelectTypeFilter(this.divFilter.root, this.service, 'Категория', [
					'Premium',
					'Standart',
					'Econom',
				]);
			}

			this.service.updateGoodsByType('');
		});
	}
	updateGoodseOnPage(goods: TGood[]) {
		const divGoods = this.divGoods;
		if (divGoods) {
			divGoods.root.innerHTML = '';
			goods.forEach((good) => {
				const cart = new CartProduct(divGoods.root, this.service, good);
			});
		}
	}
}
