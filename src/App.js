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

/* General Pages */
import Homepage from './pages/homepage';
import SignIn from './pages/signIn';
import GigDetails from './pages/gigDetails';
import SearchGigs from './pages/searchGigs';
import SearchWorkers from './pages/searchWorkers';
import Settings from './pages/settings';

/* User Pages */
import MyApplications from './pages/myApplications';
import MyGigs from './pages/myGigs';
import WorkerDashboard from './pages/workerDashboard';
import WorkerDetails from './pages/workerDetails';

/* Company Pages */
import CompanyDashboard from './pages/companyDashboard';
import CompanyDetails from './pages/companyDetails';
import ListedGigs from './pages/listedGigs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {} //add stateful items here
  }

  render() {
    return <div>
      {/* <NavButton onSearchTermChange={(term) => { }} /> */}

      <Router>
        <div>
          <Switch>
            {/* General Pages */}
            <Route path="/gig/details">
              <GigDetails />
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
            
            {/* User Pages */}
            <Route path="/user/applications">
              <MyApplications />
            </Route>
            <Route path="/user/gigs">
              <MyGigs />
            </Route>
            <Route path="/user/dashboard">
              <WorkerDashboard />
            </Route>
            <Route path="/user/details">
              <WorkerDetails />
            </Route>

            {/* Company Pages */}
            <Route path="/company/dashboard">
              <CompanyDashboard />
            </Route>
            <Route path="/company/details">
              <CompanyDetails />
            </Route>
            <Route path="/company/gigs">
              <ListedGigs />
            </Route>
            <Route path="/company/search">
              <CompanyDashboard />
            </Route>
            
            {/* Home Page */}
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  }
}

export default App;
