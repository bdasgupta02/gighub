import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import { useAuth } from '../../contexts/AuthContext';

import DashGoalTile from '../DashGoalTile/index';
import DashHighlightsTile from '../DashHighlightsTile/index';
import DashListingTile from '../DashListingTile/index';

import Button from '../Button/index';

import './companyDashboard.css';
import {
  getApplicationsByCompanyId,
  getCompany,
  getCompanyPostedGigs,
} from '../../database/firebaseFunctions';

const CompanyDashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [gigData, setGigData] = useState([]);
  const [applicationData, setApplicationData] = useState([]);
  let { currentUserId } = useAuth();

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
            setUserData(collectedUserContainer);
            setGigData(collectedGigContainer);
            setApplicationData(collectedApplicationsContainer);
            setIsLoading(false);
          }
        );
      });
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    let userInfo = userData[0];
    let username = userInfo.name;
    let message = "Your listed jobs at a glance";
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
            <Row id="CDHighlightsBG">
              <div className="CDHighlightsTile">
                <DashHighlightsTile
                  value="3"
                  desc="contracts signed this week"
                />
              </div>
              <div className="CDHighlightsTile">
                <DashHighlightsTile
                  value="2"
                  desc="contracts completed & paid this week"
                />
              </div>
              <div className="CDHighlightsTile">
                <DashHighlightsTile
                  value="6"
                  desc="pending payments to be made"
                />
              </div>
            </Row>

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
                  {/* <div className="CDSectionTile">
                    <DashListingTile />
                  </div>
                  <div className="CDSectionTile">
                    <DashListingTile />
                  </div>
                  <div className="CDSectionTile">
                    <DashListingTile />
                  </div> */}
                </Row>
                <Row className="emptyRow">
                  <Col></Col>
                </Row>
                <Row>
                  <Col>
                    <Button text="View all gigs" forceWidth="120px" />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row id="CDSectionBG">
              <Col>
                <Row>
                  <Col>Goals</Col>
                </Row>
                <Row className="spacer">
                  <Col></Col>
                </Row>
                <Row>
                  <Col className="CDGoalsTile" xs={7}>
                    <DashGoalTile />
                  </Col>
                </Row>
                <Row className="spacer">
                  <Col></Col>
                </Row>
                <Row>
                  <Col className="CDGoalsTile" xs={7}>
                    <DashGoalTile />
                  </Col>
                </Row>
                <Row className="spacer">
                  <Col></Col>
                </Row>
                <Row>
                  <Col className="CDGoalsTile" xs={7}>
                    <DashGoalTile />
                  </Col>
                </Row>
                <Row className="spacer">
                  <Col></Col>
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
