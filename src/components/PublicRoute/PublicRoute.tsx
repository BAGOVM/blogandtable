import React from 'react'
import { Redirect, Route } from 'react-router'

 interface PublicRouteProps{
   isLoggedIn: boolean;
   children: React.ReactChild | React.ReactNode;
   rest: any | any[];
 }

 const PublicRoute: React.FC<PublicRouteProps> = ({ isLoggedIn, children, rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (!isLoggedIn) return children
        return <Redirect to="/" />
      }}
    />
  )
}
export default PublicRoute