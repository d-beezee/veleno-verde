import "./index.css";

import React from "react";
import { DndProvider } from "react-dnd";
import { Preview } from "react-dnd-preview";
import { TouchBackend } from "react-dnd-touch-backend";
import ReactDOM from "react-dom/client";

import App from "./App";
import LocalStorageProvider from "./LocalStorageProvider";
import reportWebVitals from "./reportWebVitals";

const generatePreview = ({ itemType, item, style }: any) => {
  if ("image" in item)
    return (
      <img
        src={item.image}
        style={{
          ...style,
          zIndex: 9999,
          ...("style" in item ? item.style : {}),
        }}
        alt=""
      />
    );
  return (
    <div className="item-list__item" style={style}>
      {itemType}
      {JSON.stringify(item)}
    </div>
  );
};
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LocalStorageProvider>
      <DndProvider
        backend={TouchBackend}
        options={{
          enableMouseEvents: true,
        }}
      >
        <App />

        <Preview generator={generatePreview} />
      </DndProvider>
    </LocalStorageProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
