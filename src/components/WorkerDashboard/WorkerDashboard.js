import { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import DashGoalTile from '../DashGoalTile/index'
import DashHighlightsTile from "../DashHighlightsTile/index"
import DashListingTile from '../DashListingTile/index'

import Button from "../Button/index"

import "./workerDashboard.css"

const WorkerDashboard = (props) => {
  let username = "John"
  let message = "You're on the right track!"

  return (
    <div id="WDBase">
      <Row id="WDHeader">
        <div id="WDHeaderTexts">
          <span id="WDHeaderTitle">Hello {username}</span> <br />
          <span id="WDHeaderSubtitle">{message}</span>
        </div>
      </Row>
      <Row id="WDBody">
        <Col>
          <Row id="WDHighlightsBG">
            <Col className="WDHighlightsTile" xs={2.2}>
              <DashHighlightsTile value="S$350.00" desc="earned this week" />
            </Col>
            <Col className="WDHighlightsTile" xs={2.2}>
              <DashHighlightsTile value="1" desc="job completed this week" />
            </Col>
            <Col className="WDHighlightsTile" xs={2.2}>
              <DashHighlightsTile value="2" desc="jobs due soon" />
            </Col>
          </Row>

          <Row id="WDSectionBG">
            <Col>
              <Row>
                <Col>
                  Ongoing Gigs
                </Col>
              </Row>
              <Row className="emptyRow">
                <Col>

                </Col>
              </Row>
              <Row>
                <div className="WDSectionTile">
                  <DashListingTile />
                </div>
                <div className="WDSectionTile">
                  <DashListingTile />
                </div>
                <div className="WDSectionTile">
                  <DashListingTile />
                </div>
              </Row>
              <Row className="emptyRow">
                <Col>

                </Col>
              </Row>
              <Row>
                <Col>
                  <Button text="View all gigs" forceWidth="120px" />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row id="WDSectionBG">
            <Col>
              <Row>
                <Col>
                  Applications
                </Col>
              </Row>
              <Row className="emptyRow">
                <Col>

                </Col>
              </Row>
              <Row>
                <Col className="WDSectionTile" xs={2.2}>
                  <DashListingTile />
                </Col>
                <Col className="WDSectionTile" xs={2.2}>
                  <DashListingTile />
                </Col>
                <Col className="WDSectionTile" xs={2.2}>
                  <DashListingTile />
                </Col>
              </Row>
              <Row className="emptyRow">
                <Col>

                </Col>
              </Row>
              <Row>
                <Col>
                  <Button text="View all applications" forceWidth="120px" />
                </Col>
              </Row>
            </Col>
          </Row>


          <Row id="WDSectionBG">
            <Col>
              <Row>
                <Col>
                  Goals
                </Col>
              </Row>
              <Row className="spacer">
                <Col>

                </Col>
              </Row>
              <Row>
                <Col className="WDGoalsTile" xs={7}>
                  <DashGoalTile />
                </Col>
              </Row>
              <Row className="spacer">
                <Col>

                </Col>
              </Row>
              <Row>
                <Col className="WDGoalsTile" xs={7}>
                  <DashGoalTile />
                </Col>
              </Row>
              <Row className="spacer">
                <Col>

                </Col>
              </Row>
              <Row>
                <Col className="WDGoalsTile" xs={7}>
                  <DashGoalTile />
                </Col>
              </Row>
              <Row className="spacer">
                <Col>

                </Col>
              </Row>
            </Col>
          </Row>

        </Col>
      </Row>
    </div>)
}

export default WorkerDashboard