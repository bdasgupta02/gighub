import { getCompany, getWorker } from '../../database/firebaseFunctions';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import './profile.css';
import { ProfileHeader } from './ProfileHeader';
import {ProfilePicture} from './ProfilePicture';
import {ProfileDetails} from './ProfileDetails'
import { ProfileSignInDetails } from './ProfileSignInDetails';

const workerSkills = [
  'Test0',
  'Test1',
  'Test2',
  'Test3',
  'Test4',
  'Test5',
  'Test6',
  'Test7',
  'Test8',
  'Test9',
  'Test10',
];

const avgReview = 123;
const numReview = 29;
const password = 'PASSWORD_OF_USER123';
let profilePicLink =
  'https://firebasestorage.googleapis.com/v0/b/gighub-c8dcf.appspot.com/o/profile_pics%2FFrame%204(1).png?alt=media&token=d7e2e7ec-b7ad-43e4-a1c5-ddd10fb7fbee';
const resumeLink =
  'https://firebasestorage.googleapis.com/v0/b/gighub-c8dcf.appspot.com/o/resumes%2FPlaceholder%20resume.pdf?alt=media&token=d3fb483c-24e5-48e4-b5f6-bc074fc9d7ee';
const userName = 'Robert Paulson';
let hasProfilePic;
let usersGender = 'M'
let userEmail='TESTTESTTEST@TEST.com'
let usersAge='99999999999999'

/**
 * if profile pic link is invalid, a dead-image will appear instead
 * @param {*} props
 * @returns
 */
export default function Profile(props) {
  let { isWorker, currentUserId } = useAuth();
  isWorker = true;
  hasProfilePic = profilePicLink !== '';
  hasProfilePic = false;

  return (
    <div id="ProfilePageGeneric">
      <ProfileHeader avgReview={avgReview} numReview={numReview}/>
      <ProfilePicture hasProfilePic={hasProfilePic} profilePicLink={profilePicLink} userName={userName}/>
      <ProfileDetails isWorker={true} userName={userName} resumeLink={resumeLink} usersAge={usersAge} userId = {currentUserId} usersGender={usersGender} workerSkills={workerSkills}/>
      <ProfileSignInDetails userEmail={userEmail} userPassword={password}/>

      <Container>
        <Row className="ProfilePageSectionSpacer" />
        <Row>
          <Button
            type="PRIMARY"
            text="Edit profile"
            onClick={editProfile}
          ></Button>
        </Row>
      </Container>
    </div>
  );
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
