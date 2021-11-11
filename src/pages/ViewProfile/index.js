import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { VPHeader } from './VPHeader';
import { VPDetails } from './VPDetails';
import { VPPicture } from './VPPicture';
import '../Profile/profile.css';
import { getCompany, getWorker } from '../../database/firebaseFunctions';
import { VPContactDetails } from './VPContactDetails';

function ViewProfile(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  let location = useLocation().state;
  const { userId, userType } = location;
  let isWorker = userType === 'worker';

  let collectedData = [];
  useEffect(() => {
    if (isWorker) {
      getWorker(userId).then((retrievedData) => {
        collectedData.push(retrievedData[0]);
        setUserData(collectedData);
        setIsLoading(false);
      });
    } else {
      getCompany(userId).then((retrievedData) => {
        collectedData.push(retrievedData[0]);
        setUserData(collectedData);
        setIsLoading(false);
      });
    }
  }, []);
  // can just link to the company details etc
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    let userInfo = userData[0];
    let hasProfilePic = false;
    let profilePicLink = '';
    if (
      userInfo.hasOwnProperty('profilePicture') &&
      userInfo.profilePicture !== ''
    ) {
      hasProfilePic = true;
      profilePicLink = userInfo.profilePicture;
    }
    return (
      <div id="ProfilePageGeneric">
        <VPHeader
          avgReview={userInfo.avgReview}
          numReview={userInfo.numReview}
        />
        <VPPicture
          hasProfilePic={hasProfilePic}
          profilePicLink={profilePicLink}
          userName={userInfo.name}
        />
        <VPDetails
          isWorker={isWorker}
          userName={userInfo.name}
          resumeLink={userInfo.resume ?? ''}
          UEN={userInfo.UEN}
          dob={userInfo.dob}
          workerSkills={userInfo.skills}
          location={userInfo.location}
        />
        <VPContactDetails email={userInfo.email ?? 'No email registered'} phoneNumber={userInfo.phone ?? 'No phone number registered'}/>
      </div>
    );
  }
}

export default ViewProfile;
