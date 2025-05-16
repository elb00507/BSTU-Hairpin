import { Component } from '../Abstract/Component';

export class MainHero extends Component {
	constructor(parent: HTMLElement) {
		super(parent, 'section', ['main-hero']);
	}
}
