import { Component } from '../Abstract/Component';
import { LogicService } from '../Services/LogicService';

export class Profile extends Component {
	stateUpdate: boolean = false;
	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'div', ['catalog']);

		new Component(
			this.root,
			'h1',
			['catalog__title'],
			'Эта страница для отображения профиля пользователя'
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
