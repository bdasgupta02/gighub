import React from 'react';
import NavButton from './NavButton';
import { Container, Row, Col } from 'react-grid-system'

class NavBar extends React.Component {
  render () {
  return (
    <Container>
    <NavButton  to="/" buttonText="Search gigs" active={true}/>
    </Container>

  )
}
}
export default NavBar;
