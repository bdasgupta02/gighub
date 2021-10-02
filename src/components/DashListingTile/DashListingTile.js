import { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import logo from '../../assets/google.svg';
import './dashListingTile.css'

// TODO: default props
// TODO: need to check if phone taps behave the same with hover

const DashListingTile = (props) => {
    const [isHovering, setIsHovering] = useState(false)

    /* final props:
    const companyName = props.companyName
    const companyLogo = props.companyLogo
    const companyCity = props.companyCity
    const jobTitle = props.jobTitle
    const jobDeadline = props.jobDeadline
    const payAmt = props.payAmt
    const payFor = props.payFor
    // check how to handle link (should this go to the gig details page automatically)
    const link = props.link
    */

    // placeholders for now:
    let companyName = "Google"
    const companyLogo = logo
    let companyCity = "Singapore"
    let jobTitle = "Freelance designer"
    // this would be date format and upcoming colors would be red
    let jobDeadline = "Deadline: 7 November 2021"
    const payAmt = "S$ 1,000"
    const payFor = "10 days"
    const link = "/"

    const companyNameLimit = 15
    const companyCityLimit = 22
    const jobTitleLimit = 27
    const jobDescLimit = 120

    companyName = companyName.length > companyNameLimit ? companyName.substr(0, companyNameLimit) + "..." : companyName
    companyCity = companyCity.length > companyCityLimit ? companyCity.substr(0, companyCityLimit) + "..." : companyCity
    jobTitle = jobTitle.length > jobTitleLimit ? jobTitle.substr(0, jobTitleLimit) + "..." : jobTitle
    jobDeadline = jobDeadline.length > jobDescLimit ? jobDeadline.substr(0, jobDescLimit) + "..." : jobDeadline

    const tileBackgroundAnimated = useSpring({
        boxShadow: isHovering ? "4px 10px 40px #00000026" : "1px 3px 1px #00000026",
        backgroundColor: isHovering ? "#FFFFFFFF" : "#FFFFFFA6",
        config: config.default
    })

    const AnimatedContainer = animated(Container)
    return (<AnimatedContainer className="TileText" id="DashTileBackground" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} style={tileBackgroundAnimated}>
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
                {jobDeadline}
            </div>
            <Row id="DashPayTextBox" className="Bottom">
                <div className="PayText">{payAmt}</div>
                <div className="PayText">&nbsp;/&nbsp;</div>
                <Col id="PayForCol">
                    <div className="Spacer"></div>
                    <Row id="PayForText">{payFor}</Row>
                </Col>
            </Row>
        </Col>
    </AnimatedContainer>)
}

export default DashListingTile