import { Component } from '../Abstract/Component';
import { TGood } from '../Abstract/Types';

export class PhotoAlbum extends Component {
	setImage: Component[] = [];
	setDivImage: Component[] = [];
	countPhoto = 3;
	constructor(parent: HTMLElement, private goods: TGood[]) {
		super(parent, 'div', ['photo-album']);
	}
}
