import './App.css';
import LocationAutoComplete from './components/locationautocomplete/locationAutoComplete';
import MapContainer from './components/googlemap/MapContainer';

function App() {
  return (
    <div className="App">
      <LocationAutoComplete />
      <MapContainer />
    </div>
  );
}

export default App;