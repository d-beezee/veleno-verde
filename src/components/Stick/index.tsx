import { useLocalStorage } from "../../LocalStorageProvider";
import StickUnused from "./assets/StickUnused.png";
import StickUsed from "./assets/StickUsed.png";

const Stick = () => {
  const [state, setState] = useLocalStorage();
  if (state.stick === "unused")
    return (
      <img
        src={StickUnused}
        onClick={
          state.beaker === "shaken"
            ? () => setState({ stick: "used" })
            : undefined
        }
        alt="Stick"
      />
    );
  if (state.stick === "used") return <img src={StickUsed} alt="Stick" />;
  return null;
};

export default Stick;
