import { Component } from '../Abstract/Component';
import { LogicService } from '../Services/LogicService';

export class MainPage extends Component {
	stateUpdate: boolean = false;
	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'section', ['main-page']);

		const titleContainerAll = new Component(this.root, 'div', ['main__cont']);

		const titleContainerH1 = new Component(titleContainerAll.root, 'div', [
			'main__container-title1',
		]);

		const titleContainerH2 = new Component(titleContainerAll.root, 'div', [
			'main__container-title2',
		]);

		const Titleh1 = new Component(
			titleContainerH1.root,
			'h1',
			['main__title-one'],
			'A hairpin for the most'
		);

		const titleProd = new Component(
			titleContainerH2.root,
			'h2',
			['main__title-two'],
			'wonderful'
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
