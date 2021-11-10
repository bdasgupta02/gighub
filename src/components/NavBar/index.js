import React from 'react';
import NavButton from './NavButton';
import { Container, Row, Col } from 'react-grid-system'
import {
  BrowserIcon, 
  SearchIcon,
  NoteIcon, 
  ChecklistIcon,
  PersonIcon, 
  BellIcon,
  SignOutIcon,
  PeopleIcon,
  ListUnorderedIcon
} from '@primer/octicons-react';
import GighubLogo from "../../assets/GighubLogo"
import { useAuth } from '../../contexts/AuthContext'
import './navBar.css'

//https://primer.style/octicons/


// inefficient design
const NavBar = (props) => {
  const { isWorker } = useAuth()
  const isCompany = typeof isWorker !== 'undefined' && isWorker === false

  return (
    <div className="NBBackground">
      <nav>
        <Col xs={2} justify="center" align="center">

          <Row> <Col> <GighubLogo /> </Col></Row>
          <Row className="NBSpacer"> </Row>

          <Row> <NavButton to="/" buttonText="Dashboard" icon={<BrowserIcon size={16} />} /> </Row>
          <Row> <NavButton to="/search_gigs" buttonText="Search gigs" icon={<SearchIcon size={16} />} /> </Row>
          {isWorker && (<Row> <NavButton to="/my_gigs" buttonText="My gigs" icon={<NoteIcon size={16} />} /> </Row>)}
          {isWorker && (<Row> <NavButton to="/my_applications" buttonText="Applications" icon={<ChecklistIcon size={16} />} /> </Row>)}
          {isCompany && (<Row> <NavButton to="/search_workers" buttonText="Workers" icon={<PeopleIcon size={16} />} /> </Row>)}
          {isCompany && (<Row> <NavButton to="/listed_gigs" buttonText="Listed gigs" icon={<ListUnorderedIcon size={16} />} /> </Row>)}
          {isCompany && (<Row> <NavButton to="/company_applications" buttonText="Applications" icon={<ChecklistIcon size={16} />} /> </Row>)}
          <Row> <NavButton to="/my_profile" buttonText="Profile" icon={<PersonIcon size={16} />} /> </Row>
          <Row> <NavButton to="/notifs" buttonText="Notifications" icon={<BellIcon size={16} />} /> </Row>
          <Row> <NavButton to="/signin" buttonText="Sign-out" isSignOut icon={<SignOutIcon size={16} />} /> </Row>

        </Col>
      </nav>
    </div>

  )

}
export default NavBar
