import { Component } from '../Abstract/Component';
import { LogicService } from '../Services/LogicService';
import { TGood } from '../Abstract/Types';

export class CartProduct extends Component {
	constructor(
		parent: HTMLElement,
		private service: LogicService,
		private good: TGood
	) {
		super(parent, 'div', ['card']);

		let priceCurrent = Math.floor(this.good.price / 100);

		const contentContainer = new Component(this.root, 'div', [
			'product-card__content',
		]);

		new Component(
			contentContainer.root,
			'div',
			['product-card__description'],
			this.good.title
		);

		new Component(
			contentContainer.root,
			'p',
			['product-card__price'],
			'Стоимость: ' + priceCurrent + ' BYN'
		);

		new Component(
			contentContainer.root,
			'p',
			['cart__text', 'abel'],
			'Категория:'
		);
		new Component(
			contentContainer.root,
			'p',
			['cart__size', 'abel'],
			this.good.valueFields[0][1].toString()
		);

		const imageContainer = new Component(this.root, 'div', [
			'product-card__image-container',
		]);

		const imgComponent = new Component(
			imageContainer.root,
			'img',
			['product-card__image'],
			null,
			['src', 'alt'],
			[(this.good as any).photoLink || 'placeholder.jpg', this.good.title]
		);

		const containerCart = new Component(this.root, 'div', ['card__container']);

		const linCart = new Component(
			contentContainer.root,
			'a',
			['card__button-cart'],
			'В корзину',
			['href'],
			['#cart']
		);
		imgComponent.root.onclick = () => {
			service.openPageDetails(good);
		};
		linCart.root.addEventListener('click', async (e) => {
			e.preventDefault();
			if (
				(linCart.root as HTMLAnchorElement).classList.contains(
					'card__button-cart--disabled'
				)
			) {
				return;
			}
			await this.service.addGoodToBasket(this.good);
			const basket = this.service.getBasket();
			if (basket && basket.goods.some((g) => g.id === String(this.good.id))) {
				window.location.hash = '#cart';
			}
		});

		const updateButtonState = () => {
			const inBasket = !!this.service.getGoodFromBasket(String(this.good.id));
			(linCart.root as HTMLAnchorElement).classList.toggle(
				'card__button-cart--disabled',
				inBasket
			);
		};
		this.service.addListener('basket_update', updateButtonState);
		updateButtonState();
	}
}
