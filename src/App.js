import React from 'react';
import { Asset, DetailsModal } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<div className="App">
			<Asset />
			<DetailsModal />
		</div>
	);
}

export default App;
