import { useDrag } from "react-dnd";
import styled from "styled-components";

import ItemTypes from "../../ItemTypes";
import { State, useLocalStorage } from "../../LocalStorageProvider";
import StickUnused from "./assets/StickUnused.png";
import StickUsed from "./assets/StickUsed.png";

const Container = styled.div`
  position: absolute;
  img {
    max-width: 100%;
  }
`;
interface DropResult {
  name: string;
}
const SticksComponent = ({
  className,
  state,
  setState,
}: {
  className?: string;
  state: State;
  setState: (s: State) => void;
}) => {
  const [, dragRef] = useDrag(
    () => ({
      type: ItemTypes.BEAKER_INGREDIENT,
      item: { name: "Stick", image: StickUnused },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        if (!item || !dropResult) return;
        if (dropResult.name !== ItemTypes.BEAKER) return;
        if (state.beaker !== "shaken") return;
        if (state.stick === "used") return;

        setState({ stick: "used" });
      },
    }),
    [state.beaker, state.stick]
  );
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container ref={dragRef} className={className}>
        <img className="unused" src={StickUnused} alt="Stick" />
        <img className="used" src={StickUsed} alt="Stick" />
      </Container>
    </div>
  );
};

const Sticks = styled(SticksComponent)`
  .unused,
  .used {
    transition: opacity 10s;
  }
  .unused {
    ${({ state }) => state.stick === "unused" && `opacity: 1;`}
    ${({ state }) => state.stick === "used" && `opacity: 0;`}
    position: relative;
    left: 25%;
    z-index: 1;
  }
  .used {
    ${({ state }) => state.stick === "unused" && `opacity: 0;`}
    ${({ state }) => state.stick === "used" && `opacity: 1;`}
    position: relative;
    right: 25%;
  }
`;

const Stick = () => {
  const [state, setState] = useLocalStorage();

  return <Sticks state={state} setState={setState} />;
};

export default Stick;
