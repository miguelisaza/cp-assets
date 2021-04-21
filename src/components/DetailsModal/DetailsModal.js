import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { ASSET_CATEGORIES, TAG_LIST } from '../../constants';
import { TagPicker } from '..';

class DetailsModal extends Component {
	constructor(props) {
		super(props);

		this.initalState = {
			isOpen    : false,
			isEditing : false,
			form      : {
				id          : null,
				assetName   : '',
				description : '',
				category    : '',
				tags        : [],
			},
		};

		this.state = { ...this.initalState };
	}

	openModal = (form = {}) => {
		const isEditing = Object.entries(form).length > 0;

		this.setState({ isOpen : true, form : isEditing ? form : this.initalState.form, isEditing });
	}

	closeModal = () => this.setState({ isOpen : false });

	resetModal = () => this.setState(this.initalState);

	updateField = ({ target : { name, value } }) => this.setState((prevState) => ({
		form : {
			...prevState.form,
			[name] : value,
		},
	}))

	addTag = ({ target : { value } }) => {
		const { form : { tags } } = this.state;

		const newTag = TAG_LIST.find((item) => item.toString() === value);
		this.setState((prevState) => ({ form : { ...prevState.form, tags : [...tags, newTag] } }));
	}

	removeTag = (value) => {
		this.setState((prevState) => ({
			form : {
				...prevState.form,
				tags : prevState.tags.filter((item) => item !== value),
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
			isOpen, isEditing, form : {
				assetName, description, category, tags,
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
							<TagPicker
								labelText="Tags"
								id="select-tags"
								defaultOption="Select some tags"
								optionList={TAG_LIST}
								storedOptionList={tags}
								handleOnChange={this.addTag}
								handleOnDelete={this.removeTag}
							/>
						</div>
					</form>
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
