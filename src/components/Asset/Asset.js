import React, { Component } from 'react';
import './Asset.scss';

class AssetCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			assetName   : 'Travel photos',
			description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, eos',
			category    : 'Photos',
			tags        : ['travel', 'funny', 'photos'],
			isPublished : true,
			/* assetFile   : '', */
		};
	}

	render() {
		const {
			assetName, description, category, tags, isPublished,
		} = this.state;

		return (
			<div className={`asset ${isPublished ? 'published' : 'unpublished'}`}>
				<div className="asset-header">
					{category}
					<span className="posted-badge">{isPublished ? 'Published' : 'Unpublished'}</span>
				</div>
				<div className="asset-body">
					<div className="asset-title">
						<h3>{assetName}</h3>
						<div className="tag-container">
							{tags.map((tag) => <span className="badge rounded-pill">{tag}</span>)}
						</div>
					</div>
					<p>{description}</p>
					<button type="button" className="btn btn-block btn-primary">Edit</button>
				</div>

			</div>
		);
	}
}

export default AssetCard;
