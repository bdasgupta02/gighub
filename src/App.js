import logo from './logo.svg';
import React from 'react';
import NavBar from './components/NavBar';
import {SearchIcon} from '@primer/octicons-react';
import {Container, Row, Col} from 'react-grid-system';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import './App.css';

import Homepage from './pages/homepage';
import SignIn from './pages/signIn';
import GigDetails from './pages/gigDetails';
import SearchGigs from './pages/searchGigs';
import SearchWorkers from './pages/searchWorkers';
import Settings from './pages/settings';
import MyApplications from './pages/myApplications';
import MyGigs from './pages/myGigs';
import WorkerDashboard from './pages/workerDashboard';
import WorkerDetails from './pages/workerDetails';
import CompanyDashboard from './pages/companyDashboard';
import CompanyDetails from './pages/companyDetails';
import ListedGigs from './pages/listedGigs';
import SearchCompanies from './pages/searchCompanies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {} //add stateful items here
  }

  render() {
    return <div>
      {/* <SearchBar onSearchTermChange={(term) => { }} /> */}

      <Router>
        {/* Go to NavBar/index.js to edit links for the navbuttons */}
        <div>
        <Container>
        <Row debug>
        <Col xs={3} debug>
        <NavBar />
        </Col>
        <Col>
          <Switch>
            {/* Basic Functions  */}
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>

            {/* Common Pages */}
            <Route path="/search-users">
              <SearchWorkers />
            </Route>
            <Route path="/user/">
              <WorkerDetails />
            </Route>
            <Route path="/search-gigs">
              <SearchGigs />
            </Route>
            <Route path="/gig/">
              <GigDetails />
            </Route>
            <Route path="/search-companies">
              <SearchCompanies />
            </Route>
            <Route path="/company/gigs">
              <ListedGigs />
            </Route>
            <Route path="/company/">
              <CompanyDetails />
            </Route>

            {/* Worker Only */}
            <Route path="/dashboard">
              <WorkerDashboard />
            </Route>
            <Route path="/my-applications">
              <MyApplications />
            </Route>
            <Route path="/my-gigs">
              <MyGigs />
            </Route>

            {/* Company Only */}
            <Route path="/company-dashboard">
              <CompanyDashboard />
            </Route>


            {/* Home Page */}
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
          </Col>
          </Row>
              </Container>
        </div>

      </Router>

    </div>
  }
}

export default App;
