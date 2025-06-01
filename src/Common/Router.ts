import { Page } from '../Abstract/Interfaces';
import { LogicService } from '../Services/LogicService';

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

		const url = window.location.hash;
		if (url in this.links) {
			this.links[url].renderWithUpdate();
		} else {
			this.links[''].renderWithUpdate();
		}
	}
}
