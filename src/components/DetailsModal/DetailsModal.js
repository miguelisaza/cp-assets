import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import FileSaver from 'file-saver';
import { ASSET_CATEGORIES, TAG_LIST } from '../../constants';
import { TagPicker, FileBox } from '..';

import './DetailsModal.scss';

class DetailsModal extends Component {
	constructor(props) {
		super(props);

		this.tagList = [...TAG_LIST];

		this.initalState = {
			isOpen            : false,
			isEditing         : false,
			tagCreationToggle : false,
			newTagName        : '',
			form              : {
				id          : null,
				isPublished : false,
				assetName   : '',
				description : '',
				category    : '',
				tags        : [],
				assetFiles  : [],
			},
		};

		this.state = { ...this.initalState };
	}

	openModal = (form = {}, isEditing = false) => {
		this.setState({
			isOpen : true,
			form   : isEditing ? form : { ...this.initalState.form, assetFiles : form?.assetFiles || [] },
			isEditing,
		});
	}

	closeModal = () => this.setState({ isOpen : false });

	resetModal = () => this.setState(this.initalState);

	updateField = ({ target : { name, value } }) => this.setState((prevState) => ({
		form : {
			...prevState.form,
			[name] : value,
		},
	}))

	createTag = () => {
		const { newTagName, form : { tags } } = this.state;

		this.tagList.push(newTagName);

		this.setState((prevState) => ({
			tagCreationToggle : false,
			form              : { ...prevState.form, tags : [...tags, newTagName] },
			newTagName        : '',
		}));
	}

	toggleTagField = () => this.setState((prevState) => ({ tagCreationToggle : !prevState.tagCreationToggle }));

	addTag = ({ target : { value } }) => {
		const { form : { tags } } = this.state;

		const newTag = this.tagList.find((item) => item.toString() === value);
		this.setState((prevState) => ({ form : { ...prevState.form, tags : [...tags, newTag] } }));
	}

	removeTag = (value) => {
		const { form : { tags } } = this.state;
		this.setState((prevState) => ({
			form : {
				...prevState.form,
				tags : tags.filter((item) => item !== value),
			},
		}));
	}

	attachFiles = (files) => {
		const { form : { assetFiles } } = this.state;

		this.setState((prevState) => ({
			form : {
				...prevState.form,
				assetFiles : assetFiles.length !== 0 ? assetFiles.concat(files) : files,
			},
		}));
	}

	downloadFile = (file) => {
		FileSaver.saveAs(file, file.name);
	}

	deleteFile = (file) => {
		this.setState((prevState) => ({
			form : {
				...prevState.form,
				assetFiles : prevState.form.assetFiles.filter((f) => f.name !== file.name),
			},
		}));
	}

	submitAsset = () => {
		const { onSubmit } = this.props;
		const { form } = this.state;

		onSubmit(form);
		this.closeModal();
	}

	render() {
		const {
			isOpen, isEditing, tagCreationToggle, newTagName,
			form : {
				assetName, description, category, tags, assetFiles,
			},
		} = this.state;

		return (
			<Modal
				show={isOpen}
				onHide={this.closeModal}
				onExited={this.resetModal}
			>
				<Modal.Header>
					<Modal.Title>
						{`${isEditing ? 'Edit' : 'Add'} Asset`}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<div className="form-group">
							<label htmlFor="assetName">Name</label>
							<input
								className="form-control"
								id="assetName"
								name="assetName"
								value={assetName}
								onChange={this.updateField}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="description">Description</label>
							<textarea
								className="form-control"
								id="description"
								name="description"
								value={description}
								onChange={this.updateField}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="exampleFormControlSelect1">Category</label>
							<select
								className="form-control"
								id="category"
								name="category"
								value={category}
								onChange={this.updateField}
							>
								<option value="">Select...</option>
								{ASSET_CATEGORIES.map((opt) => (
									<option key={opt} value={opt}>{opt}</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="select-tags">Tags</label>
							<button type="button" onClick={this.toggleTagField} className="btn btn-link float-right">Add tag</button>
							{ tagCreationToggle && (
								<div className="input-group my-2">
									<input
										type="text"
										className="form-control"
										placeholder="New tag name"
										aria-label="New tag name"
										aria-describedby="tag-create"
										onChange={({ target : { value } }) => { this.setState({ newTagName : value }); }}
										onKeyPress={({ key }) => { if (key === 'Enter') this.createTag(); }}
										value={newTagName}
									/>
									<button className="btn btn-outline-primary" type="button" id="tag-create" onClick={this.createTag}>Create</button>
								</div>
							) }
							<TagPicker
								labelText="Tags"
								id="select-tags"
								defaultOption="Select some tags"
								optionList={this.tagList}
								storedOptionList={tags}
								handleOnChange={this.addTag}
								handleOnDelete={this.removeTag}
							/>
						</div>
					</form>
					{ assetFiles.length > 0 && (
						<div>
							<strong>Asset files: </strong>
							{assetFiles.map((file) => (
								<div className="file">
									{file.name}
									<br />
									<button type="button" className="btn btn-link" onClick={() => this.downloadFile(file)}>Download</button>
									<button type="button" className="btn btn-link" onClick={() => this.deleteFile(file)}>Delete</button>
								</div>
							))}
						</div>
					) }
					<FileBox onFileLoad={this.attachFiles} />
				</Modal.Body>
				<Modal.Footer>
					<button type="button" className="btn btn-xs-block btn-danger" onClick={this.closeModal}>Cancel</button>
					<button type="button" className="btn btn-primary" onClick={this.submitAsset}>Save</button>
				</Modal.Footer>
			</Modal>
		);
	}
}

DetailsModal.propTypes = {
	onSubmit : PropTypes.func.isRequired,
};

export default DetailsModal;
