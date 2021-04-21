import React from 'react';
import AssetList from './pages/AssetList/AssetList';
import { DetailsModal } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<div className="App">
			<AssetList />
			<DetailsModal />
		</div>
	);
}

export default App;
