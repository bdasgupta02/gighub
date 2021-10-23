import { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import WorkerNavBar from "../NavBar/index"

import "./workerDashboard.css"

const WorkerDashboard = (props) => {
  return (
    <div id="WDBase">
        <Row className="WDText" id="WDBackground">
          <Col id="WDNavCol" md={2}>
            <WorkerNavBar />
          </Col>
          <Col id="WDMainCol" md={10}>
            Hello
          </Col>
        </Row>
    </div>)
}

export default WorkerDashboard