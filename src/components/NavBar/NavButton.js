import React, {useState, Button} from 'react';
import  * as Constants from '../../constants.js';
import {BeakerIcon, ZapIcon} from '@primer/octicons-react';
import { Container, Row, Col } from 'react-grid-system'
import './navButton.css';
import {NavLink}from "react-router-dom";
import { animated, useSpring, config } from 'react-spring'

//TODO: useSPring gets stuck
const NavButton = (props) => {
  const [
		hover,
		setHover
	] = useState(false);


	const toggleHover = () => {
    setHover(!hover);
    console.log("Entered button");
  };
  let backgroundColor;
  let textColor;


	const activeStyle = {
		border          : `1px solid #00000000`,
		color           : hover ? Constants.GREY : 'white',
		backgroundColor : hover ? 'white' : Constants.LIGHT_BLUE,
    boxShadow: hover ? "4px 10px 40px #00000026" : null,
    borderRadius : '8px',
    width: '140px',
    fontWeight: 'bold',
    fontSize: '14px',
	};

  const inactiveStyle = {
		border          : `1px solid #00000000`,
    color           : Constants.GREY,
    backgroundColor : 'white',
      boxShadow: hover ? "4px 10px 40px #00000026" : null,
    borderRadius : '8px',
    width: '140px',
    fontWeight: 'bold',
    fontSize: '14px',
	};

const AnimatedContainer = animated(Container)
	return (
    <NavLink to={props.link ?? "/"} activestyle={activeStyle} style={inactiveStyle}>
		<AnimatedContainer fluid
			style={props.isActive ? activeStyle : inactiveStyle}
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
			onClick={() => {}}
			className="navbutton">

      <Row align="center" justify="center" style={{height: '48px'}}>
      <Col xs={9}>
      {props.icon}
			{" " + props.buttonText}
      </Col>
      </Row>
		</AnimatedContainer>
    </NavLink>
	);
};
export default NavButton;
