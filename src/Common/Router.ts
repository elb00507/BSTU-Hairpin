import { Page } from '../Abstract/Interfaces';
import { LogicService } from '../Services/LogicService';
import { DetailsPage } from './DetailsPage';

export class Router {
	constructor(
		public links: Record<string, Page>,
		private service: LogicService
	) {
		window.onhashchange = () => {
			this.openPage();
		};
		this.openPage();
	}

	openPage(): void {
		Object.values(this.links).forEach((page) => {
			page.remove();
		});

		const url = window.location.hash.slice(1);
		switch (url) {
			case 'shop':
				this.links['#shop'].renderWithUpdate();
				break;
			case 'details':
				if ((this.links['#details'] as DetailsPage).isGoodInDetailsPage()) {
					this.links['#details'].renderWithUpdate();
				} else {
					window.location.hash = '#shop';
				}
				break;
			case 'cart':
				this.links['#cart'].renderWithUpdate();
				break;
			case 'profile':
				this.links['#profile'].renderWithUpdate();
				break;
			default:
				this.links['#'].renderWithUpdate();
				break;
		}
	}
}
