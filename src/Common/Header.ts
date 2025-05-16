import { Component } from '../Abstract/Component';

export class Header extends Component {
	private menuIcon: Component;
	private mobileMenu: HTMLElement;
	private mobileWrapper: HTMLElement;
	constructor(parent: HTMLElement) {
		super(parent, 'header', ['header']);

		const headerCont = new Component(this.root, 'div', ['header__cont']);

		new Component(headerCont.root, 'a', ['logo-link'], 'hairpin');

		const headerNav = new Component(headerCont.root, 'div', ['header__nav']);

		const links = [
			{ text: 'Shop', href: '#shop' },
			{ text: 'About', href: '#about' },
			{ text: 'Cart', href: '#cart' },
			{ text: 'Sign in', href: '#signin' },
		];

		this.mobileMenu = new Component(this.root, 'div', [
			'header__mobile-menu',
		]).root;

		this.mobileWrapper = new Component(this.mobileMenu, 'div', [
			'header__mobile-menu-wrap',
		]).root;

		links.forEach((link) => {
			const linkComponent = new Component(
				this.mobileWrapper,
				'a',
				['header__mobile-link'],
				link.text,
				['href'],
				[link.href]
			);
		});

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
			['header__link'],
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

		this.menuIcon = new Component(this.root, 'div', ['header__menu-icon']);
		this.menuIcon.root.innerHTML = '<span></span><span></span><span></span>';
	}
}
