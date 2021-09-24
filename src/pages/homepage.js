import { Container, Row, Col } from 'react-grid-system';
import NavButton from '../components/NavButton/NavButton.js';

export default function Homepage(props) {
  return (
    <div>
      <Row debug style={{ height: "100vh" }}>
        <Col debug md={2} >
          <Container style={{height: "100%", width: "100%"}}>
            <Row style={{height: "20%"}}>
              GigHub Logo
            </Row>
            <Row style={{height: "60%"}}>
              Icons
              <NavButton buttonText="hi" />
            </Row>
            <Row style={{height: "20%"}}>
              Bottom options
            </Row>
          </Container>
        </Col>

        <Col debug md={10}>
          Main Page
        </Col>
      </Row>
    </div>
  );
}
