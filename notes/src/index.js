import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./app-wrapper";

const root = document.getElementById("root");
const isServerSideRenderingEnabled = root.innerHTML.trim().length > 0;
if (isServerSideRenderingEnabled) {
  ReactDOM.hydrateRoot(root, <AppWrapper />);
} else {
  ReactDOM.createRoot(root).render(<AppWrapper />);
}
