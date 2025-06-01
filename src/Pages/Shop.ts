import { Component } from '../Abstract/Component';
import { LogicService } from '../Services/LogicService';

export class Shop extends Component {
	stateUpdate: boolean = false;
	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'div', ['catalog']);

		new Component(
			this.root,
			'h1',
			['catalog__title'],
			'Эта страница для отображения каталога товаров'
		);
	}

	renderWithUpdate(): void {
		if (!this.stateUpdate) {
			this.update();
			this.stateUpdate = true;
		}
		this.render();
	}

	update(): void {}
}
