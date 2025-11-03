import '../src/style.scss';
import { Component } from './Abstract/Component';
import { Footer } from './Common/Footer';
import { Header } from './Common/Header';
import { About } from './Pages/About';
import { CartPage } from './Pages/Cart';
import { MainPage } from './Pages/MainPage';
import { Profile } from './Pages/Profile';
import { Shop } from './Pages/Shop';
import { DBService } from './Services/DBService';
import { LogicService } from './Services/LogicService';
import { CookieService } from './Services/CookieService';
import { Router } from './Common/Router';
import { DetailsPage } from './Common/DetailsPage';
import { AuthPage } from './Pages/authpage';
import { RegPage } from './Pages/regpage';

declare global {
	interface Window {
		app: App;
	}
}

class App {
	constructor(parent: HTMLElement, private service: LogicService) {
		const wrapper = new Component(parent, 'div', ['wrapper']);
		const header = new Header(wrapper.root, this.service);
		const main = new Component(wrapper.root, 'main');

		const routes = {
			'#': new MainPage(main.root, this.service),
			'#cart': new CartPage(main.root, this.service),
			'#profile': new Profile(main.root, this.service),
			'#shop': new Shop(main.root, this.service),
			'#about': new About(main.root, this.service),
			'#details': new DetailsPage(main.root, this.service),
			'#auth': new AuthPage(main.root, this.service),
			'#reg': new RegPage(main.root, this.service),
		};

		new Router(routes, this.service);
		new Footer(wrapper.root);
	}
}

const dbService = new DBService();
const cookieService = new CookieService();
const logicService = new LogicService(dbService, cookieService);

logicService.addListener('autoAuth', () => {
	if (!window.app) {
		window.app = new App(document.body, logicService);
	}
});

logicService.updateUser();
