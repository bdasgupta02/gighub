import { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import logo from "../../assets/google.svg"
import Button from "../Button/index"
import Highlight from "../GigListingTile/Highlight"
import FullPage from "../../pages/FullPage"

import "./gigDetails.css"

const GigDetails = (props) => {
  let title = "Event Poster Designer"
  const [details, setDetails] = useState({
    title: "Event Poster Designer",
    tags: ["85% MATCH", "FLEXIBLE", "NEW"],
    listingDate: "20/10/2021",
    listingLogo: "",
    listingPoster: "National University of Singapore",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    availableUntil: "20/11/2021",
    deliverables: "1x Event poster (in .ai format)",
    payment: "5 cents",
    completeBy: "15/12/2021",
    spots: "2"
  })

  return (
    <div>
      <FullPage header={
        <Row className="GDBase">
          <Col>
            <Row>
              <Col><span className="GDHeaderTitle">{details.title}</span></Col>
            </Row>
            <Row className="spacingRow">
              <Col></Col>
            </Row>
            <Row className="GDHeaderTags">
              {details.tags.map((tag) => {
                return (
                  <div>
                    <Highlight type={tag} />
                  </div>
                )
              })}
            </Row>
            <Row className="spacingRow">
              <Col></Col>
            </Row>
            <Row>
              <Col sm={2}>
                <div className="GDHeaderLogo" >
                  {/*TODO: Dynamic rendering of logo*/}
                  <img src={logo} />
                </div>
              </Col>
              <Col sm={10}>
                <span className="GDHeaderSub1">Listed on {details.listingDate} by</span> <br></br>
                <span className="GDHeaderSub2">{details.listingPoster}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      } children={
        <Row className="GDBase">
          <Col>
            <Row className="emptyRow">
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionTitle">Description</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionContent">
                  {details.description}
                </span>
              </Col>
            </Row>
            <Row className="emptyRow">
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionTitle">Details</span>
              </Col>
            </Row>

            <Row className="spacingRow">
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <span className="GDSectionSubTitle">Available until</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionContent">
                  {details.availableUntil}
                </span>
              </Col>
            </Row>

            <Row className="spacingRow">
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <span className="GDSectionSubTitle">Deliverables</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionContent">
                  {details.deliverables}
                </span>
              </Col>
            </Row>

            <Row className="spacingRow">
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <span className="GDSectionSubTitle">Payment</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionContent">
                  {details.payment}
                </span>
              </Col>
            </Row>

            <Row className="spacingRow">
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <span className="GDSectionSubTitle">Complete by</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionContent">
                  {details.completeBy}
                </span>
              </Col>
            </Row>

            <Row className="spacingRow">
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <span className="GDSectionSubTitle">Spots</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionContent">
                  {details.spots}
                </span>
              </Col>
            </Row>

            <Row className="emptyRow">
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <div className="extraVerticalPadding">
                  <Button text="Apply" type="PRIMARY" forceWidth="90px" />
                </div>
              </Col>
            </Row>

          </Col>
        </Row>
      } />
    </div>)
}

export default GigDetails