import logo from './logo.svg';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import NavButton from './components/navButton.js'

/* Pages */
import CompanyDashboard from './pages/companyDashboard';
import CompanyDetails from './pages/companyDetails';
import GigDetails from './pages/gigDetails';
import ListedGigs from './pages/listedGigs';
import MyApplications from './pages/myApplications';
import MyGigs from './pages/myGigs';
import SearchGigs from './pages/searchGigs';
import SearchWorkers from './pages/searchWorkers';
import Settings from './pages/settings';
import SignIn from './pages/signIn';
import WorkerDashboard from './pages/workerDashboard';
import WorkerDetails from './pages/workerDetails';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {} //add stateful items here
  }

  render() {
    return <div>
      <NavButton onSearchTermChange={(term) => { }} />

      <Router>
        <div>
          <Link to="/">Home</Link>{" | "}
          <Link to="/company/dashboard">Company Dashboard</Link>{" | "}
          <Link to="/company/details">Company Details</Link>{" | "}
          <Link to="/gig/details">Gig Details</Link>{" | "}
          <Link to="/company/gigs">Listed Gigs</Link>{" | "}
          <Link to="/user/applications">My Applications</Link>{" | "}
          <Link to="/user/gigs">My Gigs</Link>{" | "}
          <Link to="/gig/search">Search Gigs</Link>{" | "}
          <Link to="/user/search">Search Workers</Link>{" | "}
          <Link to="/settings">Settings</Link>{" | "}
          <Link to="/sign-in">Sign In</Link>{" | "}
          <Link to="/user/dashboard">Worker Dashboard</Link>{" | "}
          <Link to="/company/dashboard">Company Dashboard</Link>

          <Switch>
            <Route path="/company/dashboard">
              <CompanyDashboard />
            </Route>
            <Route path="/company/details">
              <CompanyDetails />
            </Route>
            <Route path="/gig/details">
              <GigDetails />
            </Route>
            <Route path="/company/gigs">
              <ListedGigs />
            </Route>
            <Route path="/user/applications">
              <MyApplications />
            </Route>
            <Route path="/user/gigs">
              <MyGigs />
            </Route>
            <Route path="/gig/search">
              <SearchGigs />
            </Route>
            <Route path="/user/search">
              <SearchWorkers />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/user/dashboard">
              <WorkerDashboard />
            </Route>
            <Route path="/company/search">
              <CompanyDashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  }
}

export default App;
