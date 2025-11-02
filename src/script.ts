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

class App {
	constructor(parent: HTMLElement, private logicService: LogicService) {
		const wrap = new Component(parent, 'div', ['wrapper']);

		new Header(wrap.root, this.logicService);
		const main = new Component(wrap.root, 'main');

		const links = {
			'#': new MainPage(main.root, this.logicService),
			'#cart': new CartPage(main.root, this.logicService),
			'#profile': new Profile(main.root, this.logicService),
			'#shop': new Shop(main.root, this.logicService),
			'#about': new About(main.root, this.logicService),
			'#details': new DetailsPage(main.root, this.logicService),
			'#auth': new AuthPage(main.root, this.logicService),
			'#reg': new RegPage(main.root, this.logicService),
		};

		new Router(links, this.logicService);

		new Footer(wrap.root);
	}
}

declare global {
	interface Window {
		app: App;
	}
}

const dbService = new DBService();
const cookieService = new CookieService();
const logicService = new LogicService(dbService, cookieService);

// Подписка на формирование контента сайта после автоматической авторизации
logicService.addListener('autoAuth', () => {
	if (!window.app) {
		window.app = new App(document.body, logicService);
	}
});

// Вызов метода, который инициирует проверку cookie и автоматическую авторизацию
logicService.updateUser();

// Инициализация приложения происходит только после события 'autoAuth'
// которое генерируется в методе updateUser() после проверки cookie
