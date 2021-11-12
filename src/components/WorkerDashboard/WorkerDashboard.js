import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import DashGoalTile from '../DashGoalTile/index';
import DashHighlightsTile from '../DashHighlightsTile/index';
import DashListingTile from '../DashListingTile/index';
import { accessDB } from '../../database/firebase';
import { PlusIcon } from '@primer/octicons-react';

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

  // goals
  const [newGoalModalVisible, setNewGoalModalVisible] = useState(false)
  const [goals, setGoals] = useState([])
  const [newGoal, setNewGoal] = useState({
    achieveBy: null,
    description: ''
  })

  let { currentUserId } = useAuth();


  const fetchGoals = async () => {
    let goalsCache = []
    const goalsGet = await accessDB.collection('workers').doc(currentUserId).collection('goals').get()
    for (let i = 0; i < goalsGet.docs.length; i++) {
      let goal = goalsGet.docs[i].data()
      goal = { ...goal, id: goalsGet.docs[i].id }
      goalsCache.push(goal)
    }

    setGoals(goalsCache)
  }


  let collectedUserContainer = [];
  let collectedGigContainer = [];
  useEffect(() => {
    fetchGoals()
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
    return (
      <div id="WDBase">
        <Row id="WDHeader">
          <div id="WDHeaderTexts">
            <span id="WDHeaderTitle">Please wait</span> <br />
            <span id="WDHeaderSubtitle">We're loading your information</span>
          </div>
          <Row id="WDBody">
            <Col>
              <Row id="WDHighlightsBG"></Row>
            </Col>
          </Row>
        </Row>
      </div>
    );
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
                    <Button text="View all gigs" forceWidth="180px" />
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
                    <Button text="View all applications" forceWidth="180px" />
                  </Col>
                </Row>
              </Col>
            </Row>

            <div id="WDSectionBG">
              <div>
                <div style={{ width: '100%' }}>Goals</div>
                <div className="spacer" />
                    
                <Button type="PRIMARY" forceWidth="180px" text="Create a new goal" icon={<PlusIcon size={16} />} />
                
                <div className="spacer" />

                <div className="WDGoalsTile">
                  <DashGoalTile description="Hustle for $200 this month" achieveBy="20/10/2021" />
                </div>
                <div className="spacer">
                </div>
                <div>
                  <div className="WDGoalsTile">
                    <DashGoalTile description="Hustle for $200 this month" achieveBy="20/10/2021" />
                  </div>
                </div>
                <div className="spacer">
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
};

export default WorkerDashboard;
