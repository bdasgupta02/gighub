import ProfileSkill from './ProfileSkill';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

import './profile.css';

/**
 * NOTE: No link safety for resume, will redirect to a firebase 404 if valid firestore link but invalid details
 * required props: isWorker, userName, resumeLink, usersAge, usersGender
 * optional props: workerSkills
 * @param {*} props
 * @returns
 */
export function ProfileDetails(props) {
  let hasResume = props.resumeLink !== '';
  hasResume = false;
  //let resumeLink = "www.sadwaxcawedds.com"
  return (
    <Container>
      <Row className="ProfilePageSectionHeader"> Details </Row>
      <Row>
        <Col>
          <Row className="ProfilePageItemHeader">Name</Row>
          <Row>{props.userName}</Row>
        </Col>
        <Col>
          <Row className="ProfilePageItemHeader">Resume</Row>
          <Row>
            {hasResume ? (
              <a
                href={props.resumeLink}
                style={{
                  cursor: 'pointer',
                  color: '#545454',
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                  textDecorationLine: 'underline',
                }}
              >
                Download resume
              </a>
            ) : (
              // (<button className="ProfilePageResume" onClick={addResume}>Add resume</button>)
              <a
                href={null}
                style={{
                  cursor: 'pointer',
                  color: '#545454',
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                  textDecorationLine: 'underline',
                }}
              >
                Add resume
              </a>
            )}
          </Row>
        </Col>
      </Row>
      <Row className="ProfilePageItemSpacer" />
      <Row>
        <Col>
          <Row className="ProfilePageItemHeader">Age</Row>
          <Row>{props.usersAge}</Row>
        </Col>
        {props.isWorker ? (
          <Col>
            <Row className="ProfilePageItemHeader">Skills</Row>
            <Row md={5} sm={2}>
              {props.workerSkills.map((x) => (
                <ProfileSkill text={x} />
              ))}
            </Row>
          </Col>
        ) : (
          <div />
        )}
      </Row>

      <Row className="ProfilePageItemSpacer" />
      <Row>
        {props.isWorker ? (
          <Col>
            <Row className="ProfilePageItemHeader">Gender</Row>
            <Row>{props.usersGender}</Row>
          </Col>
        ) : (
          <div />
        )}
      </Row>
    </Container>
  );
}

function addResume() {}
