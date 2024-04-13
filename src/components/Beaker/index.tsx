import { useEffect, useState } from "react";
import useSound from "use-sound";

import { State, useLocalStorage } from "../../LocalStorageProvider";
import Caraffa1 from "./assets/Caraffa1.png";
import Caraffa2 from "./assets/Caraffa2.png";
import Caraffa3 from "./assets/Caraffa3.png";
import Caraffa4 from "./assets/Caraffa4.png";
import CaraffaConTerra from "./assets/CaraffaConTerra.png";
import CaraffaConTerraSciolta from "./assets/CaraffaConTerraSciolta.png";
import CaraffaVuota from "./assets/CaraffaVuota.png";
import filling from "./assets/filling.mp3";

function Beaker() {
  const [state, setState] = useLocalStorage();
  const [status, setStatus] = useState<State["beaker"]>("empty");
  const [level, setLevel] = useState(0);
  const [play] = useSound(filling);

  function fill() {
    setStatus("filling");
  }
  function shake() {
    setState({ beaker: "shaken" });
  }

  useEffect(() => {
    setStatus(state.beaker);
  }, [state.beaker]);

  useEffect(() => {
    if (status === "filling") {
      if (level === 0) {
        play();
        setTimeout(() => {
          setLevel(1);
        }, 1100);
      } else if (level === 1) {
        setTimeout(() => {
          setLevel(2);
        }, 700);
      } else if (level === 2) {
        setTimeout(() => {
          setLevel(3);
        }, 700);
      } else if (level === 3) {
        setTimeout(() => {
          setLevel(4);
          setStatus("full");
          setState({ beaker: "full" });
        }, 700);
      }
    }
  }, [status, level, play, setState]);

  return (
    <div>
      <BeakerImage status={status} filling={level} fill={fill} shake={shake} />
    </div>
  );
}

const BeakerImage = ({
  status,
  filling,
  fill,
  shake,
}: {
  status: State["beaker"];
  filling: number;
  fill: () => void;
  shake: () => void;
}) => {
  if (status === "empty")
    return <img onClick={fill} src={CaraffaVuota} alt="beaker" />;
  if (status === "full") return <img src={Caraffa4} alt="beaker" />;
  if (status === "withdirt")
    return <img onClick={shake} src={CaraffaConTerra} alt="beaker" />;
  if (status === "shaken")
    return <img src={CaraffaConTerraSciolta} alt="beaker" />;
  if (filling === 0) return <img src={Caraffa1} alt="beaker" />;
  if (filling === 1) return <img src={Caraffa2} alt="beaker" />;
  if (filling === 2) return <img src={Caraffa3} alt="beaker" />;
  if (filling === 3) return <img src={Caraffa4} alt="beaker" />;
  return null;
};

export default Beaker;
