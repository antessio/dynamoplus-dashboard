// in src/authProvider.js from react admin

import dynamoplus from "../../dynamoplus/dynamoplus";


export default {
    // called when the user attempts to log in
    isAuthenticated: () => {
        return localStorage.getItem("token") && localStorage.getItem("username")
    },
    getTokenSilently: () => {
        console.log("get token silently")
        return localStorage.getItem("token")
    },
    loginWithRedirect: () => {
        console.log("login")
    },
    //https://v2-pro.ant.design/components/login
    login: (username, password) => {
        console.log(username + " and " + password)
        return dynamoplus.adminService.login(username, password)
            .then(token => {
                localStorage.setItem('username', username);
                localStorage.setItem('token', token)
                localStorage.setItem("permissions", "ADMIN")
                window.location = '/'
            })
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('username');
        localStorage.removeItem('permissions');
        window.location = '/login'
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({status}) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    }
};