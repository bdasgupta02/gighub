import { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import WorkerNavBar from "../NavBar/index"
import DashGoalTile from '../DashGoalTile/index'
import DashHighlightsTile from "../DashHighlightsTile/index"

import "./workerDashboard.css"

const WorkerDashboard = (props) => {
  let username = "John"
  let message = "You're on the right track!"

  return (
    <div id="WDBase">
      <Row className="WDText" id="WDBackground">
        <Col id="WDMainCol" md={10}>
          <Row id="WDHeader">
            <div id="WDHeaderTexts">
              <span id="WDHeaderTitle">Hello {username}</span> <br />
              <span id="WDHeaderSubtitle">{message}</span>
            </div>
          </Row>
          <Row id="WDBody">

          </Row>
        </Col>
      </Row>
    </div>)
}

export default WorkerDashboard