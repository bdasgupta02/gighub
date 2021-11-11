import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import DashGoalTile from '../DashGoalTile/index';
import DashHighlightsTile from '../DashHighlightsTile/index';
import DashListingTile from '../DashListingTile/index';

import Button from '../Button/index';

import './workerDashboard.css';
import { useAuth } from '../../contexts/AuthContext';
import {
  getWorker,
  getWorkerAppliedGigs,
} from '../../database/firebaseFunctions';

const WorkerDashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [gigData, setGigData] = useState([]);

  let { currentUserId } = useAuth();

  let collectedUserContainer = [];
  let collectedGigContainer = [];
  useEffect(() => {
    getWorker(currentUserId).then((retrievedData) => {
      collectedUserContainer.push(retrievedData[0]);
      getWorkerAppliedGigs(currentUserId).then((retrievedGigs) => {
        collectedGigContainer.push(retrievedGigs);
        setUserData(collectedUserContainer);
        setGigData(collectedGigContainer);
        setIsLoading(false);
      });
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    let userInfo = userData[0];
    let username = userInfo.name;
    let message = "You're on the right track!";
    //console.log(gigData[0]);

    return (
      <div id="WDBase">
        <Row id="WDHeader">
          <div id="WDHeaderTexts">
            <span id="WDHeaderTitle">Hello {username}</span> <br />
            <span id="WDHeaderSubtitle">{message}</span>
          </div>
        </Row>
        <Row id="WDBody">
          <Col>
            <Row id="WDHighlightsBG">
              <div className="WDHighlightsTile">
                <DashHighlightsTile value="S$350.00" desc="earned this week" />
              </div>
              <div className="WDHighlightsTile">
                <DashHighlightsTile value="1" desc="job completed this week" />
              </div>
              <div className="WDHighlightsTile">
                <DashHighlightsTile value="2" desc="jobs due soon" />
              </div>
            </Row>

            <Row id="WDSectionBG">
              <Col>
                <Row>
                  <Col>Ongoing Gigs</Col>
                </Row>
                <Row className="emptyRow">
                  <Col></Col>
                </Row>
                <Row>
                  {gigData[0]
                    .filter((x) => x.status == 'Assigned')
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
                    <Button text="View all gigs" forceWidth="120px" />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row id="WDSectionBG">
              <Col>
                <Row>
                  <Col>Applications</Col>
                </Row>
                <Row className="emptyRow">
                  <Col></Col>
                </Row>
                <Row>
                  {gigData[0]
                    .filter((x) => x.status == 'Applied')
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
                    <Button text="View all applications" forceWidth="120px" />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row id="WDSectionBG">
              <Col>
                <Row>
                  <Col>Goals</Col>
                </Row>
                <Row className="spacer">
                  <Col></Col>
                </Row>
                <Row>
                  <div className="WDGoalsTile">
                    <DashGoalTile />
                  </div>
                </Row>
                <Row className="spacer">
                  <Col></Col>
                </Row>
                <Row>
                  <div className="WDGoalsTile">
                    <DashGoalTile />
                  </div>
                </Row>
                <Row className="spacer">
                  <Col></Col>
                </Row>
                <Row>
                  <div className="WDGoalsTile">
                    <DashGoalTile />
                  </div>
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

export default WorkerDashboard;
