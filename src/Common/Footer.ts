import { Component } from '../Abstract/Component';

export class Footer extends Component {
	constructor(parent: HTMLElement) {
		super(parent, 'footer', ['footer']);

		const infoContainer = new Component(this.root, 'div', ['footer__info']);

		new Component(
			infoContainer.root,
			'div',
			['footer__name'],
			'Voitsiuk Daria Vitalievna'
		);
		new Component(infoContainer.root, 'div', ['footer__group'], 'ELB-5');
		new Component(
			infoContainer.root,
			'div',
			['footer__address'],
			'Republic of Belarus, Brest'
		);
		new Component(
			infoContainer.root,
			'div',
			['footer__phone'],
			'(8025) 769 66 69'
		);

		const madeOnContainer = new Component(this.root, 'div', [
			'footer__made-on',
		]);

		new Component(
			madeOnContainer.root,
			'span',
			['footer__made-on-text'],
			'Made on'
		);

		new Component(
			madeOnContainer.root,
			'img',
			['footer__figma-logo'],
			null,
			['src', 'alt'],
			['../assets/figma.png', 'figma']
		);

		new Component(
			madeOnContainer.root,
			'span',
			['footer__figma-text'],
			'Figma'
		);
	}
}
