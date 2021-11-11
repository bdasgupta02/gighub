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
    const [bookedGigs, setBookedGigs] = useState()

    useEffect(() => {
        if (reviewList == null) {

            setReviewList(props.reviewList)
        }
        if (bookedGigs == null) {
            setBookedGigs(props.bookedGigs)
        }
    }, [props.reviewList])


    return (
        <div style={{ height: '5px' }}>
            { reviewList != null && reviewList.length != 0 && reviewList.map(review =>
                <NotificationTile review={review} />)
            }
            { bookedGigs != null && bookedGigs.length != 0 && bookedGigs.map(gig =>
                <NotificationTile bookedGig={gig} />)}
            {(reviewList == null || reviewList.length == 0 && bookedGigs == null || bookedGigs.length == 0) && 'No new notifications!'}
        </div>
    )

}

export default NotificationList



