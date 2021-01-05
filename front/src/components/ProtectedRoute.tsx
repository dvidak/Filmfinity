import React from "react";
import { Route, Redirect } from "react-router-dom";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  component?: any;
  exact?: boolean;
  path: string;
}

export function ProtectedRoute({
  children,
  component,
  ...routeProps
}: ProtectedRouteProps) {
  const isLoggedIn = localStorage.getItem("facebookId");
  return isLoggedIn ? (
    <Route {...routeProps} exact component={component}>
      {children}
    </Route>
  ) : (
    <Redirect to="/login" />
  );
}
