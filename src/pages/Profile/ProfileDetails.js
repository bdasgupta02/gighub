import ProfileSkill from './ProfileSkill';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import FileUploader from '../../components/FileUploader';
import { FileType } from '../../enum/FileType';
import {
  createResume,
  updateWorkerDetails,
} from '../../database/firebaseFunctions';
import { XCircleIcon } from '@primer/octicons-react';

import './profile.css';

const modalStyle = {};

/**
 *
 * @param {Date} dob
 */

/**
 * NOTE: No link safety for resume, will redirect to a firebase 404 if valid firestore link but invalid details
 * required props: isWorker, userName, resumeLink, dob, usersGender, userId
 * optional props: workerSkills
 * @param {*} props
 * @returns
 */
export function ProfileDetails(props) {
  let hasResumeTemp = props.resumeLink !== '';
  const [hasResume, setHasResume] = useState(hasResumeTemp);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newResumeFile, setNewResumeFile] = useState(null);
  let dateString;
  if (props.dob !== undefined) {
    let dob = new Date(props.dob.seconds*1000);
    //console.log(dob);
    dateString =
      dob.getDate() +
      ' ' +
      getNamedMonth(dob.getMonth()) +
      ' ' +
      dob.getFullYear();
  } else {
    dateString = 'No date of birth specified'
  }
  useEffect(() => {
    let userId = props.userId;
    if (newResumeFile !== null) {
      createResume(newResumeFile).then((url) => {
        let updateDetails = {
          id: userId,
          resume: url,
        };
        updateWorkerDetails(updateDetails);
        setHasResume(true);
      });
    }
  }, [newResumeFile]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function removeResume() {
    let userId = props.userId;
    let updateDetails = {
      id: userId,
      resume: '',
    };
    updateWorkerDetails(updateDetails);
    setHasResume(false);
  }
  let line1 = props.location.addressLine1 ?? '';
  let line2 = props.location.hasOwnProperty('addressLine2')
    ? ', ' + props.location.addressLine2
    : '';
  let city = props.location.hasOwnProperty('city')
    ? ', ' + props.location.city
    : '';
  let postal = props.location.hasOwnProperty('postal')
    ? ' ' + props.location.postal
    : '';
  let constructedLocation = line1 + line2 + city + postal;
  if (constructedLocation == '') {
    constructedLocation = 'No Location Set';
  }

  return (
    <Container>
      <Row className="ProfilePageSectionHeader"> Details </Row>
      <Row>
        <Col>
          <Row className="ProfilePageItemHeader">Name</Row>
          <Row>{props.userName}</Row>
        </Col>
        {props.isWorker ? (
          <Col>
            <Row className="ProfilePageItemHeader">Resume</Row>
            <Row>
              {hasResume ? (
                <div>
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
                  <a onClick={removeResume} style={{ cursor: 'pointer' }}>
                    {' '}
                    <XCircleIcon size={16} />
                  </a>
                </div>
              ) : (
                // (<button className="ProfilePageResume" onClick={addResume}>Add resume</button>)
                <a
                  href={null}
                  onClick={openModal}
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
            <ReactModal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              className="ProfileModalStyle"
              contentLabel="Add resume"
            >
              <FileUploader
                setFileOutput={setNewResumeFile}
                fileTypeEnum={FileType.DOCUMENTS}
                closer={closeModal}
              />
            </ReactModal>
          </Col>
        ) : (
          <div />
        )}
      </Row>
      <Row className="ProfilePageItemSpacer" />
      {props.isWorker ? (
        <Row>
          <Col>
            <Row className="ProfilePageItemHeader">Date Of Birth</Row>
            <Row>{dateString}</Row>
          </Col>
          <Col>
            <Row className="ProfilePageItemHeader">Skills</Row>
            <Row md={5} sm={2}>
              {props.workerSkills.map((x) => (
                <ProfileSkill text={x} />
              ))}
            </Row>
          </Col>
        </Row>
      ) : (
        <div />
      )}
      {props.isWorker ? <Row className="ProfilePageItemSpacer" /> : <div />}
      {props.isWorker ? (
        <div></div>
      ) : (
        <Col>
          <Row className="ProfilePageItemHeader">Location</Row>
          <Row> {constructedLocation}</Row>
        </Col>
      )}
    </Container>
  );
}

function getNamedMonth(month) {
  switch (month) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
  }
}
