import React, { useEffect, useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'

import LogoBox from '../LogoBox';
import { useHistory } from 'react-router';
import LogoGenerator from '../LogoGenerator';

import NotificationTile from './NotificationTile';

// TODO: default props
// TODO: need to check if phone taps behave the same with hover

const NotificationList = (props) => {
    //props 
    // reviewList ==> filter those that are 'wasViewed == false'
    const [reviewList, setReviewList] = useState()

    useEffect(() => {
        if (reviewList == null) {
            let temp = props.reviewList.filter(el => !el.wasViewed)
            setReviewList(temp)
        }
    }, [props.reviewList])


    return (
        <div style={{ height: '5px' }}>
            { reviewList != null && reviewList.map(review =>
                <NotificationTile review={review} />)
            }
        </div>
    )

}

export default NotificationList



