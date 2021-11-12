import React from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useState } from 'react'
import Button from '../Button'

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
-webkit-transition: background-color 200ms linear;
    -moz-transition: background-color 200ms linear;
    -o-transition: background-color 200ms linear;
    -ms-transition: background-color 200ms linear;
    transition: background-color 200ms linear;
&:hover {
  color: #545454;
  box-shadow: 4px 10px 15px #00000026;
  background-color: #EDEDED;
}
&.active {
  color:white;
  background-color: #09d6e3;
  box-shadow: 0px 0px 0px 0px;
  font-weight: bold;
}
`;
export const NotifLinkStyle = styled(Link)`
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
`;


const NavButton = (props) => {
  const { isSignOut, isNotif } = props
  const { signout } = useAuth()
  const [notifOpen, setNotifOpen] = useState(false)


  const handleSignOut = () => {
    if (typeof isSignOut !== 'undefined' && isSignOut !== null && isSignOut === true) {
      signout()
    }
  }



  return (
    <NavLink exact to={props.to ?? "#"} onClick={isSignOut ? handleSignOut : isNotif && props.parentFunction}
      activeClassName={isNotif && NotifLinkStyle}
    >
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