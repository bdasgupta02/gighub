import ProfileSkill from './ProfileSkill';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {useState} from 'react';
import FileUploader from '../../components/FileUploader';
import { FileType } from '../../enum/FileType';
import { createResume, updateWorkerDetails } from '../../database/firebaseFunctions';


import './profile.css';

/**
 * NOTE: No link safety for resume, will redirect to a firebase 404 if valid firestore link but invalid details
 * required props: isWorker, userName, resumeLink, usersAge, usersGender, userId
 * optional props: workerSkills
 * @param {*} props
 * @returns
 */
export function ProfileDetails(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newResumeFile, setNewResumeFile] = useState(null);
  const modalStyle = {}
  let hasResume = props.resumeLink !== '';
  hasResume = false;
  return (
    <Container>
      <Modal 
      isOpen = {modalIsOpen}
      onRequestClose = {closeModal}
      style = {modalStyle}
      contentLabel = "Add resume"
      >
        <FileUploader setFileOutput={setNewResumeFile} fileTypeEnum={FileType.DOCUMENTS}/>
      </Modal>
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

function addResume() {

}

function openModal() {
  setIsOpen(true);
}

function closeModal() {
  setIsOpen(false);
  if (newResumeFile !== null) {
    let resumeUrl = createResume(newResumeFile);
    let updateDetails = {
      id: {userId},
      resume: {resumeUrl}
    };
    updateWorkerDetails(updateDetails);
    setNewResumeFile(null);
  }
}