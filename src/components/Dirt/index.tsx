import { DragPreviewImage, useDrag } from "react-dnd";
import styled from "styled-components";

import ItemTypes from "../../ItemTypes";
import { useLocalStorage } from "../../LocalStorageProvider";
import Terra from "./assets/Terra.png";

const Container = styled.div`
  img {
    max-width: 100%;
  }
`;

const originalDimensions = {
  width: 595,
  height: 419,
};
const Dirt = () => {
  const [state, setState] = useLocalStorage();
  const [, dragRef, preview] = useDrag(
    () => ({
      type: ItemTypes.BEAKER_INGREDIENT,
      item: {
        name: "Dirt",
        image: Terra,
        style: {
          left: `-${originalDimensions.width / 2}px`,
          top: `-${originalDimensions.height / 2}px`,
        },
      },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<{ name: string }>();
        if (!item || !dropResult) return;
        if (dropResult.name !== ItemTypes.BEAKER) return;
        if (state.beaker !== "full") return;
        setState({ beaker: "withdirt", dirtUsed: true });
      },
    }),
    [state.beaker]
  );

  if (state.dirtUsed) return null;
  return (
    <Container>
      <DragPreviewImage connect={preview} src={Terra} />
      <img ref={dragRef} src={Terra} alt="Terra" />
    </Container>
  );
};

export default Dirt;
