import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

class ConfirmationModal extends Component {
	constructor(props) {
		super(props);

		this.initialState = {
			isOpen    : false,
			dialog    : '',
			onConfirm : () => {},
			onCancel  : () => {},
		};

		this.state = { ...this.initialState };
	}

	openModal = (settings) => {
		this.setState({
			isOpen : true,
			...settings,
		});
	}

	closeModal = () => this.setState({ isOpen : false });

	resetModal = () => this.setState(this.initialState);

	submitAction = (type) => {
		const { onConfirm, onCancel } = this.state;
		this.setState({ isOpen : false });

		if (type === 'confirm') onConfirm();
		else onCancel();
	}

	render() {
		const {
			isOpen, dialog,
		} = this.state;

		return (
			<Modal
				show={isOpen}
				onHide={this.closeModal}
				onExited={this.resetModal}
			>
				<Modal.Header>
					<Modal.Title>
						Confirm Action
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{dialog}
				</Modal.Body>
				<Modal.Footer>
					<button type="button" className="btn btn-xs-block btn-danger" onClick={() => this.submitAction('cancel')}>Cancel</button>
					<button type="button" className="btn btn-primary" onClick={() => this.submitAction('confirm')}>Confirm</button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default ConfirmationModal;
