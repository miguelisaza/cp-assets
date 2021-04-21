/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Asset, DetailsModal } from '../../components';

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

	render() {
		const { assetList } = this.state;
		return (
			<div id="asset-list">
				{ assetList.map((asset) => (
					<Asset {...asset} onEdit={this.editAsset} />
				)) }
				<DetailsModal
					onSubmit={this.saveAsset}
					ref={(ref) => { this._detailsModal = ref; }}
				/>
				<div className="text-center">
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => this._detailsModal.openModal()}

					>Add asset with modal
					</button>
				</div>
			</div>
		);
	}
}

export default AssetList;
