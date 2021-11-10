import React, { useEffect, useState } from 'react'

import { Row, Col } from 'react-grid-system'

import * as Constants from '../../constants.js'
import { StarFillIcon, StarIcon } from '@primer/octicons-react';

// TODO: default props
// TODO: need to check if phone taps behave the same with hover

const ReviewStars = (props) => {
    // props.parentFunction ==> sets the numStars in the parent component
    const rating = Math.round(props.rating)
    const isEditing = props.isEditing
    const numUnfilled = 5 - rating
    const [numChosen, setNumChosen] = useState(0)

    let filled = []
    let unfilled = []

    for (var i = 0; i < rating; i++) {
        filled.push(<Col style={{ color: Constants.YELLOW }} md={2}> <StarFillIcon size={30} /></Col>)
    }

    for (var i = 0; i < numUnfilled; i++) {
        unfilled.push(<Col style={{ color: '#CFCACA' }} md={2}> <StarFillIcon size={30} /></Col>)
    }


    const handleStarClick = (i, isChoosing) => {
        console.log("selected star")
        setNumChosen(i)
        props.parentFunction(i)
    }

    return (
        !isEditing ?
            (<div style={{ width: '150px', marginTop: '20px' }}>
                <Row>
                    {filled}
                    {unfilled}
                </Row>
            </div>)
            :
            (<div style={{ width: '150px', marginTop: '20px' }}>
                <Row>
                    {[...Array(5)].map((e, i) => <Col style={i < numChosen ? { color: Constants.YELLOW } : { color: '#CFCACA' }} md={2} key={i} onClick={() => handleStarClick(i + 1)}> <StarFillIcon size={30} /></Col>)}

                </Row>
            </div>)
    )

}

export default ReviewStars



