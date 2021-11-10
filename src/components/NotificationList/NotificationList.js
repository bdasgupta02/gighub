import React, { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'

import LogoBox from '../LogoBox';
import { useHistory } from 'react-router';
import LogoGenerator from '../LogoGenerator';

import NotificationTile from './NotificationTile';

// TODO: default props
// TODO: need to check if phone taps behave the same with hover

const NotificationList = (props) => {

    return (
        <NotificationTile />
    )

}

export default NotificationList



