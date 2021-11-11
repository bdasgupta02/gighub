import { Container, Row, Col } from 'react-grid-system';
import Button from '../../components/Button';
import './profile.css';
import { createProfilePicture, updateWorkerDetails } from '../../database/firebaseFunctions';
import { FileType } from '../../enum/FileType';
import ReactModal from 'react-modal';
import { useState } from 'react';

import LogoGenerator from '../../components/LogoGenerator';
import FileUploader from '../../components/FileUploader';

/**
 * Required props: hasProfilePic, userId
 *
 * Optional props: profilePicLink || userName
 * @param {*} props
 * @returns
 */
const modalStyle = {};
export function ProfilePicture(props) {
  const [newProfilePicFile, setNewProfilePicture] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
    changePicture(newProfilePicFile, props.userId)
  }
  return (
    <Container>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Add resume"
      >
        <FileUploader
          setFileOutput={setNewProfilePicture}
          fileTypeEnum={FileType.PICTURES}
        />
      </ReactModal>
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
              onClick={openModal}
            />
          </Row>
          <Row className="ProfilePagePictureButtonSpacer" />
          <Row>
            <Button
              type="WHITE"
              text="Remove picture"
              onClick={removePicture(props.userId)}
            />
          </Row>
        </Col>
      </Row>
      <Row className="ProfilePageMainHeaderSpacer"></Row>
    </Container>
  );
}

function removePicture(userId) {
  let update = {
    id: userId,
    profilePicture: '',
  };
  updateWorkerDetails(update);
}
function changePicture(newPicture, userId) {
  if (newPicture !== null) {
    let newPictureURL = createProfilePicture(newPicture);
    let update = {
      id: userId,
      profilePicture: newPictureURL
    }
    updateWorkerDetails(update);
  }
}
