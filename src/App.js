import ZipInputForm from "./components/form";
import Tile from "./components/tile";


function App() {
	return (
		<div className="weather-app">
			<ZipInputForm />
			<Tile />
		</div>
	);
}

export default App;
