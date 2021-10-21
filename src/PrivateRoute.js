import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useAuth()
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