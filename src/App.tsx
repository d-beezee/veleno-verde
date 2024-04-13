import styled from "styled-components";

import Beaker from "./components/Beaker";
import Dirt from "./components/Dirt";
import Stick from "./components/Stick";
import { clearLocalStorage } from "./LocalStorageProvider";

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function App() {
  return (
    <div className="App">
      <Header>
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
      </Header>
    </div>
  );
}

export default App;
