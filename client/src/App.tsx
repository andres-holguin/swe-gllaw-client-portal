import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Calendar from './views/Calendar/Calendar';
import Login from './views/Login/Login';
import Documents from './views/Documents/Documents'
import UnauthenticatedRoute from './components/Routes/UnauthenticatedRoute';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';
import Selector from './views/Selector/Selector';
import Account from './views/Account/Account';
import axios, { AxiosResponse } from 'axios';


const App = (props) => {
  const [isAuthenticated, userHasAuthenticated] = useState(false)
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    // check if the user is authenticated
    axios.get("/api/user/me").then((res: AxiosResponse) => {
     if(res.status === 200) {
         userHasAuthenticated(true);
      }
    //  userHasAuthenticated(true);
  });
    //setTimeout(() => userHasAuthenticated(false), 500);
  }

  console.log('isAuthenticated', isAuthenticated)

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
        <UnauthenticatedRoute
            path="/Login"
            component={Login}
            appProps={{ isAuthenticated, userHasAuthenticated, setUserToken}}
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
        <AuthenticatedRoute
            path="/Account"
            component={Account}
            appProps={{ isAuthenticated }}
        />
      </Switch>
    </div>
  );
}

export default App;
