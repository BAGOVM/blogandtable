import React from 'react'
import { Redirect, Route } from 'react-router'

const PrivateRoute = ({ isLoggedIn, children, path }) => {
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