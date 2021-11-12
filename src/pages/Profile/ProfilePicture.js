import { Container, Row, Col } from 'react-grid-system';
import Button from '../../components/Button';
import './profile.css';
import {
  createProfilePicture,
  updateCompanyDetails,
  updateWorkerDetails,
} from '../../database/firebaseFunctions';
import { FileType } from '../../enum/FileType';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';

import LogoGenerator from '../../components/LogoGenerator';
import FileUploader from '../../components/FileUploader';

/**
 * Required props: userId, isWorker
 *
 * Optional props: profilePicLink || userName
 * @param {*} props
 * @returns
 */
const modalStyle = {};
export function ProfilePicture(props) {
  let hasProfilePicTemp = props.profilePicLink !== '';
  let profilePicTemp = '';
  if (hasProfilePicTemp) {
    profilePicTemp = props.profilePicLink;
  }
  const [newProfilePicFile, setNewProfilePicture] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profilePicLink, setProfilePicLink] = useState(profilePicTemp);
  const [hasProfilePic, setHasProfilePic] = useState(hasProfilePicTemp);
  useEffect(() => {
    //console.log(props.userId);
    if (newProfilePicFile !== null) {
      changePicture(newProfilePicFile);
    }
  }, [newProfilePicFile]);

  function removePicture() {
    let userId = props.userId;
    let update = {
      id: userId,
      profilePicture: '',
    };
    if (props.isWorker) {
      updateWorkerDetails(update);
    } else {
      updateCompanyDetails(update);
    }
    setHasProfilePic(false);
  }

  function changePicture(newPicture) {
    if (newPicture !== null) {
      createProfilePicture(newPicture).then((url) => {
        let userId = props.userId;
        let update = {
          id: userId,
          profilePicture: url,
        };
        //console.log('new picture added');
        if (props.isWorker) {
          updateWorkerDetails(update);
        } else {
          updateCompanyDetails(update);
        }

        setHasProfilePic(true);
        setProfilePicLink(url);
      });
    }
  }

  // let hasProfilePic = props.profilePicLink !== '';
  // let profilePicLink = '';
  // if (hasProfilePic) {
  //   profilePicLink = props.profilePicLink;
  // }
  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  return (
    <Container>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="ProfileModalStyle"
        contentLabel="Change picture"
      >
        <FileUploader
          setFileOutput={setNewProfilePicture}
          fileTypeEnum={FileType.PICTURES}
          closer={closeModal}
        />
      </ReactModal>
      <Row>
        {hasProfilePic ? (
          <div>
            {' '}
            <img className="ProfilePicture" src={profilePicLink} />{' '}
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
            <Button type="PRIMARY" text="Change picture" onClick={openModal} />
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
