import { Component } from '../Abstract/Component';
import { TGood } from '../Abstract/Types';
import { LogicService } from '../Services/LogicService';
export class DetailsPage extends Component {
	stateUpdate: boolean = false;
	private good: TGood | null = null;

	imgItem: Component;
	itemPrice: Component;
	h2Name: Component;
	desc: Component;
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

		this.imgItem = new Component(detlContainer.root, 'img');
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

	update(): void {
		if (!this.good) return;

		this.imgItem.root.setAttribute('src', this.good.photoLink);
		this.itemPrice.root.textContent =
			Math.floor(this.good.price / 100).toString() + ' BYN';
		this.h2Name.root.textContent = this.good.title;
		this.desc.root.innerHTML = this.good.valueFields[1][1].toString();
	}

	isGoodInDetailsPage(): boolean {
		return this.good ? true : false;
	}
}
