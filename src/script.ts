import '../src/style.scss';
import { Component } from './Abstract/Component';
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
	}
}

window.app = new App(document.body);
