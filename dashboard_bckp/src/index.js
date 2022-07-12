// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'antd/dist/antd.min.css'


// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);

serviceWorker.unregister();