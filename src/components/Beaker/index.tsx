import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import useSound from "use-sound";

import ItemTypes from "../../ItemTypes";
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
  const [shakeLevel, setShakeLevel] = useState(0);
  const [level, setLevel] = useState(0);
  const [play] = useSound(filling);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BEAKER_INGREDIENT,
    drop: () => ({ name: ItemTypes.BEAKER }),
  }));

  function fill() {
    setStatus("filling");
  }
  function shake() {
    if (shakeLevel >= 10) {
      setState({ beaker: "shaken" });
      return;
    }
    setShakeLevel(shakeLevel + 1);
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
    <div ref={drop}>
      <BeakerImage
        shakeLevel={shakeLevel}
        status={status}
        filling={level}
        fill={fill}
        shake={shake}
      />
    </div>
  );
}

const BeakerImage = ({
  status,
  filling,
  fill,
  shake,
  shakeLevel,
}: {
  status: State["beaker"];
  filling: number;
  fill: () => void;
  shake: () => void;
  shakeLevel: number;
}) => {
  if (status === "empty")
    return <img onClick={fill} src={CaraffaVuota} alt="beaker" />;
  if (status === "full") return <img src={Caraffa4} alt="beaker" />;
  if (["withdirt", "shaken"].includes(status as string))
    return (
      <BeakerConTerra shakeLevel={shakeLevel} status={status} shake={shake} />
    );
  if (filling === 0) return <img src={Caraffa1} alt="beaker" />;
  if (filling === 1) return <img src={Caraffa2} alt="beaker" />;
  if (filling === 2) return <img src={Caraffa3} alt="beaker" />;
  if (filling === 3) return <img src={Caraffa4} alt="beaker" />;
  return null;
};

const BeakerConTerraComponent = ({
  status,
  className,
  shake,
  shakeLevel,
}: {
  status: State["beaker"];
  className?: string;
  shake: () => void;
  shakeLevel: number;
}) => {
  return (
    <div className={className}>
      <img
        className="withdirt"
        onClick={shake}
        src={CaraffaConTerra}
        alt="beaker"
      />
      <img className="shaken" src={CaraffaConTerraSciolta} alt="beaker" />
    </div>
  );
};

const BeakerConTerra = styled(BeakerConTerraComponent)`
  .withdirt {
    position: relative;
    left: 25%;
    ${({ status }) => status === "shaken" && `opacity:0;`}
  }
  .shaken {
    position: relative;
    left: -25%;
    ${({ status, shakeLevel }) =>
      status === "withdirt" &&
      `opacity:${shakeLevel * 10}%; z-index:1;pointer-events:none;`}
  }
`;

export default Beaker;
