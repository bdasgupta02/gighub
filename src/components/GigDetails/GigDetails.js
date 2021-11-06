import { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import logo from "../../assets/google.svg"
import Button from "../Button/index"
import Highlight from "../GigListingTile/Highlight"
import FullPage from "../../pages/FullPage"

import "./gigDetails.css"

const GigDetails = (props) => {
  let title = "Event Poster Designer"

  return (
    <div>
      <FullPage header={
        <Row className="GDBase">
          <Col>
            <Row>
              <Col><span className="GDHeaderTitle">{title}</span></Col>
            </Row>
            <Row className="spacingRow">
              <Col></Col>
            </Row>
            <Row className="GDHeaderTags">
                <div><Highlight type="85% MATCH" /></div>
                <div><Highlight type="FLEXIBLE" /></div>
                <div><Highlight type="NEW" /></div>
            </Row>
            <Row className="spacingRow">
              <Col></Col>
            </Row>
            <Row>
              <Col sm={2}>
                <div className="GDHeaderLogo" >
                  <img src={logo} />
                </div>
              </Col>
              <Col sm={10}>
                <span className="GDHeaderSub1">Listed on 20/10/2021 by</span> <br></br>
                <span className="GDHeaderSub2">National University of Singapore</span>
              </Col>
            </Row>
          </Col>
        </Row>
      } children={
        <Row className="GDBase">
          <Col>

          </Col>
        </Row>
      } />
    </div>)
}

export default GigDetails