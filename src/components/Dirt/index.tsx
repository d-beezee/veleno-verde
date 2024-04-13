import { useLocalStorage } from "../../LocalStorageProvider";
import Terra from "./assets/Terra.png";

const Dirt = () => {
  const [state, setState] = useLocalStorage();

  const pour = () => {
    setState({ beaker: "withdirt", dirtUsed: true });
  };

  if (state.dirtUsed) return null;
  return (
    <div>
      <img
        src={Terra}
        alt="Terra"
        onClick={state.beaker === "full" ? pour : undefined}
      />
    </div>
  );
};

export default Dirt;
