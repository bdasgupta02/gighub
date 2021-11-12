import { useEffect, useState } from 'react';
import { animated, useSpring, config } from 'react-spring';
import { Container, Row, Col } from 'react-grid-system';
import '../DashListingTile/dashListingTile.css'
import { getWorker } from '../../database/firebaseFunctions';
import LogoBox from '../LogoBox';
import { useHistory } from 'react-router';

// TODO: default props
// TODO: need to check if phone taps behave the same with hover

/**
 * props required: jobTitle, payAmt, unit, gigId, workerId
 * gigId for link to gig details, workerId to retrieve data for worker
 * @param {*} props
 * @returns
 */
const DashApplicationTile = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const [workerData, setWorkerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  let collectedData = [];
  useEffect(() => {
    getWorker(props.workerId).then((retrievedData) => {
      collectedData.push(retrievedData[0]);
      setWorkerData(collectedData[0]);
      setIsLoading(false);
    });
  }, []);

  const tileBackgroundAnimated = useSpring({
    boxShadow: isHovering ? '4px 10px 40px #00000026' : '1px 3px 1px #00000026',
    backgroundColor: isHovering ? '#FFFFFFFF' : '#FFFFFFA6',
    config: config.default,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    let workerName = workerData.name;
    const workerLogo = workerData.profilePicture;
    let workerCity = workerData.location.postal;
    let jobTitle = props.jobTitle;
    // this would be date format and upcoming colors would be red
    const payAmt = 'S$' + props.payAmt;
    const payFor = props.unit;
    const link = '/';

    const workerNameLimit = 15;
    const workerCityLimit = 22;
    const jobTitleLimit = 27;
    const jobDescLimit = 120;

    workerName =
      workerName.length > workerNameLimit
        ? workerName.substr(0, workerNameLimit) + '...'
        : workerName;
    workerCity =
      workerCity.length > workerCityLimit
        ? workerCity.substr(0, workerCityLimit) + '...'
        : workerCity;
    jobTitle =
      jobTitle.length > jobTitleLimit
        ? jobTitle.substr(0, jobTitleLimit) + '...'
        : jobTitle;
    const AnimatedContainer = animated(Container);
    return (
      <div onClick={() => history.push("/view_gig", { gigId: props.gigId })}>
      <AnimatedContainer
        className="DLTTileText"
        id="DLTDashTileBackground"
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        style={tileBackgroundAnimated}
      >
        <Col id="DLTMainColumn">
          <Row>
            <div>
              <LogoBox src={workerLogo} name={workerName}/>
            </div>
            <Col>
              <div id="DLTCompanyName">{workerName}</div>
              <div id="DLTCompanyLocation">{workerCity}</div>
            </Col>
          </Row>
          <div id="DLTJobTitle">{jobTitle}</div>
          <div id="DLTJobDesc"></div>
          <Row id="DLTDashPayTextBox" className="DLTBottom">
            <div className="DLTPayText">{payAmt}</div>
            <div className="DLTPayText">&nbsp;/&nbsp;</div>
            <Col id="DLTPayForCol">
              <div style={{ width: '1px', height: '3px' }} />
              <Row id="DLTPayForText">{payFor}</Row>
            </Col>
          </Row>
        </Col>
      </AnimatedContainer>
      </div>
    );
  }
};

export default DashApplicationTile;
