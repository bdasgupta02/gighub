import { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import logo from "../../assets/google.svg"
import Button from "../Button/index"

import "./gigDetails.css"

const GigDetails = (props) => {
  let title = "Event Poster Designer"
  // FOR POPUP (APPLY GIG) => Check out react-modal
  return (
    <div id="GDBase">
      <Row>
        <Col>
          <Row>
            <Col>{title}</Col>
          </Row>
          <Row>
            <Col>tags go here</Col>
          </Row>
          <Row>
            <Col>
              <img src={logo} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>)
}

export default GigDetails