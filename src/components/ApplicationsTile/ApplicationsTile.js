import React, { useEffect, useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import logo from '../../assets/GighubLogo.js';
import './applicationsTile.css'
import Button from '../../components/Button'
import * as Constants from '../../constants'
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import {
  AlertIcon
} from '@primer/octicons-react';

import './applicationsTile.css'
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext.js';
import { getWorkerAppliedGigs } from '../../database/firebaseFunctions.js';

const ApplicationsTile = (props) => {
  const [isHovering, setIsHovering] = useState(false)
  const [open, setOpen] = React.useState(false);
  const { isWorker, currentUser } = useAuth();
  const [gigs, setGigs] = useState()

  const handleClickToOpen = () => {
    setOpen(true);
  };
  const handleToClose = () => {
    setOpen(false);
  };
  const history = useHistory();



  /* final props:
  const companyName = props.companyName
  const companyLogo = props.companyLogo
  const companyCity = props.companyCity
  const jobTitle = props.jobTitle
  const jobDesc = props.jobDesc
  const payAmt = props.payAmt
  const payFor = props.payFor
  const company = props.company

  const isFlexible = props.isFlexible;
  // check how to handle link (should this go to the gig details page automatically)
  const link = props.link
  
  const startDate
    const endDate
  */

  // placeholders for now:
  let companyName = props.companyName ?? "Google"
  const companyLogo = props.companyLogo ?? logo
  let companyCity = props.companyCity ?? "Singapore"
  let jobTitle = props.jobTitle ?? "Freelance designer"
  let jobDesc = props.jobDesc ?? "Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
  let pendingReview = props.pendingReview ?? false;
  let startDate = props.startDate ?? '2021/07/02'
  let endDate = props.endDate ?? '2021/07/02'
  const payAmt = props.payAmt ?? "S$ 1,000"
  const payFor = props.payFor ?? "10 days"
  const isFlexible = props.isFlexible ?? false;
  const link = props.contractLink ?? 'https://google.com'
  let contactNum = props.contactNum ?? "No information input."
  let companyId = props.companyId ?? null;
  let gigStatus = props.gigStatus ?? 'Processing...'
  let gigId = props.gigId ?? null

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
        <Col id="MainColumn2" >
          <Row>

            <div id="LogoBox2" onClick={() => history.push({ pathname: "/view_company", state: { companyId: companyId.id } })}>
              <img src={logo} id="LogoImg" />
            </div>
            <Col>
              <div id="CompanyName2" onClick={() => history.push("/view_company", { companyId: companyId.id })} >
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

            <Col>
              <Row justify="center">
                {gigStatus}
              </Row>
              <Row justify="center" align="center">
                <div id="linkText" onClick={() => history.push({ pathname: "/view_gig", state: { gigId: gigId } })}> View gig to respond</div>
              </Row>
            </Col>
          </Row>
        </Col>

      </AnimatedContainer >

    </div >
  )
}

export default ApplicationsTile
