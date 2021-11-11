import React, { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import Highlight from '../GigListingTile/Highlight';
import LogoBox from '../LogoBox';
import { useHistory } from 'react-router';
import LogoGenerator from '../LogoGenerator';
import './notificationList.css'
import { formatTimestamp } from "../../auxiliary/Auxiliary"

// TODO: default props
// TODO: need to check if phone taps behave the same with hover

const NotificationTile = (props) => {
    const history = useHistory()
    const [isHovering, setIsHovering] = useState(false)
    const isReview = props.isReview
    const isGigUpdate = props.isGigUpdate
    const isNewBooked = props.isNewBooked
    const [company, setCompany] = useState()

    let review = props.review;


    // placeholders for now:
    let companyName = props.companyName ?? "Google"

    let companyCity = props.companyCity ?? "Singapore"
    let jobTitle = props.jobTitle ?? "Freelance designer"
    let jobDesc = props.jobDesc ?? "Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
    let pendingReview = props.pendingReview ?? false;
    const payAmt = props.payAmt ?? "S$ 1,000"
    const payFor = props.payFor ?? "10 days"
    const isNew = props.isNew ?? false;
    const isGoodMatch = props.isGoodMatch ?? false;
    let isFlexible = props.isFlexible ?? false;
    const link = props.link ?? null
    let companyLogo = props.companyLogo ?? ""


    const companyNameLimit = 15
    const companyCityLimit = 22
    const jobTitleLimit = 27
    const jobDescLimit = 120

    companyName = companyName.length > companyNameLimit ? companyName.substr(0, companyNameLimit) + "..." : companyName
    companyCity = companyCity.length > companyCityLimit ? companyCity.substr(0, companyCityLimit) + "..." : companyCity
    jobTitle = jobTitle.length > jobTitleLimit ? jobTitle.substr(0, jobTitleLimit) + "..." : jobTitle
    jobDesc = jobDesc.length > jobDescLimit ? jobDesc.substr(0, jobDescLimit) + "..." : jobDesc

    const tileBackgroundAnimated = useSpring({
        backgroundColor: isHovering ? "#DBD8D8" : "#FFFFFFA6",
        height: '100px',
        config: config.default
    })


    const AnimatedContainer = animated(Container)
    return (
        <div onClick={() => { history.push("/my_profile") }}>
            <AnimatedContainer className="GLTileText" id="GLTileBackground" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} style={tileBackgroundAnimated}>
                <Col id="GLMainColumn">
                    <span> A new <span style={{ fontWeight: 'bold' }}>review</span> was added for one of your gigs! </span>
                    <span> {review != null && formatTimestamp(review.date)} </span>
                </Col>

            </AnimatedContainer>
        </div>)

}

export default NotificationTile



