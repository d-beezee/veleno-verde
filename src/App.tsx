import "./App.css";

import { useEffect, useState } from "react";
import styled from "styled-components";

import CaretRight from "./caret-right.png";
import Beaker from "./components/Beaker";
import Dirt from "./components/Dirt";
import Stick from "./components/Stick";
import { clearLocalStorage } from "./LocalStorageProvider";

const Header = styled.header`
  background-color: #282c34;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SidebarComponent = ({
  isOpen,
  setIsOpen,
  className,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={className}>
      <div className="items">{children}</div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img className="caret" src={CaretRight} alt="" />
      </button>
    </div>
  );
};
const Sidebar = styled(SidebarComponent)`
  height: 100vh;
  .items {
    top: 0;
    height: 100vh;
    background-color: #fff;
    position: absolute;
    width: 20%;
    right: ${({ isOpen }) => (isOpen ? "0" : "-20%")};
    > * {
      max-width: 100%;
    }
  }
  button {
    position: absolute;
    right: ${({ isOpen }) => (isOpen ? "20%" : "0")};
    top: 0;
    border: 0;
    border-radius: 15px 0 0 15px;
    display: flex;
    background-color: #fff;
  }
  .caret {
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

function App() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <div className="App">
      <Header>
        <div className="container">
          <Beaker />
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
            <Dirt />
            <Stick />
          </Sidebar>
        </div>
        <button
          style={{
            bottom: 0,
            position: "absolute",
            left: 0,
            right: 0,
            fontSize: "120%",
            width: "100%",
          }}
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
