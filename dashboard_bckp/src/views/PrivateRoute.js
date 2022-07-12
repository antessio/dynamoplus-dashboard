import React from 'react';
//import Unauthorized from './views/Unauthorized/Unauthorized'


import {Route} from 'react-router-dom';
/*import ErrorBoundary from 'shared/Error/ErrorBoundary.jsx';
import * as messageActions from 'store/actions/message';*/

// const PrivateRoute = (
//     {
//         component: Component,
//         authorities,
//         onForbidden,
//         onUnauthorized,
//         ...rest
//     }) => (
//     <Route {...rest} render={
//         (props) => {

//             if (isAuthenticated()) {
//                 return <Component {...props} />
//                 /*if (myAuthorities().some(role => authorities.includes(role))) {
//                     /!*return <ErrorBoundary><Component {...props} /></ErrorBoundary>;*!/
//                     return <Component {...props} />
//                 } else {
//                     forbiddenMessage("Non sei autorizzato a visualizzare questa pagina");
//                     return <Unauthorized/>
//                 }*/
//             } else {
//                 if (onUnauthorized) {
//                     onUnauthorized()
//                 } else {
//                     console.log("unauthorized")
//                 }
//                 return <Navigate to={{
//                     pathname: '/login',
//                     state: {from: props.location}
//                 }}/>

//             }
//         }
//     }/>
// )


/*const mapDispatchToProps = dispatch => {
    return {
        unauthorizedMessage: (message) => dispatch(messageActions.printError(message)),
        forbiddenMessage: (message) => dispatch(messageActions.printWarning(message)),
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.userId !== null,
        userAuthorities: state.authReducer.authorities
    }
};*/
const isAuthenticated = () => {
    return sessionStorage.getItem("username") || localStorage.getItem("username")
}
/*const myAuthorities = () => {
    var authorities = sessionStorage.getItem("authorities") || localStorage.getItem("authorities");
    return authorities.split(",");
}*/

import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = (onForbidden, onUnauthorized) => {

    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;
