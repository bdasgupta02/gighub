import '../Profile/profile.css'
import { Container, Row, Col } from 'react-grid-system';
import { useEffect, useState } from 'react';

import LogoGenerator from '../../components/LogoGenerator';

/**
 * Required props: userId, isWorker
 *
 * Optional props: profilePicLink || userName
 * @param {*} props
 * @returns
 */
export function VPPicture(props) {
  let hasProfilePicTemp = props.profilePicLink !== '';
  let profilePicTemp = '';
  if (hasProfilePicTemp) {
    profilePicTemp = props.profilePicLink;
  }
  const [profilePicLink, setProfilePicLink] = useState(profilePicTemp)
  const [hasProfilePic, setHasProfilePic] = useState(hasProfilePicTemp)

  return (
    <Container>
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
      </Row>
      <Row className="ProfilePageMainHeaderSpacer"></Row>
    </Container>
  );
}
