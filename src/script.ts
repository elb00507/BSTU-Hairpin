import '../src/style.scss';
import { Component } from './Abstract/Component';
import { Footer } from './Common/Footer';
import { Header } from './Common/Header';

declare global {
	interface Window {
		app: App;
	}
}

class App {
	constructor(parent: HTMLElement) {
		const wrap = new Component(parent, 'div', ['wrapper']);

		new Header(wrap.root);

		new Footer(wrap.root);
	}
}

window.app = new App(document.body);
