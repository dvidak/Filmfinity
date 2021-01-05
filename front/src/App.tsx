import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Movie, ProtectedRoute } from "./components";
import { LoginPage, HomePage, Watchlist, WatchedList } from "./pages";
import { Profile } from "./pages/Profile";

import "./pages/style.css";

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
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/watchlist">
          <Watchlist />
        </ProtectedRoute>
        <ProtectedRoute path="/watched-list">
          <WatchedList />
        </ProtectedRoute>
        <ProtectedRoute path="/movie/:id" component={Movie} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
