import React, { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import Highlight from './Highlight';
import LogoGenerator from '../LogoGenerator';
import './gigListingTile.css'

// TODO: default props
// TODO: need to check if phone taps behave the same with hover

const GigListingTile = (props) => {
    const [isHovering, setIsHovering] = useState(false)


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
    companyLogo = companyLogo === "" ? <LogoGenerator name={companyName} /> : companyLogo

    const tileBackgroundAnimated = useSpring({
        boxShadow: isHovering ? "4px 10px 40px #00000026" : "1px 3px 5px #00000026",
        backgroundColor: isHovering ? "#FFFFFFFF" : "#FFFFFFA6",
        config: config.default
    })

    console.log('good match')
    console.log(isGoodMatch)


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
        <div>
            {/* <<<<<<< HEAD
            <AnimatedContainer className="TileText" id="TileBackground" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} style={tileBackgroundAnimated}>
                <Col id="MainColumn">
                    <Row>
                        <div id="LogoBox">
                            <img src={logo} id="LogoImg" />
                        </div>
                        <Col>
                            <div id="CompanyName">
                                {companyName}
                            </div>
                            <div id="CompanyLocation">
======= */}
            <AnimatedContainer className="GLTileText" id="GLTileBackground" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} style={tileBackgroundAnimated}>
                <Col id="GLMainColumn">
                    <Row style={{ alignSelf: 'flex-start' }}>
                        <div id="GLLogoBox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {companyLogo}
                        </div>
                        <Col>
                            <div id="GLCompanyName">
                                {companyName}
                            </div>
                            <div id="GLCompanyLocation">
                                {/* >>>>>>> d4bd579547ca11f363e1c30a0b6ef009725f858f */}
                                {companyCity}
                            </div>
                        </Col>
                    </Row>
                    {/* <<<<<<< HEAD
                <div id="JobTitle">
                    {jobTitle}
                </div>
                <div id="JobDesc">
                    {jobDesc}
                </div>
                <Row id="PayTextBox" className="Bottom">
                    <div className="PayText">{payAmt}</div>
                    <div className="PayText">&nbsp;/&nbsp;</div>
                    <Col id="PayForCol">
                        <div className="Spacer"></div>
                        <Row id="PayForText">{payFor}</Row>
                    </Col>
                </Row>
                <Row id="Highlights" className="Bottom">
======= */}
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
                        {/* >>>>>>> d4bd579547ca11f363e1c30a0b6ef009725f858f */}
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



