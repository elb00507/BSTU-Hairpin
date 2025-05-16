import { Component } from '../Abstract/Component';

export class MainPage extends Component {
	constructor(parent: HTMLElement) {
		super(parent, 'section', ['main-page']);

		const imgMaine = new Component(
			this.root,
			'img',
			['imgMain'],
			null,
			['src', 'alt'],
			['../assets/bg-main.png', 'main']
		);

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
}
