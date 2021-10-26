import { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import Highlight from './Highlight';
import logo from '../../assets/GighubLogo.js';
import './gigListingTile.css'
import Button from '../../components/Button'

// TODO: default props
// TODO: need to check if phone taps behave the same with hover

const GigListingTile = (props) => {
    const [isHovering, setIsHovering] = useState(false)

    /* final props:
    const companyName = props.companyName
    const companyLogo = props.companyLogo
    const companyCity = props.companyCity
    const jobTitle = props.jobTitle
    const jobDesc = props.jobDesc
    const payAmt = props.payAmt
    const payFor = props.payFor
    const isNew = props.isNew;
    const isGoodMatch = props.isGoodMatch;
    const isFlexible = props.isFlexible;
    // check how to handle link (should this go to the gig details page automatically)
    const link = props.link
    const pendingReview
    */

    // placeholders for now:
    let companyName = "Google"
    const companyLogo = logo
    let companyCity = "Singapore"
    let jobTitle = "Freelance designer"
    let jobDesc = "Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
    let pendingReview = false;
    const payAmt = "S$ 1,000"
    const payFor = "10 days"
    const isNew = true;
    const isGoodMatch = true;
    const isFlexible = false;
    const link = null

    const companyNameLimit = 15
    const companyCityLimit = 22
    const jobTitleLimit = 27
    const jobDescLimit = 120

    companyName = companyName.length > companyNameLimit ? companyName.substr(0, companyNameLimit) + "..." : companyName
    companyCity = companyCity.length > companyCityLimit ? companyCity.substr(0, companyCityLimit) + "..." : companyCity
    jobTitle = jobTitle.length > jobTitleLimit ? jobTitle.substr(0, jobTitleLimit) + "..." : jobTitle
    jobDesc = jobDesc.length > jobDescLimit ? jobDesc.substr(0, jobDescLimit) + "..." : jobDesc

    const tileBackgroundAnimated = useSpring({
        boxShadow: isHovering ? "4px 10px 40px #00000026" : "1px 3px 1px #00000026",
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
      <div>
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
                        {companyCity}
                    </div>
                </Col>
            </Row>
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
                {highlights.map((component, index) => (
                    <div>
                        {component}
                    </div>
                ))}
            </Row>
        </Col>

    </AnimatedContainer>

    </div>
  )
}

export default GigListingTile
