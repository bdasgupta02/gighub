import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import { useAuth } from '../../contexts/AuthContext';
import DashApplicationTile from './DashApplicationTile';

import DashHighlightsTile from '../DashHighlightsTile/index';
import DashListingTile from '../DashListingTile/DashListingTile';

import Button from '../Button/index';
import '../CompanyDashboard/companyDashboard.css';
import {
  getApplicationsByCompanyId,
  getCompany,
  getCompanyPostedGigs,
} from '../../database/firebaseFunctions';
import { useHistory } from 'react-router';

const CompanyDashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [gigData, setGigData] = useState([]);
  const [applicationData, setApplicationData] = useState([]);
  let { currentUserId } = useAuth();

  let history = useHistory();

  let collectedUserContainer = [];
  let collectedGigContainer = [];
  let collectedApplicationsContainer = [];
  
  useEffect(() => {
    getCompany(currentUserId).then((retrievedData) => {
      collectedUserContainer.push(retrievedData[0]);
      getCompanyPostedGigs(currentUserId).then((retrievedGigs) => {
        collectedGigContainer.push(retrievedGigs);
        getApplicationsByCompanyId(currentUserId).then(
          (retrievedApplications) => {
            collectedApplicationsContainer.push(retrievedApplications);
            
            setGigData(collectedGigContainer);
            setApplicationData(collectedApplicationsContainer);
            setUserData(collectedUserContainer);
            setIsLoading(false);
          }
        );
      });
    });
  }, []);

  function redirectToAllGigs() {
    history.push('/listed_gigs');
  }

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    
    let userInfo = userData[0];
    console.log(userInfo)
    let username = userInfo.name;
    let message = 'Your listed jobs at a glance';
    console.log('userData');
    console.log(userData);

    console.log('gigData');
    console.log(gigData);

    console.log('applicationsData');
    console.log(applicationData);

    return (
      <div id="CDBase">
        <Row id="CDHeader">
          <div id="CDHeaderTexts">
            <span id="CDHeaderTitle">Hello {username}</span> <br />
            <span id="CDHeaderSubtitle">{message}</span>
          </div>
        </Row>
        <Row id="CDBody">
          <Col>

            <Row id="CDSectionBG">
              <Col>
                <Row>
                  <Col>Ongoing Gigs</Col>
                </Row>
                <Row className="emptyRow">
                  <Col></Col>
                </Row>
                <Row>
                  {gigData[0]
                    .sort((x, y) => y.completeBy.seconds - x.completeBy.seconds)
                    .slice(0, 3)
                    .map((jsonObj) => (
                      // console.log('gigMapping');
                      // console.log(jsonObj);
                      <div className="WDSectionTile">
                        {/* {console.log(jsonObj)} */}
                        <DashListingTile
                          jobTitle={jsonObj.title}
                          jobDeadline={jsonObj.completeBy}
                          payAmt={jsonObj.pay}
                          unit={jsonObj.unit}
                          gigId={jsonObj.id}
                          companyId={jsonObj.companyId}
                        />
                      </div>
                    ))}
                </Row>
                <Row className="emptyRow">
                  <Col></Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      text="View all gigs"
                      forceWidth="180px"
                      onClick={redirectToAllGigs}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row id="CDSectionBG">
              <Col>
                <Row>
                  <Col>Applications</Col>
                </Row>
                <Row className="emptyRow">
                  <Col></Col>
                </Row>
                <Row>
                  {applicationData[0]
                    .filter((x) => true)
                    .slice(0, 3)
                    .map((jsonObj) => (
                      <div className="WDSectionTile">
                        {console.log(jsonObj)}
                        <DashApplicationTile
                          jobTitle={jsonObj.title}
                          payAmt={jsonObj.pay}
                          unit={jsonObj.unit}
                          gigId={jsonObj.id}
                          workerId={jsonObj.workerId}
                        />
                      </div>
                    ))}
                </Row>
                <Row className="emptyRow">
                  <Col></Col>
                </Row>
                <Row>
                  <Col>
                    <Button text="View all gigs" forceWidth="120px" onClick={redirectToAllGigs}/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
};

export default CompanyDashboard;
