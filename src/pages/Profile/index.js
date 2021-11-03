import { getCompany, getWorker } from '../../database/firebaseFunctions';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import './profile.css';
import Octicon, { StarIcon } from '@primer/octicons-react';
import ProfileSKill from './ProfileSkill';

// export default function Profile(props) {
//   let type = 'worker';
//   if (type === 'company') {
//     return companyProfile(props);
//   } else {
//     return workerProfile(props);
//   }
// }
export default function Profile(props) {
  let { isWorker } = useAuth();

  return (
    <div id="ProfilePageGeneric">
      <Container>
        <Row className="ProfilePageMainHeader">Profile</Row>
        <Row>
          <Col>
            <StarIcon size={16} /> ReviewNumber
          </Col>
        </Row>
      </Container>

      <Container>
        <Row xs={1} md={2}>
          <Col xs={1}>
            <img
              className="ProfilePicture"
              src="https://firebasestorage.googleapis.com/v0/b/gighub-c8dcf.appspot.com/o/profile_pics%2FFrame%204(1).png?alt=media&token=d7e2e7ec-b7ad-43e4-a1c5-ddd10fb7fbee"
            />
          </Col>
          <Col>
            <Row>
              <Button
                type="PRIMARY"
                text="Change picture"
                onClick={changePicture}
              />
            </Row>
            <Row>
              <Button
                type="WHITE"
                text="Remove picture"
                onClick={removePicture}
              />
            </Row>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="ProfilePageSectionHeader"> Details </Row>
        <Row>
          <Col>
            <Row className="ProfilePageItemHeader">Name</Row>
            <Row>USER'S NAME</Row>
          </Col>
          <Col>
            <Row className="ProfilePageItemHeader">Resume</Row>
            <Row>RESUME PDF LINK</Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row className="ProfilePageItemHeader">Age</Row>
            <Row>USER'S AGE</Row>
          </Col>
          <Col>
            <Row className="ProfilePageItemHeader">Skills</Row>
            <Row><ProfileSKill text="TEST"/></Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row className="ProfilePageItemHeader">Gender</Row>
            <Row>USER'S GENDER</Row>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="ProfilePageSectionHeader"> Sign-in details </Row>
        <Row>
          <Col>
            <Row className="ProfilePageItemHeader">Email</Row>
            <Row>USER'S EMAIL</Row>
          </Col>
          <Col>
            <Row className="ProfilePageItemHeader">Password</Row>
            <Row>
              <text type="password">USER'S PASSWORD</text>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Button type="PRIMARY" text="Edit profile" onClick={editProfile}></Button>
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

function changePicture(props) {
  //use Modal to pop up a change profile picture image
}

function getPicture(props) {}

function removePicture(props) {}

function editProfile(props) {}

function displayResume(props) {}
