import { Component } from '../Abstract/Component';
import { TGood } from '../Abstract/Types';
import { LogicService } from '../Services/LogicService';

export class PhotoAlbum extends Component {
	private mainImage: Component;
	private thumbnails: Component[] = [];
	private countPhoto = 4;
	constructor(parent: HTMLElement, service: LogicService) {
		super(parent, 'div', ['photo-album']);

		this.mainImage = new Component(this.el, 'img', ['photo-album__main']);
		(this.mainImage.el as HTMLImageElement).src = '';

		for (let i = 0; i < this.countPhoto; i++) {
			const thumb = new Component(this.el, 'img', ['photo-album__thumb']);
			(thumb.el as HTMLImageElement).src = '';

			thumb.el.addEventListener('click', () => {
				(this.mainImage.el as HTMLImageElement).src = (
					thumb.el as HTMLImageElement
				).src;
			});

			this.thumbnails.push(thumb);
		}
	}

	update(linksPhoto: string[]) {
		this.thumbnails.forEach((thumb, i) => {
			if (linksPhoto[i]) {
				(thumb.el as HTMLImageElement).src = linksPhoto[i];
				thumb.el.classList.remove('hidden');
			} else {
				(thumb.el as HTMLImageElement).src = '';
				thumb.el.classList.add('hidden');
			}
		});

		if (linksPhoto.length > 0) {
			(this.mainImage.el as HTMLImageElement).src = linksPhoto[0];
		} else {
			(this.mainImage.el as HTMLImageElement).src = '';
		}
	}
}
