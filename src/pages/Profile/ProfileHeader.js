import { StarIcon } from "@primer/octicons-react";
import './profile.css'
import { Container, Row, Header } from "react-grid-system";
export function ProfileHeader(props) {
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
