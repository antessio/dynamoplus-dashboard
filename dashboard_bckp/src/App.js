// src/App.js

import React from "react";
import NavBar from "./components/NavBar";

// New - import the React Router components, and the Profile page component
import {BrowserRouter, Route, Routes} from "react-router-dom";
//import Profile from "./views/Profile";
import Home from "./views/Home";
import Collections from "./views/collections/Collections";
import Layout from './components/layout/Layout';
import Indexes from "./views/indexes/Indexes";
import Documents from "./views/documents/Documents";
import PrivateRoute from "./views/PrivateRoute";
import Login from './views/login/Login'

function App() {
    return (
        <div className="App">
                
            <BrowserRouter>
                    {/* New - use BrowserRouter to provide access to /profile */}
                    <header>
                        {/* <NavBar /> */}
                        <div
                            style={{display: "none"}}>{process.env.NODE_ENV} {process.env.REACT_APP_API_BASE_PATH}</div>
                    </header>
                    <Layout>
                    <Routes>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" exact component={Login}/>
                        {/*<Route path="/profile" component={Profile}/>*/}
                        <Route path="/collections" exact element={<PrivateRoute/>}>
                            <Route path="/collections" exact element={<Collections/>} />
                        </Route>
                        {/* <Route path="/indexes/:collection" component={Indexes}/>
                        <Route path="/documents/:collection" component={Documents}/> */}
                    </Routes>
                    </Layout>

            </BrowserRouter>
        </div>
    );
}

export default App;