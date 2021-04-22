import React from 'react';
import PropTypes from 'prop-types';
import './Asset.scss';

const Asset = ({
	assetName, description, category, tags, isPublished, id, onEdit, onDelete,
}) => (
	<div className={`asset ${isPublished ? 'published' : 'unpublished'}`}>
		<div className="asset-header">
			{category}
			<span className="posted-badge">{isPublished ? 'Published' : 'Unpublished'}</span>
		</div>
		<div className="asset-body">
			<div className="asset-title">
				<h3>{assetName}</h3>
				<div className="tag-container">
					{tags.map((tag) => <span key={tag} className="badge rounded-pill">{tag}</span>)}
				</div>
			</div>
			<p>{description}</p>
			<div className="row">
				<div className="col-6">
					<button type="button" className="btn btn-block btn-primary" onClick={() => onEdit(id)}>Edit</button>
				</div>
				<div className="col-6">
					<button type="button" className="btn btn-block btn-secondary" onClick={() => onDelete(id)}>Remove</button>
				</div>
			</div>
		</div>
	</div>
);

Asset.propTypes = {
	assetName   : PropTypes.string,
	description : PropTypes.string,
	category    : PropTypes.string,
	tags        : PropTypes.array,
	id          : PropTypes.number.isRequired,
	onEdit      : PropTypes.func.isRequired,
	onDelete    : PropTypes.func.isRequired,
	isPublished : PropTypes.bool,
};

Asset.defaultProps = {
	assetName   : 'Untitled',
	description : '',
	category    : '',
	tags        : [],
	isPublished : false,
};

export default Asset;
