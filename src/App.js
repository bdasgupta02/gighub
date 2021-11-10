import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';


// components
import NavBar from "./components/NavBar"
import PrivateRoute from './PrivateRoute';
import { Box } from '@material-ui/system';

// pages
import Dashboard from './pages/Dashboard';
import SearchWorkers from './pages/SearchWorkers';
import SignInPage from './pages/SignInPage'
import Profile from './pages/Profile';
import ViewProfile from './pages/ViewProfile'
import Notifications from './pages/Notifications'
import ListedGigs from './pages/ListedGigs'
import ViewGig from './pages/ViewGig';
import MyApplications from './pages/MyApplications';
import MyGigs from './pages/myGigs';
import SearchGigs from './pages/SearchGigs'
import CreateGig from './pages/CreateGig'


const NavSwitcher = () => {
  const { isSignedIn } = useAuth()

  return (
    <Box style={{ flexGrow: 1, display: 'flex', minHeight: '100vh' }}>
      {isSignedIn && <NavBar />}
      <div style={{ width: '100%', overflow: 'auto' }}>
        <Switch>

          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/my_gigs" component={MyGigs} />
          <PrivateRoute exact path="/view_gig" component={ViewGig} />
          <PrivateRoute exact path="/view_profile" component={ViewProfile} />
          <PrivateRoute exact path="/my_profile" component={Profile} />
          <PrivateRoute exact path="/my_applications" component={MyApplications} />
          <PrivateRoute exact path="/notifs" component={Notifications} />
          <PrivateRoute exact path="/listed_gigs" component={ListedGigs} />
          <PrivateRoute exact path="/search_gigs" component={SearchGigs} />
          <PrivateRoute exact path="/search_workers" component={SearchWorkers} />
          <PrivateRoute exact path="/create_gig" component={CreateGig} />

          <Route path="/signin" component={SignInPage} />
        </Switch>
      </div>
    </Box>
  )
}

const App = (props) => {
  return (
    <Router>
      <AuthProvider>
        <NavSwitcher />
      </AuthProvider>
    </Router>
  )
}

export default App;