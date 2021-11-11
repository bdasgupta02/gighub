import { Container, Row, Col } from 'react-grid-system';
import React, { useState } from 'react';
import ProfileSkill from '../Profile/ProfileSkill';

import '../Profile/profile.css';

export function VPContactDetails(props) {
  return (
    <Container>
      <Row className="ProfilePageSectionHeader">Contact Details</Row>
      <Row>
        <Col>
          <Row className="ProfilePageItemHeader">Email</Row>
          <Row>{props.email}</Row>
        </Col>
        <Col>
          <Row className="ProfilePageItemHeader">Phone Number</Row>
          <Row>{props.phoneNumber}</Row>
        </Col>
      </Row>
    </Container>
  );
}
