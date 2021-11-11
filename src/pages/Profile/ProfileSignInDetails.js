import './profile.css'
import { Container, Row, Col } from 'react-grid-system';
import { DotFillIcon } from '@primer/octicons-react';

/**
 * Required props: userEmail, userPassword
 * @param {*} props 
 * @returns 
 */
export function ProfileSignInDetails(props) {
  //let allchar = new RegExp('.');
  return (
    <Container>
      <Row className="ProfilePageSectionSpacer" />
      <Row className="ProfilePageSectionHeader"> Sign-in details </Row>
      <Row>
        <Col>
          <Row className="ProfilePageItemHeader">Email</Row>
          <Row>{props.userEmail}</Row>
        </Col>
        <Col>
          <Row className="ProfilePageItemHeader">Password</Row>
          <Row>
            <div className="ProfilePageItemHeader">
              {
              props.userPassword.replace(/./g, '•')
              }
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
