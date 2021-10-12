import React from 'react';
import NavButton from './NavButton';
import { Container, Row, Col } from 'react-grid-system'
import {BrowserIcon, SearchIcon,
  NoteIcon, ChecklistIcon,
PersonIcon, GearIcon} from '@primer/octicons-react';

//https://primer.style/octicons/

class NavBar extends React.Component {
  render () {
  return (
    <Container>
    <nav>
    <Col xs={4} justify="center" align="center">
    <Row debud xs={3}> <NavButton to="/gig/details" buttonText="Dashboard" icon={<BrowserIcon />}/> </Row>
    <Row> <NavButton to="/user/gigs" buttonText="Search gigs" icon={<SearchIcon />}/> </Row>
    <Row> <NavButton to="/user/gigs" buttonText="My gigs" icon={<NoteIcon />}/> </Row>
    <Row> <NavButton to="/user/applications" buttonText="Applications" icon={<ChecklistIcon/>}/> </Row>
    <Row> <NavButton to="/user/dashboard" buttonText="Profile" icon={<PersonIcon />}/> </Row>
    <Row> <NavButton to="/settings" buttonText="Settings" icon={<GearIcon />}/> </Row>
    </Col>
    </nav>
    </Container>

  )
}
}
export default NavBar;
