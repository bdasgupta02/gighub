import { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import DashGoalTile from '../DashGoalTile/index'
import DashHighlightsTile from "../DashHighlightsTile/index"
import DashListingTile from '../DashListingTile/index'

import Button from "../Button/index"

import "./companyDashboard.css"

const CompanyDashboard = (props) => {
  let username = "Google"
  let message = "You're on the right track!"

  return (
    <div id="CDBase">
      <Row id="CDHeader">
        <div id="CDHeaderTexts">
          <span id="CDHeaderTitle">Hello {username}</span> <br />
          <span id="CDHeaderSubtitle">{message}</span>
        </div>
      </Row>
      <Row id="CDBody">
        <Col>
          <Row id="CDHighlightsBG">
            <Col className="CDHighlightsTile" xs={2.2}>
              <DashHighlightsTile value="3" desc="contracts signed this week" />
            </Col>
            <Col className="CDHighlightsTile" xs={2.2}>
              <DashHighlightsTile value="2" desc="contracts completed & paid this week" />
            </Col>
            <Col className="CDHighlightsTile" xs={2.2}>
              <DashHighlightsTile value="6" desc="pending payments to be made" />
            </Col>
          </Row>

          <Row id="CDSectionBG">
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
                <Col className="CDSectionTile" xs={2.2}>
                  <DashListingTile />
                </Col>
                <Col className="CDSectionTile" xs={2.2}>
                  <DashListingTile />
                </Col>
                <Col className="CDSectionTile" xs={2.2}>
                  <DashListingTile />
                </Col>
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

          <Row id="CDSectionBG">
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
                <Col className="CDGoalsTile" xs={7}>
                  <DashGoalTile />
                </Col>
              </Row>
              <Row className="spacer">
                <Col>
                  
                </Col>
              </Row>
              <Row>
                <Col className="CDGoalsTile" xs={7}>
                  <DashGoalTile />
                </Col>
              </Row>
              <Row className="spacer">
                <Col>
                  
                </Col>
              </Row>
              <Row>
                <Col className="CDGoalsTile" xs={7}>
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

export default CompanyDashboard