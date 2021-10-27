import logo from './logo.svg';
import React from 'react';
import NavBar from './components/NavBar';
import { SearchIcon } from '@primer/octicons-react';
import { Container, Row, Col } from 'react-grid-system';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

import './App.css';

import Homepage from './pages/homepage';
import SignIn from './pages/signIn';
import GigDetails from './pages/gigDetails';
import SearchGigs from './pages/searchGigs';
import SearchWorkers from './pages/searchWorkers';
import Settings from './pages/settings';
import MyApplications from './pages/myApplications';
import MyGigs from './pages/myGigs';

// don't make dashboard separate
import Dashboard from './pages/Dashboard';


import WorkerDetails from './pages/workerDetails';
import CompanyDetails from './pages/companyDetails';
import ListedGigs from './pages/listedGigs';
import SearchCompanies from './pages/searchCompanies';
import WorkerNavBar from './components/NavBar';


import Button from './components/Button';
import SignInBox from './components/SignInBox'

const App = (props) => {
  return (
    <div>
    <Router>
    <Row>
     <Col xs={2}>
    <WorkerNavBar />
    </Col>
    <Col xs={10}>
      <AuthProvider>
        <Switch>
          {/* Put your private routes here (dashboard should be root at "/") */}
          {/* <PrivateRoute exact path="/" component={WorkerDashboard} /> */}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/user/myGigs" component={MyGigs} />

          {/* This is for the sign-in */}
          <Route path="/signin" component={SignInBox} />
        </Switch>

      </AuthProvider>
      </Col>
      </Row>

    </Router>
    </div>
  )
}

export default App;
//
//  * <Button text={"Button"} onClick={() => null} type="PRIMARY" isBlock />
// //
// return <AuthProvider>
//       {/* <SearchBar onSearchTermChange={(term) => { }} /> }
//
//       <Router>
//         {/* Go to NavBar/index.js to edit links for the navbuttons }
//         <div>
//           <Container>
//             <Row debug>
//               <Col xs={3} debug>
//                 <NavBar />
//               </Col>
//               <Col>
//                 <Switch>
//                   {/* Basic Functions  }
//
//                   <PrivateRoute path="/settings">
//                     <Settings />
//                   </PrivateRoute>
//
//                   {/* Common Pages }
//                   <PrivateRoute path="/search-users">
//                     <SearchWorkers />
//                   </PrivateRoute>
//                   <PrivateRoute path="/user/">
//                     <WorkerDetails />
//                   </PrivateRoute>
//                   <PrivateRoute path="/search-gigs">
//                     <SearchGigs />
//                   </PrivateRoute>
//                   <PrivateRoute path="/gig/">
//                     <GigDetails />
//                   </PrivateRoute>
//                   <PrivateRoute path="/search-companies">
//                     <SearchCompanies />
//                   </PrivateRoute>
//                   <PrivateRoute path="/company/gigs">
//                     <ListedGigs />
//                   </PrivateRoute>
//                   <PrivateRoute path="/company/">
//                     <CompanyDetails />
//                   </PrivateRoute>
//
//                   {/* Worker Only }
//                   <PrivateRoute path="/dashboard">
//                     <WorkerDashboard />
//                   </PrivateRoute>
//                   <PrivateRoute path="/my-applications">
//                     <MyApplications />
//                   </PrivateRoute>
//                   <PrivateRoute path="/my-gigs">
//                     <MyGigs />
//                   </PrivateRoute>
//
//                   {/* Company Only }
//                   <PrivateRoute path="/company-dashboard">
//                     <CompanyDashboard />
//                   </PrivateRoute>
//
//                   <Route path="/sign-in">
//                     <SignIn />
//                   </Route>
//
//
//                 </Switch>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//
//       </Router>
//
//     </AuthProvider>
//
