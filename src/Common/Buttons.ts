import { TTypeGood } from '../Abstract/Types';
import { LogicService } from '../Services/LogicService';
import { Component } from '../Abstract/Component';

export class ButtonTypeGood extends Component {
	constructor(
		parent: HTMLElement,
		service: LogicService,
		private typeGood: TTypeGood
	) {
		super(parent, 'button', ['criteria__button']);

		const imageNumber = this.typeGood.id;
		const imagePath = `../assets/btn${imageNumber}.png`;

		new Component(
			this.root,
			'img',
			['button__img'],
			null,
			['src', 'alt'],
			[imagePath, '']
		);

		console.log(this.typeGood.id);

		new Component(this.root, 'p', ['button__text'], this.typeGood.title);

		this.root.onclick = () => {
			service.updateGoodsByType(typeGood.id.toString());
		};
	}
}
