import { Container, Row, Col } from 'react-grid-system';

export default function Homepage(props) {
  return (
    <div>
      <Row style={{ height: "100vh" }}>
        <Col xs={2}>
          <Container fluid style={{height: "100%", width: "100%"}}>
            <Row style={{height: "20%"}}>
              GigHub Logo
            </Row>
            <Row style={{height: "60%"}}>
              Icons

            </Row>
            <Row style={{height: "20%"}}>
              Bottom options
            </Row>
          </Container>
        </Col>

        <Col xs={10} style={{ backgroundColor: "#E8F0F2"}}>
          Main Page

        </Col>
      </Row>
    </div>
  );
}
