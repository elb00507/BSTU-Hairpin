import { Component } from '../Abstract/Component';
import { TGood } from '../Abstract/Types';
import { ButtonTypeGood } from '../Common/Buttons';
import { CartProduct } from '../Common/CartProduct';
import { LogicService } from '../Services/LogicService';

export class Shop extends Component {
	stateUpdate: boolean = false;
	divButtons: null | Component = null;
	divGoods: null | Component = null;
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
			typesGoods.forEach((el, i) => {
				if (this.divButtons)
					new ButtonTypeGood(this.divButtons.root, this.service, el);
			});

			this.service.updateAllGoods();
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
