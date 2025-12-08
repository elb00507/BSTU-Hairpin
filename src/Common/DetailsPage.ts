import { Component } from '../Abstract/Component';
import { TGood } from '../Abstract/Types';
import { LogicService } from '../Services/LogicService';
import { PhotoAlbum } from './photoAlbum';
export class DetailsPage extends Component {
	stateUpdate: boolean = false;
	private good: TGood | null = null;
	photoAlbum: PhotoAlbum;
	itemPrice: Component;
	h2Name: Component;
	desc: Component;
	private cartButton: Component | null = null;
	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'div', ['details__pages', 'abel']);

		const btnBack = new Component(
			this.root,
			'button',
			['details__pages-back'],
			null
		);
		new Component(
			btnBack.root,
			'img',
			['img--back'],
			null,
			['src'],
			['../assets/left-arrow.svg']
		);

		const detlContainer = new Component(this.root, 'div', [
			'details__container',
		]);

		this.photoAlbum = new PhotoAlbum(detlContainer.root, service);

		const infContainer = new Component(detlContainer.root, 'div', [
			'inf__container',
		]);
		this.h2Name = new Component(infContainer.root, 'h2');
		this.desc = new Component(infContainer.root, 'p');

		const priceItem = new Component(infContainer.root, 'div', ['price-item']);
		new Component(priceItem.root, 'p', ['details__pages-price'], 'Цена: ');
		this.itemPrice = new Component(priceItem.root, 'p', [
			'details__pages_price',
		]);

		this.cartButton = new Component(
			infContainer.root,
			'button',
			['card__button-cart', 'details__cart-button'],
			'В корзину'
		);

		this.cartButton.root.addEventListener('click', async () => {
			if (!this.good) return;
			if (
				(this.cartButton!.root as HTMLButtonElement).classList.contains(
					'card__button-cart--disabled'
				)
			) {
				return;
			}
			await this.service.addGoodToBasket(this.good);
			this.updateButtonState();
		});

		const updateButtonState = () => {
			this.updateButtonState();
		};
		this.service.addListener('basket_update', updateButtonState);

		service.addListener('updatePageDetails', (good) => {
			this.good = good as TGood;
			this.update();
		});

		btnBack.root.onclick = () => {
			service.openPageCatalog();
		};
	}

	renderWithUpdate(): void {
		if (!this.stateUpdate) {
			this.update();
			this.stateUpdate = true;
		}
		this.render();
	}

	async update(): Promise<void> {
		if (!this.good) return;

		this.itemPrice.root.textContent =
			Math.floor(this.good.price / 100).toString() + ' BYN';
		this.h2Name.root.textContent = this.good.title;
		this.desc.root.innerHTML = this.good.valueFields[1][1].toString();
		this.photoAlbum.update([this.good.photoLink, ...this.good.slider]);
		
		await this.service.loadBasketIfNeeded();
		this.updateButtonState();
	}

	private updateButtonState(): void {
		if (!this.cartButton || !this.good) return;

		const inBasket = !!this.service.getGoodFromBasket(String(this.good.id));
		(this.cartButton.root as HTMLButtonElement).classList.toggle(
			'card__button-cart--disabled',
			inBasket
		);
	}

	isGoodInDetailsPage(): boolean {
		return this.good ? true : false;
	}
}
