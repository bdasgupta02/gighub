import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import DashGoalTile from '../DashGoalTile/index';
import DashHighlightsTile from '../DashHighlightsTile/index';
import DashListingTile from '../DashListingTile/index';
import { accessDB } from '../../database/firebase';
import { PlusIcon, XIcon } from '@primer/octicons-react';
import LoadingIndicator from '../../components/LoadingIndicator'
import DatePicker from 'react-date-picker'
import ReactModal from 'react-modal';

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
    goalsCache.sort((a, b) => b.achieveBy.seconds < a.achieveBy.seconds ? 1 : -1)
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


  const handleDeleteGoal = async (id) => {
    await accessDB.collection('workers').doc(currentUserId).collection('goals').doc(id).delete()
    fetchGoals()
  }

  const handleNewGoalDescChange = (event) => {
    setNewGoal({
      ...newGoal,
      description: event.target.value
    })
  }

  const handleNewGoalABChange = (date) => {
    setNewGoal({
      ...newGoal,
      achieveBy: date
    })
  }

  const handleCreateGoal = async () => {
    //validation
    if (newGoal.description === '' || newGoal.achieveBy === null) {
      alert('Error: one or more value(s) are empty')
    } else {
      await accessDB.collection('workers').doc(currentUserId).collection('goals').add(newGoal)
      fetchGoals()
      setNewGoalModalVisible(false)
    }
  }

  if (isLoading) {
    return (
      <div id="WDBase">
        <Row id="WDHeader">
          <div id="WDHeaderTexts">
            <span id="WDHeaderTitle">Please wait</span> <br />
            <span id="WDHeaderSubtitle">We're loading your information</span>
          </div>
          <LoadingIndicator />
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

                <Button type="PRIMARY" forceWidth="180px" text="Create a new goal" icon={<PlusIcon size={16} />} onClick={() => setNewGoalModalVisible(true)} />

                <div className="spacer" />

                {goals.map(goal => (
                  <div>
                    <div className="WDGoalsTile">
                      <DashGoalTile description={goal.description} achieveBy={new Date(goal.achieveBy.seconds * 1000).toDateString()} id={goal.id} onDelete={handleDeleteGoal} />
                    </div>
                    <div className="spacer" />
                  </div>
                ))}

                <ReactModal isOpen={newGoalModalVisible} ariaHideApp>
                  <div className="WDModalTitle">
                    Create a new goal
                  </div>

                  <div>
                    <form>
                      <Col>
                        <div className="WDLabel">What is your goal?</div>
                        <Row>
                          <input className="WDInputText" value={newGoal.description} onChange={handleNewGoalDescChange} type="text" placeholder="Description" />
                        </Row>
                        <div style={{ width: '100%', height: '10px' }} />
                        <div className="WDLabel">By when do you aim to achieve this goal?</div>
                        <Row>
                          <div style={{ marginLeft: '20px' }}>
                            <DatePicker value={newGoal.achieveBy} onChange={(date) => handleNewGoalABChange(date)} />
                          </div>
                        </Row>
                        <div style={{ width: '100%', height: '10px' }} />
                      </Col>
                    </form>
                  </div>

                  <div style={{ width: '100%', height: '60px' }} />

                  <div style={{ marginLeft: '20px' }}>
                    <Button type="PRIMARY" forceWidth="180px" text="Create" icon={<PlusIcon size={16} />} onClick={handleCreateGoal} />
                    <div style={{ width: '100%', height: '10px' }} />
                    <Button type="SECONDARY" forceWidth="180px" text="Cancel" icon={<XIcon size={16} />} onClick={() => setNewGoalModalVisible(false)} />
                  </div>

                </ReactModal>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
};

export default WorkerDashboard;
