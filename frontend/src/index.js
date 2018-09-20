import React from "react";
import ReactDOM from "react-dom";
import { ActionCableProvider } from "react-actioncable-provider";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "../semantic/dist/semantic.min.css";
import "./index.css";
import { API_WS_ROOT } from "./constants";

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <Router>
      <App />
    </Router>
  </ActionCableProvider>,
  document.getElementById("root")
);
registerServiceWorker();
