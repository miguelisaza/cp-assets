/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './FileBox.scss';

class FileBox extends Component {
	uploadFile = ({ target : { files } }) => {
		const { onFileLoad } = this.props;
		onFileLoad(Array.from(files));
	}

	render() {
		return (
			<div className="row justify-content-center text-center">
				<form>
					<div className="form-group files">
						<label>Upload your assets</label>
						<input onChange={this.uploadFile} type="file" className="form-control" multiple />
					</div>
				</form>
			</div>
		);
	}
}

FileBox.propTypes = {
	onFileLoad : PropTypes.func.isRequired,
};

export default FileBox;
