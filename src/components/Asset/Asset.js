import React from 'react';
import PropTypes from 'prop-types';
import './Asset.scss';

const Asset = ({
	assetName, description, category, tags, isPublished, id, onEdit, onDelete, downloadFiles,
}) => (
	<div className={`asset ${isPublished ? 'published' : 'unpublished'}`}>
		<div className="asset-header d-flex d-md-none">
			{category}
			<span className="posted-badge">{isPublished ? 'Published' : 'Unpublished'}</span>
		</div>
		<div className="asset-body row">
			<div className="order-md-1 col-md-2 col-6">
				<span className="asset-name">{assetName}</span>
			</div>
			<div className="order-md-4 col-6 col-md-2 text-right text-md-left p-3">
				<div className="tag-container">
					{tags.map((tag) => <span key={tag} className="badge rounded-pill">{tag}</span>)}
				</div>
			</div>
			<div className="order-md-2 col-md-4">
				<p>{description}</p>
			</div>
			<div className="order-md-3 d-none d-md-block col-2">
				{category}
			</div>
			<div className="order-md-5 col-md-2">
				<button type="button" className="btn btn-block btn-link" onClick={() => downloadFiles(id)}>Download Files</button>
				<button type="button" className="btn btn-block btn-primary" onClick={() => onEdit(id)}>Edit</button>
				<button type="button" className="btn btn-block btn-secondary" onClick={() => onDelete(id)}>Remove</button>
			</div>
		</div>
	</div>
);

Asset.propTypes = {
	assetName     : PropTypes.string,
	description   : PropTypes.string,
	category      : PropTypes.string,
	tags          : PropTypes.array,
	id            : PropTypes.number.isRequired,
	onEdit        : PropTypes.func.isRequired,
	onDelete      : PropTypes.func.isRequired,
	downloadFiles : PropTypes.func.isRequired,
	isPublished   : PropTypes.bool,
};

Asset.defaultProps = {
	assetName   : 'Untitled',
	description : '',
	category    : '',
	tags        : [],
	isPublished : false,
};

export default Asset;
