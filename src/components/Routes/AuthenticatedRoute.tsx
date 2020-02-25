import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({ component: C, appProps, ...rest }) => {
    console.log('In auth route', appProps.isAuthenticated)

    return (
        <Route
            {...rest}
            render={props =>
                appProps.isAuthenticated
                    ? <C {...props} {...appProps} />
                    : <Redirect to='/Login' />
            }
        />  
    )
}

export default AuthenticatedRoute;
