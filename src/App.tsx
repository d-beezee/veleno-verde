import "./App.css";

import Beaker from "./components/Beaker";
import Dirt from "./components/Dirt";
import Stick from "./components/Stick";
import { clearLocalStorage } from "./LocalStorageProvider";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <Beaker />
          <Dirt />
          <Stick />
        </div>
        <button
          onClick={() => {
            clearLocalStorage();
            window.location.reload();
          }}
        >
          Reset
        </button>
      </header>
    </div>
  );
}

export default App;
