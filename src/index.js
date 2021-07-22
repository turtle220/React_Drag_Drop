import { StrictMode } from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Card />
  </StrictMode>,
  rootElement
);
