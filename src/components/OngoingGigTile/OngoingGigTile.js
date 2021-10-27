import { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import logo from '../../assets/GighubLogo.js';
import './ongoingGigTile.css'
import Button from '../../components/Button'
import * as Constants from '../../constants'
import {
  AlertIcon
} from '@primer/octicons-react';

import './ongoingGigTile.css'

const OngoingGigTile = (props) => {
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
  const startDate
    const endDate
  */

  // placeholders for now:
  let companyName = "Google"
  const companyLogo = logo
  let companyCity = "Singapore"
  let jobTitle = "Freelance designer"
  let jobDesc = "Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
  let pendingReview = false;
  let startDate = '2021/07/02'
   let endDate = '2021/07/02'
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



  const AnimatedContainer = animated(Container)
  return (
    <div>
    <AnimatedContainer className="TileText2" id="TileBackground2" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} style={tileBackgroundAnimated}>
      <Col id="MainColumn2">
          <Row>
              <div id="LogoBox2">
                  <img src={logo} id="LogoImg" />
              </div>
              <Col>
                  <div id="CompanyName2">
                      {companyName}
                  </div>
                  <div id="CompanyLocation2">
                      {companyCity}
                  </div>
              </Col>
              <Col>
                  <div id="JobTitle2">
                      {jobTitle}
                  </div>
              </Col>
              <Col>
              <span className="PayText2">{payAmt}/</span>
              <span id="PayForText2">{payFor}</span>
              </Col>
              <Col xs={1}>
              <div id='Highlight2'> {isFlexible ? 'Flexible' : 'Fixed'}</div>
               </Col>
          </Row>
          <Row>
          <div id="JobTitle2">
              Deliverables:
          </div>
          </Row>
          <Row justify="between">
            <Col xs={7}>
            <div id="JobDesc2">
                {jobDesc}
            </div>
            </Col>
            <Col xs={4}>
              <span style={{color: Constants.GREY, fontWeight: 'bold', margin:'20px' }}>Start: {startDate}</span>
              <span style={{color: 'maroon', fontWeight: 'bold'}}>   Deadline: {endDate} </span>
              <div style={{height:'20px'}}></div>
              <Row>
              <Col>
              <Button text="Done"> </Button>
              </Col>
              <Col md={7}>
              <Button text="Contact Employer"> </Button>
              </Col>
              <Col md={1}>
              <Button icon={<AlertIcon />} type="SECONDARY"> </Button>
              </Col>
              </Row>
            </Col>
          </Row>
      </Col>

  </AnimatedContainer>

  </div>
)
}

export default OngoingGigTile