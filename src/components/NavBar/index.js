import React from 'react';
import NavButton from './NavButton';
import { Container, Row, Col } from 'react-grid-system'
import {BeakerIcon, ZapIcon} from '@primer/octicons-react';

class NavBar extends React.Component {
  render () {
  return (
    <Container>
    <nav>
    <Col xs={4} justify="center" align="center">
    <Row debud xs={3}> <NavButton to="/gig/details" buttonText="Dashboard" icon={<ZapIcon />}/> </Row>
    <Row> <NavButton to="/user/gigs" buttonText="My gigs"/> </Row>
    <Row> <NavButton to="/user/applications" buttonText="Applications"/> </Row>
    <Row> <NavButton to="/user/dashboard" buttonText="Profile"/> </Row>
    <Row> <NavButton to="/settings" buttonText="Settings"/> </Row>
    </Col>
    </nav>
    </Container>

  )
}
}
export default NavBar;
