import { Component } from '../Abstract/Component';
import { LogicService } from '../Services/LogicService';

export class Header extends Component {
	private menuIcon: Component;
	private isMenuOpen: boolean = false;
	private mobileMenu: HTMLElement;
	private mobileWrapper: HTMLElement;
	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'header', ['header']);

		const headerCont = new Component(this.root, 'div', ['header__cont']);

		new Component(
			headerCont.root,
			'a',
			['logo-link'],
			'hairpin',
			['href'],
			['#']
		);

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

			linkComponent.root.addEventListener('click', () => this.closeMenu());
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

		this.menuIcon.root.addEventListener('click', () => this.toggleMenu());
	}

	private toggleMenu(): void {
		this.isMenuOpen = !this.isMenuOpen;
		this.updateMenuState();
	}

	private closeMenu(): void {
		this.isMenuOpen = false;
		this.updateMenuState();
	}

	private updateMenuState(): void {
		if (this.isMenuOpen) {
			this.mobileMenu.style.display = 'block';
			document.body.style.overflow = 'hidden';
			this.menuIcon.root.classList.add('active');
		} else {
			this.mobileMenu.style.display = 'none';
			document.body.style.overflow = '';
			this.menuIcon.root.classList.remove('active');
		}
	}
}
