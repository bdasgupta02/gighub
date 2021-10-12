import React, {useState, Button} from 'react';
import  * as Constants from '../../constants.js';
import {BeakerIcon, ZapIcon} from '@primer/octicons-react';
import { Container, Row, Col } from 'react-grid-system'

import {NavLink as Link}from "react-router-dom";
import { animated, useSpring, config } from 'react-spring'
import styled from "styled-components";

//TODO: useSPring gets stuck
// export const LIGHT_BLUE = '#08F0FF'; //USE WITH 18% OPACITY
// export const TEXT_BLUE = '#00A9B4'; //blue for texts
// export const DARK_GREEN = '#174B4F';
// export const GREY = '#B8B8B8';
export const NavLink = styled(Link)`
display: flex;
align-items: center;
border : 1px solid #00000000;
border-radius: 8px;
background-color: white;
text-decoration: none;
color: #B8B8B8;
height: 48px;

font-size:  14px;
margin: 10px;
cursor: pointer;
&:hover {
  color: #B8B8B8;
  box-shadow: 4px 10px 40px #00000026;
}
&.active {
  color:white;
  background-color: #08F0FF;
  box-shadow: 0px 0px 0px 0px;
}
`;


const NavButton = (props) => {
  // const [
	// 	hover,
	// 	setHover
	// ] = useState(false);
  //
  // const [
	// 	active,
	// 	setActive
	// ] = useState(props.isActive ?? false);
  //
	// const toggleHover = () => {
  //   setHover(!hover);
  //   console.log("Entered button");
  // };
  //
  // const toggleActive = () => {
  //   setActive(!active);
  //   console.log("Button active state being toggled to: " + active);
  // }
  // let backgroundColor;
  // let textColor;
  //
	// const activeStyle = {
	// 	border          : `1px solid #00000000`,
	// 	color           : hover ? Constants.GREY : 'white',
	// 	backgroundColor : hover ? 'white' : Constants.LIGHT_BLUE,
  //   borderRadius : '8px',
  //   width: '140px',
  //   fontWeight: 'bold',
  //   fontSize: '14px',
	// };

  // const inactiveStyle = {
	// 	border          : `1px solid #00000000`,
  //   color           : Constants.GREY,
  //   backgroundColor : 'white',
  //     boxShadow: hover ? "4px 10px 40px #00000026" : null,
  //   borderRadius : '8px',
  //   width: '140px',
  //   fontWeight: 'bold',
  //   fontSize: '14px',
	// };

const AnimatedContainer = animated(Container)
	return (
    <NavLink exact to={props.to ?? "/"}>
    <div style={{width: '140px', textAlign: 'left', marginLeft: '15px'}}>
      {props.icon}
      <div style={{display: 'inline', marginLeft: '10px'}}>
        {props.buttonText}
      </div>
    </div>
    </NavLink>
	);
};
export default NavButton;

// <AnimatedContainer fluid
// 	style={active ? activeStyle : inactiveStyle}
// 	onMouseEnter={toggleHover}
// 	onMouseLeave={toggleHover}
// 	onClick={() => {}}
// 	className="navbutton">
//
//   <Row align="center" justify="center" style={{height: '48px'}}>
//   <Col xs={9}>
//   {props.icon}
// 	{" " + props.buttonText}
//   </Col>
//   </Row>
// </AnimatedContainer>
