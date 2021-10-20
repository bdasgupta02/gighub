import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './Auth'

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const auth = useAuth()
    const currentUser = auth === undefined ? null : auth.currentUser
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={'/signin'} />
                )
            }
        />
    )
}

export default PrivateRoute;