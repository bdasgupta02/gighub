import React from 'react';
import NavButton from './NavButton';
import { Container, Row, Col } from 'react-grid-system'
import {
  BrowserIcon, SearchIcon,
  NoteIcon, ChecklistIcon,
  PersonIcon, GearIcon, BellIcon,
  SignOutIcon
} from '@primer/octicons-react';
import GighubLogo from "../../assets/GighubLogo"

import './navBar.css'

//https://primer.style/octicons/

class WorkerNavBar extends React.Component {
  render() {
    return (
      <div  className="NBBackground">
        <nav>
          <Col xs={2} justify="center" align="center">
            <Row> <Col> <GighubLogo /> </Col></Row>
            <Row className="NBSpacer"> </Row>
            <Row> <NavButton to="/dashboard" buttonText="Dashboard" icon={<BrowserIcon />} /> </Row>
            <Row> <NavButton to="/user/gigs" buttonText="Search gigs" icon={<SearchIcon />} /> </Row>
            <Row> <NavButton to="/user/myGigs" buttonText="My gigs" icon={<NoteIcon />} /> </Row>
            <Row> <NavButton to="/user/applications" buttonText="Applications" icon={<ChecklistIcon />} /> </Row>
            <Row> <NavButton to="/user/dashboard" buttonText="Profile" icon={<PersonIcon />} /> </Row>
            <Row> <NavButton to="/settings" buttonText="Settings" icon={<GearIcon />} /> </Row>
            <Row className="NBSpacer"> </Row>
            <Row className="NBSpacer"> </Row>
            <Row className="NBSpacer"> </Row>
            <Row> <NavButton to="" buttonText="Notifications" icon={<BellIcon />} /> </Row>
            <Row> <NavButton to="/signout" buttonText="Signout" icon={<SignOutIcon />} /> </Row>
          </Col>
        </nav>
      </div>

    )
  }
}
export default WorkerNavBar


export class CompanyNavBar extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <Col xs={4} justify="center" align="center">
            <Row debug xs={3}> <NavButton to="/dashboard" buttonText="Dashboard" icon={<BrowserIcon />} /> </Row>
            <Row> <NavButton to="/user/gigs" buttonText="Search gigs" icon={<SearchIcon />} /> </Row>
            <Row> <NavButton to="/user/gigs" buttonText="My gigs" icon={<NoteIcon />} /> </Row>
            <Row> <NavButton to="/user/applications" buttonText="Applications" icon={<ChecklistIcon />} /> </Row>
            <Row> <NavButton to="/user/dashboard" buttonText="Profile" icon={<PersonIcon />} /> </Row>
            <Row> <NavButton to="/settings" buttonText="Settings" icon={<GearIcon />} /> </Row>
          </Col>
        </nav>
      </div>

    )
  }
}
