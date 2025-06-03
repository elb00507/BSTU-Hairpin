import { LogicService } from '../Services/LogicService';
import { Component } from '../Abstract/Component';

export class OptionTypeFilter extends Component {
	constructor(
		parent: HTMLElement,
		service: LogicService,
		private property: string
	) {
		super(parent, 'option', [], property, ['value'], [property]);
	}
}
