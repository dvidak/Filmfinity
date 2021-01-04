import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components';
import { LoginPage, HomePage, Watchlist, WatchedList } from './pages';

import "./pages/style.css"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <ProtectedRoute path="/home">
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path="/watchlist">
          <Watchlist />
        </ProtectedRoute>
        <ProtectedRoute path="/watched-list">
          <WatchedList />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
