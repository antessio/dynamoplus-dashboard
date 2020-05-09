import React from "react";
import authProvider from "../common/authorization/authProvider";
import {Link} from "react-router-dom";


const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout} = authProvider;


    return (
        <div>
            {!isAuthenticated && (
                <button
                    onClick={() =>
                        loginWithRedirect({})
                    }
                >
                    Log in
                </button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
            {isAuthenticated && (
                <span>
        <Link to="/">Home</Link>&nbsp;
                    <Link to="/profile">Profile</Link>
      </span>
            )}

        </div>
    );
};

export default NavBar;