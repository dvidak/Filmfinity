import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoginPage, HomePage } from './pages';

import "./pages/style.css"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route pathe="/home">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
