import React from 'react'

import { Row, Col } from 'react-grid-system'

import * as Constants from '../../constants.js'
import { StarFillIcon } from '@primer/octicons-react';

// TODO: default props
// TODO: need to check if phone taps behave the same with hover

const ReviewStars = (props) => {
    const rating = Math.round(props.rating)
    const numUnfilled = 5 - rating
    let filled = []
    let unfilled = []

    for (var i = 0; i < rating; i++) {
        filled.push(<Col style={{ color: Constants.YELLOW }} md={2}> <StarFillIcon size={30} /></Col>)
    }

    for (var i = 0; i < numUnfilled; i++) {
        unfilled.push(<Col style={{ color: 'white' }} md={2}> <StarFillIcon size={30} /></Col>)
    }

    return (
        <div style={{ width: '150px', marginTop: '20px' }}>
            <Row>
                {filled}
                {unfilled}
            </Row>
        </div>)
}

export default ReviewStars



