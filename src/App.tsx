import React from 'react';
import { Route, Switch, Redirect, Router  } from 'react-router-dom';
import Calendar from './views/Calendar/Calendar'
import NavBar from "./components/Header/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/Calendar">
          <Calendar />
        </Route>
        <Route path="/">
          <Calendar />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
