import React from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

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
  color: #545454;
  box-shadow: 4px 10px 15px #00000026;
  background-color: #EDEDED;
}
&.active {
  color:white;
  background-color: #08F0FF;
  box-shadow: 0px 0px 0px 0px;
}
`;


const NavButton = (props) => {
  const { isSignOut } = props
  const { signout } = useAuth()

  const handleSignOut = () => {
    if (typeof isSignOut !== 'undefined' && isSignOut !== null && isSignOut === true) {
      signout()
    }
  }

  return (
    <NavLink exact to={props.to ?? "/"} onClick={handleSignOut}>
      <div style={{ width: '140px', textAlign: 'left', marginLeft: '15px' }}>
        {props.icon}
        <div style={{ display: 'inline', marginLeft: '10px' }}>
          {props.buttonText}
        </div>
      </div>
    </NavLink>
  );
};
export default NavButton;