/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import FileSaver from 'file-saver';
import {
	Asset, DetailsModal, ConfirmationModal, FileBox,
} from '../../components';

import './AssetList.scss';

class AssetList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			assetList : [
				{
					id          : 0,
					isPublished : true,
					assetName   : 'Travel photos',
					description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, eos',
					category    : 'Photos',
					tags        : ['travel', 'funny', 'photos'],
					assetFiles  : [],
				},
			],
		};
	}

	saveAsset = (asset) => {
		const { id } = asset;

		if (typeof id === 'number') {
			this.setState((prevState) => {
				const editIndex = prevState.assetList.findIndex((a) => a.id === id);
				const newList = [...prevState.assetList];

				newList[editIndex] = asset;

				return { assetList : newList };
			});
		} else {
			this.setState((prevState) => ({
				assetList : [
					...prevState.assetList,
					{ ...asset, id : prevState.assetList.length },
				],
			}));
		}
	}

	editAsset = (id) => {
		const { assetList } = this.state;

		this._detailsModal.openModal(assetList.find((asset) => asset.id === id), true);
	}

	deleteAsset = (id) => {
		this._confirmationModal.openModal({
			dialog    : 'Are you sure you want to delete this asset?, all the associated files will be deleted.',
			onConfirm : () => { this.setState((prevState) => ({ assetList : prevState.assetList.filter((asset) => asset.id !== id) })); },
			onCancel  : () => {},
		});
	}

	receiveFiles = (files) => {
		this._detailsModal.openModal({ assetFiles : files });
	}

	downloadAssetFiles = (id) => {
		const { assetList } = this.state;
		assetList.find((asset) => asset.id === id).assetFiles.forEach((file) => {
			FileSaver.saveAs(file, file.name);
		});
	}

	render() {
		const { assetList } = this.state;
		return (
			<div className="container">
				<h1 className="text-center my-2">Asset List</h1>
				<div className="d-none d-md-flex justify-content-center mb-3">
					<div className="d-flex mx-3">
						<span className="dot green" />
						Published
					</div>
					<div className="d-flex mx-3">
						<span className="dot red" /> Unpublished
					</div>
				</div>
				<div id="list-header" className="d-none d-md-flex">
					<div className="col-2">Name</div>
					<div className="col-4">Description</div>
					<div className="col-2">Category</div>
					<div className="col-2">Tags</div>
					<div className="col-2">Actions</div>
				</div>
				<div id="asset-list">
					{ assetList.map((asset) => (
						<Asset
							{...asset}
							key={asset.id}
							onEdit={this.editAsset}
							onDelete={this.deleteAsset}
							downloadFiles={this.downloadAssetFiles}
						/>
					)) }
				</div>
				<div className="text-center my-2">
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => this._detailsModal.openModal()}

					>Add a new asset with this modal
					</button>
					<br />
					or
				</div>
				<FileBox onFileLoad={this.receiveFiles} />
				<DetailsModal
					onSubmit={this.saveAsset}
					ref={(ref) => { this._detailsModal = ref; }}
				/>
				<ConfirmationModal ref={(ref) => { this._confirmationModal = ref; }} />
			</div>
		);
	}
}

export default AssetList;
