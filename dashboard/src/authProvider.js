
import dynamoplus from "./dynamoplus/dynamoplus";
// in src/authProvider.js
export default {
    // called when the user attempts to log in
    login: ({ username,password }) => {
        localStorage.setItem('username', username);
        // accept all username/password combinations
        console.log(username + " and " + password)
        dynamoplus.adminService.login(username, password)
            .then(token => {
                localStorage.setItem('username', username);
                localStorage.setItem('token', token)
                localStorage.setItem("permissions", "ADMIN")
                window.location = '/'
            })
        //return Promise.resolve();
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            localStorage.removeItem('permissions');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('username') && localStorage.getItem("token")
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};