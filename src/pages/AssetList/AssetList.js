/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Asset, DetailsModal, ConfirmationModal } from '../../components';

class AssetList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			assetList : [
				{
					id          : 0,
					assetName   : 'Travel photos',
					description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, eos',
					category    : 'Photos',
					tags        : ['travel', 'funny', 'photos'],
					isPublished : true,
					/* assetFile   : '', */
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

		this._detailsModal.openModal(assetList.find((asset) => asset.id === id));
	}

	deleteAsset = (id) => {
		this._confirmationModal.openModal({
			dialog    : 'Are you sure you want to delete this asset?, all the associated files will be deleted.',
			onConfirm : () => { this.setState((prevState) => ({ assetList : prevState.assetList.filter((asset) => asset.id !== id) })); },
			onCancel  : () => {},
		});
	}

	render() {
		const { assetList } = this.state;
		return (
			<div id="asset-list">
				{ assetList.map((asset) => (
					<Asset {...asset} onEdit={this.editAsset} onDelete={this.deleteAsset} />
				)) }
				<div className="text-center">
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => this._detailsModal.openModal()}

					>Add asset with modal
					</button>
				</div>
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
