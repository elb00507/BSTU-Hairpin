import { Component } from '../Abstract/Component';

export class Header extends Component {
	constructor(parent: HTMLElement) {
		super(parent, 'header', ['header']);

		const headerCont = new Component(this.root, 'div', ['header__cont']);

		new Component(headerCont.root, 'a', ['logo-link'], 'hairpin');

		const headerNav = new Component(headerCont.root, 'div', ['header__nav']);

		new Component(
			headerNav.root,
			'a',
			['header__link'],
			'Shop',
			['href'],
			['#shop']
		);
		new Component(
			headerNav.root,
			'a',
			['header__link'],
			'About',
			['href'],
			['#about']
		);

		new Component(
			headerNav.root,
			'a',
			['header__link--Elirix'],
			'Cart',
			['href'],
			['#cart']
		);

		new Component(
			headerNav.root,
			'a',
			['header__link'],
			'Sign in',
			['href'],
			['#signin']
		);
	}
}
