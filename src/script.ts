import '../src/style.scss';
import { Component } from './Abstract/Component';

declare global {
	interface Window {
		app: App;
	}
}

class App {
	constructor(parent: HTMLElement) {
		const wrap = new Component(parent, 'div', ['wrapper']);
	}
}

window.app = new App(document.body);
