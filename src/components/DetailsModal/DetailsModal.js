import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ASSET_CATEGORIES, TAG_LIST } from '../../constants';
import { TagPicker } from '..';

class DetailsModal extends Component {
	constructor(props) {
		super(props);

		this.initalState = {
			isOpen      : true,
			isEditing   : false,
			assetName   : '',
			description : '',
			category    : '',
			tags        : [],
		};

		this.state = { ...this.initalState };
	}

	closeModal = () => this.setState(this.initalState);

	updateField = ({ target : { name, value } }) => this.setState({ [name] : value })

	addTag = ({ target : { value } }) => {
		const { tags } = this.state;

		const newTag = TAG_LIST.find((item) => item.toString() === value);
		this.setState({ tags : [...tags, newTag] });
	}

	removeTag = (value) => {
		this.setState((prevState) => ({
			tags : prevState.tags.filter((item) => item !== value),
		}));
	}

	render() {
		const {
			isOpen, isEditing, assetName, description, category, tags,
		} = this.state;
		return (
			<Modal show={isOpen} onHide={this.closeModal}>
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
					<button type="button" className="btn btn-primary">Save</button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default DetailsModal;
