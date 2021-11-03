import React, { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import Highlight from './Highlight'
import LogoGenerator from '../LogoGenerator';
import './reviewTile.css'
import ReviewStars from '../ReviewStars';

// TODO: default props
// TODO: need to check if phone taps behave the same with hover

const ReviewTile = (props) => {
    const [isHovering, setIsHovering] = useState(false)


    // placeholders for now:
    let gigTitle = props.gigTitle ?? 'Gift Packer'
    let date = props.date ?? '01/02/2000'
    let textReview = props.textReview ?? "Very prompt and friendly"
    let rating = props.rating ?? 2
    let tags = props.tags ?? []




    const tileBackgroundAnimated = useSpring({
        boxShadow: isHovering ? "4px 10px 40px #00000026" : "1px 3px 5px #00000026",
        backgroundColor: isHovering ? "#FFFFFFFF" : "#FFFFFFA6",
        config: config.default
    })


    const AnimatedContainer = animated(Container)
    return (
        <div>

            <AnimatedContainer className="GLTileText" id="GLTileBackground" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} style={tileBackgroundAnimated}>
                <Col id="GLMainColumn">
                    <Row style={{ alignSelf: 'flex-start' }}>

                        <Col>
                            <div id="GLCompanyName">
                                {gigTitle}
                            </div>
                            <div id="GLCompanyLocation">
                                {date}
                            </div>
                        </Col>
                    </Row>
                    <div style={{ height: '20px' }}></div>
                    <div id="GLJobDesc" style={{ alignSelf: 'flex-start' }}>
                        {textReview}
                    </div>
                    <Row className="GLBottom" style={{ alignSelf: 'flex-start', marginTop: '15px' }}>

                        {tags.map((data) => (
                            <div>
                                <Highlight text={data} />
                            </div>
                        ))}
                    </Row>
                    <Row justify='center'>
                        {rating != -1 ? <ReviewStars rating={rating} /> : ""}
                    </Row>

                </Col>

            </AnimatedContainer>
        </div>)

}

export default ReviewTile



