import React, { Component } from 'react';
import {
	Carousel, Media
} from 'react-bootstrap';

export default class HomepageCarousel extends Component {
	constructor() {
	    super();
	    this.state = {
	       index: 0,
	       direction: null
	    };
	}

	handleSelect(selectedIndex, e) {
	    this.state = {
	        index: selectedIndex,
	        direction: e.direction
	    };
	}

	render() {
		return (
			<Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
				<Carousel.Item>
					<Media>
						<Media.Left>
							<a href="/profile">
								<img src="images/default.png" alt="..." />
							</a>
						</Media.Left>
						<Media.Body>
							<Media.Heading><a href="/freelancers/johndoe">John Doe</a></Media.Heading>
							A Project for Feeding America and the San Diego Food Bank.
						</Media.Body>
					</Media>
				</Carousel.Item>
				<Carousel.Item>
					<Media>
						<Media.Left>
							<a href="/profile">
								<img src="images/default.png" alt="..." />
							</a>
						</Media.Left>
						<Media.Left>
							<Media.Heading><a href="/freelancers/janedoe">Jane Doe</a></Media.Heading>
							A Project for Feeding America and the San Diego Food Bank.
						</Media.Left>
					</Media>
				</Carousel.Item>
				<Carousel.Item>
					<Media>
						<Media.Left>
							<a href="/profile">
								<img src="images/default.png" alt="..." />
							</a>
						</Media.Left>
						<Media.Body>
							<Media.Heading><a href="/freelancers/arther">Arther</a></Media.Heading>
							A Project for Feeding America and the San Diego Food Bank.
						</Media.Body>
					</Media>
				</Carousel.Item>
			</Carousel>
		);
	}
}
