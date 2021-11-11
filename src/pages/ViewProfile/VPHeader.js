import { StarIcon } from "@primer/octicons-react";
import '../Profile/profile.css'
import { Container, Row } from "react-grid-system";
export function VPHeader(props) {
  let hasReview = props.numReview > 0
  return (
    <Container>
      <Row className="ProfilePageMainHeader">Profile</Row>
      { hasReview?
      (<Row>
        <StarIcon size={16} /> {(props.avgReview / props.numReview).toFixed(1)}
      </Row>):
      (<Row>NOT REVIEWED</Row>)
      }
    </Container>
  );
}
