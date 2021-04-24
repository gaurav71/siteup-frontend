import React from "react";
import { Redirect, Route } from "react-router-dom";
import { paths } from "../App";
import { useAuthContext } from "./AuthProvider";

interface PrivateRouteProps {
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const { user } = useAuthContext()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <>
          <Redirect
            to={{
              pathname: paths.LOGIN,
              state: { from: location }
            }}
          />
          </>
        )
      }
    />
  )
}

export default PrivateRoute