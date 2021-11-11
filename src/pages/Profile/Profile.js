import { getCompany, getWorker } from '../../database/firebaseFunctions';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import './profile.css';
import { ProfileHeader } from './ProfileHeader';
import { ProfilePicture } from './ProfilePicture';
import { ProfileDetails } from './ProfileDetails';
import { ProfileSignInDetails } from './ProfileSignInDetails';
import ReactModal from 'react-modal';
import EditProfile from './EditProfile';
import FullPage from '../FullPage';

const modalStyle = {};
/**
 * if profile pic link is invalid, a dead-image will appear instead
 * @param {*} props no props required
 * @returns
 */
export default function Profile(props) {
  let { isWorker, currentUserId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [cancel, setCancel] = useState(false);

  function startEditing() {
    setIsEditing(true);
  }
  function endEditing() {
    setIsEditing(false);
  }

  let collectedData = [];
  useEffect(() => {
    if (isWorker) {
      getWorker(currentUserId).then((retrievedData) => {
        collectedData.push(retrievedData[0]);
        setUserData(collectedData);
        setIsLoading(false);
      });
    } else {
      getCompany(currentUserId).then((retrievedData) => {
        collectedData.push(retrievedData[0]);
        setUserData(collectedData);
        setIsLoading(false);
      });
    }
  }, []);

  // let hasProfilePic = profilePicLink !== '';
  if (isLoading) {
    console.log('loading');
    return <div>Loading...</div>;
  } else {
    console.log(userData[0]);
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
        <ProfileHeader
          avgReview={userInfo.avgReview}
          numReview={userInfo.numReview}
        />
        <ProfilePicture
          hasProfilePic={hasProfilePic}
          profilePicLink={profilePicLink}
          userName={userInfo.name}
          userId={currentUserId}
          isWorker={isWorker}
        />
        <ProfileDetails
          isWorker={isWorker}
          userName={userInfo.name}
          resumeLink={userInfo.resume ?? ''}
          dob={userInfo.dob}
          userId={currentUserId}
          workerSkills={userInfo.skills}
          location = {userInfo.location}
        />
        <ProfileSignInDetails
          userEmail={userInfo.email}
          userPassword={userInfo.password}
        />

        <Container>
          <Row className="ProfilePageSectionSpacer" />
          <Row>
            <Button
              type="PRIMARY"
              text="Edit profile"
              onClick={startEditing}
            ></Button>
          </Row>
        </Container>
      </div>
    );
  }
}

// function workerProfile(props) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadedData, setLoadedData] = useState({
//     name: 'default',
//     age: -1,
//     email: 'default',
//     location: 'default',
//     numReviews: -1,
//     avgReview: -1,
//     password: 'default',
//     phone: 'default',
//     profilePicture:
//       'https://firebasestorage.googleapis.com/v0/b/gighub-c8dcf.appspot.com/o/profile_pics%2FFrame%204(1).png?alt=media&token=d7e2e7ec-b7ad-43e4-a1c5-ddd10fb7fbee',
//     resume:
//       'https://firebasestorage.googleapis.com/v0/b/gighub-c8dcf.appspot.com/o/resumes%2FPlaceholder%20resume.pdf?alt=media&token=d3fb483c-24e5-48e4-b5f6-bc074fc9d7ee',
//     skills: ['defualt'],
//   });
//   useEffect(() => {
//     getWorker(props.id).then((doc) => {
//       setLoadedData(doc);
//       setIsLoading(false);
//     });
//   }, {});

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   let workerName = loadedData.name;
//   return (
//     <p>DONE LOADING</p>
//     /*
//       ACTUAL PAGE CODE
//       */
//   );
// }

// function companyProfile(props) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadedData, setLoadedData] = useState({});
//   useEffect(() => {
//     getCompany(props.id).then((doc) => {
//       setLoadedData(doc);
//       setIsLoading(false);
//     });
//   }, {});

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <p>DONE LOADING</p>
//     /*
//         ACTUAL PAGE CODE
//         */
//   );
// }

function changePicture(props) {}

function getPicture(props) {}

function editProfile(props) {}
