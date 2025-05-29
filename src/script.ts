import '../src/style.scss';
import { Component } from './Abstract/Component';
import { Footer } from './Common/Footer';
import { Header } from './Common/Header';
import { MainPage } from './Pages/MainPage';
import { DBService } from './Services/DBService';
import { LogicService } from './Services/LogicService';

declare global {
	interface Window {
		app: App;
	}
}

const dbService = new DBService();
const logicService = new LogicService(dbService);

class App {
	constructor(parent: HTMLElement) {
		const wrap = new Component(parent, 'div', ['wrapper']);

		new Header(wrap.root);

		new MainPage(wrap.root);

		new Footer(wrap.root);
	}
}

window.app = new App(document.body);
