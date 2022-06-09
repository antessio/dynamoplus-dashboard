import {  Route, Navigate } from "react-router-dom";

const PrivateRoute = (
    {
        component: Component,
        authorities,
        onForbidden,
        onUnauthorized,
        ...rest
    }) => (
    
    <Route {...rest} element={
        (props) => {

            if (isAuthenticated()) {
                return <Component {...props} />
            } else {
                if (onUnauthorized) {
                    onUnauthorized()
                } else {
                    console.log("unauthorized")
                }
                return <Navigate to={{
                    pathname: '/authentication/sign-up',
                    state: {from: props.location}
                }}/>

            }
        }
    }/>
)



const isAuthenticated = () => {
    return sessionStorage.getItem("username") || localStorage.getItem("username")
}

export default PrivateRoute;
