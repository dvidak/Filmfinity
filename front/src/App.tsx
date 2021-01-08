import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { WatchlistPage } from "./pages/WatchlistPage";

import "./pages/page-styles.css";
import { Layout } from "./components/Layout";
import { WatchedListPage } from "./pages/WatchedListPage";
import { MoviePage } from "./pages/MoviePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Layout>
          <ProtectedRoute path="/" exact>
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/watchlist">
            <WatchlistPage />
          </ProtectedRoute>
          <ProtectedRoute path="/watched-list">
            <WatchedListPage />
          </ProtectedRoute>
          <ProtectedRoute path="/movie/:id" component={MoviePage} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
