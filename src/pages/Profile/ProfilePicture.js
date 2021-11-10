import { Container, Row, Col } from "react-grid-system";
import Button from '../../components/Button';
import './profile.css'

import LogoGenerator from "../../components/LogoGenerator";

/**
 * Required props: hasProfilePic
 * 
 * Optional props: profilePicLink || userName
 * @param {*} props 
 * @returns 
 */
export function ProfilePicture(props) {
  return (
    <Container>
      <Row>
        {props.hasProfilePic ? (
          <div>
            {' '}
            <img className="ProfilePicture" src={props.profilePicLink} />{' '}
          </div>
        ) : (
          <div
            className="ProfilePicture"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {' '}
            <LogoGenerator name={props.userName} />
          </div>
        )}
        <Col xs={2}>
          <Row className="ProfilePagePictureButtonSpacer" />
          <Row>
            <Button
              type="PRIMARY"
              text="Change picture"
              onClick={changePicture}
            />
          </Row>
          <Row className="ProfilePagePictureButtonSpacer" />
          <Row>
            <Button
              type="WHITE"
              text="Remove picture"
              onClick={removePicture}
            />
          </Row>
        </Col>
      </Row>
      <Row className="ProfilePageMainHeaderSpacer"></Row>
    </Container>
  );
}

function removePicture(props) {
}
function changePicture(props) {}