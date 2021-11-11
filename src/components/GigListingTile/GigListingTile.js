import React, { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import Highlight from './Highlight';
import LogoBox from '../LogoBox';
import { useHistory } from 'react-router';
import LogoGenerator from '../LogoGenerator';
import './gigListingTile.css'

// TODO: default props
// TODO: need to check if phone taps behave the same with hover

const GigListingTile = (props) => {
    const history = useHistory()
    const [isHovering, setIsHovering] = useState(false)

    console.log(props)

    // placeholders for now:
    let companyName = props.companyName ?? "Google"
    let companyCity = props.companyCity ?? "Singapore"
    let jobTitle = props.title ?? "Freelance designer"
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
        boxShadow: isHovering ? "4px 10px 40px #00000026" : "1px 3px 5px #00000026",
        backgroundColor: isHovering ? "#FFFFFFFF" : "#FFFFFFA6",
        config: config.default
    })


    // init highlights
    let highlights = []
    if (isGoodMatch) {
        highlights.push(
            <Highlight type="GOOD_MATCH" />
        )
    }
    if (isFlexible) {
        highlights.push(
            <Highlight type="FLEXIBLE" />
        )
    } else {
        highlights.push(
            <Highlight type="FIXED" />
        )
    }
    if (isNew) {
        highlights.push(
            <Highlight type="NEW" />
        )
    }

    const AnimatedContainer = animated(Container)
    return (
        <div onClick={() => history.push("/view_gig", { gigId: props.id })}>

            <AnimatedContainer className="GLTileText" id="GLTileBackground" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} style={tileBackgroundAnimated}>
                <Col id="GLMainColumn">
                    <Row style={{ alignSelf: 'flex-start' }}>
                        <LogoBox src={companyLogo} name={companyName} />
                        <Col>
                            <div id="GLCompanyName">
                                {companyName}
                            </div>
                            <div id="GLCompanyLocation">

                                {companyCity}
                            </div>
                        </Col>
                    </Row>

                    <div id="GLJobTitle" style={{ alignSelf: 'flex-start' }}>
                        {jobTitle}
                    </div>
                    <div id="GLJobDesc" style={{ alignSelf: 'flex-start' }}>
                        {jobDesc}
                    </div>
                    <Row id="GLPayTextBox" className="GLBottom" style={{ alignSelf: 'flex-start' }}>
                        <div className="GLPayText">{payAmt}</div>
                        <div className="GLPayText">&nbsp;/&nbsp;</div>
                        <Col id="GLPayForCol">
                            <div className="GLSpacer"></div>
                            <Row id="GLPayForText">{payFor}</Row>
                        </Col>
                    </Row>
                    <Row className="GLBottom" style={{ alignSelf: 'flex-start' }}>

                        {highlights.map((component, index) => (
                            <div>
                                {component}
                            </div>
                        ))}
                    </Row>
                </Col>

            </AnimatedContainer>
        </div>)

}

export default GigListingTile



