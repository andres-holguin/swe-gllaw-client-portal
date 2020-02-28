import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Calendar from './views/Calendar/Calendar';
import Login from './views/Login/Login';
import Documents from './views/Documents/Documents'
import UnauthenticatedRoute from './components/Routes/UnauthenticatedRoute';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';
import Selector from './views/Selector/Selector';


const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false)

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    // check if the user is authenticated
    setTimeout(() => userHasAuthenticated(true), 2500);
  }

  console.log('isAuthenticated', isAuthenticated)

  return (
    <div>
      <Switch>
        <UnauthenticatedRoute
            path="/Login"
            component={Login}
            appProps={{ isAuthenticated }}
        />
        <AuthenticatedRoute
            path="/Calendar"
            component={Calendar}
            appProps={{ isAuthenticated }}
        />
        <AuthenticatedRoute
            path="/Documents"
            component={Documents}
            appProps={{ isAuthenticated }}
        />
        <AuthenticatedRoute
            path="/Selector"
            component={Selector}
            appProps={{ isAuthenticated }}
        />
      </Switch>
    </div>
  );
}

export default App;
