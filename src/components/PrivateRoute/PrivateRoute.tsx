import React from 'react'
import { Redirect, Route } from 'react-router'

interface PrivateRouteProps{
  isLoggedIn: boolean;
  children: React.ReactChild | React.ReactNode;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isLoggedIn, children, path }) => {
  return (
    <Route
      path={path}
      render={() => {
        if (isLoggedIn) return children
        return <Redirect to="/login" />
      }}
    />
  )
}
export default PrivateRoute