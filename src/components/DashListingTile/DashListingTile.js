import { useEffect, useState } from 'react';
import { animated, useSpring, config } from 'react-spring';
import { Container, Row, Col } from 'react-grid-system';
import './dashListingTile.css';
import { getCompany } from '../../database/firebaseFunctions';
import LogoBox from '../LogoBox';
import { useHistory } from 'react-router';

// TODO: default props
// TODO: need to check if phone taps behave the same with hover

/**
 * props required: jobTitle, jobDeadline, payAmt, unit, gigId, companyId
 * gigId for link to gig details, companyId to retrieve data for company
 * @param {*} props
 * @returns
 */
const DashListingTile = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  let collectedData = [];
  useEffect(() => {
    getCompany(props.companyId.id).then((retrievedData) => {
      collectedData.push(retrievedData[0]);
      setCompanyData(collectedData[0]);
      setIsLoading(false);
    });
  }, []);

  const tileBackgroundAnimated = useSpring({
    boxShadow: isHovering ? '4px 10px 40px #00000026' : '1px 3px 1px #00000026',
    backgroundColor: isHovering ? '#FFFFFFFF' : '#FFFFFFA6',
    config: config.default,
  });
  //const { //id, company, unit, completeBy, title, pay } = props.gig

  /* final props:
    const companyName = props.companyName
    const companyLogo = props.companyLogo
    const companyCity = props.companyCity
    const jobTitle = props.jobTitle
    const jobDeadline = props.jobDeadline
    const payAmt = props.payAmt
    // check how to handle link (should this go to the gig details page automatically)
    const link = props.link
    */

  // placeholders for now:

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    let companyName = companyData.name;
    const companyLogo = companyData.profilePicture;
    let companyCity = companyData.location.postal;
    let jobTitle = props.jobTitle;
    // this would be date format and upcoming colors would be red
    //console.log(props.jobDeadline.seconds);
    let jobDeadline =
      'Deadline: ' + dateFormat(new Date(props.jobDeadline.seconds * 1000));
    const payAmt = 'S$' + props.payAmt;
    const payFor = props.unit;
    const link = '/';

    const companyNameLimit = 15;
    const companyCityLimit = 22;
    const jobTitleLimit = 27;
    const jobDescLimit = 120;

    companyName =
      companyName.length > companyNameLimit
        ? companyName.substr(0, companyNameLimit) + '...'
        : companyName;
    companyCity =
      companyCity.length > companyCityLimit
        ? companyCity.substr(0, companyCityLimit) + '...'
        : companyCity;
    jobTitle =
      jobTitle.length > jobTitleLimit
        ? jobTitle.substr(0, jobTitleLimit) + '...'
        : jobTitle;
    jobDeadline =
      jobDeadline.length > jobDescLimit
        ? jobDeadline.substr(0, jobDescLimit) + '...'
        : jobDeadline;
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
              <LogoBox src={companyLogo} name={companyName}/>
            </div>
            <Col>
              <div id="DLTCompanyName">{companyName}</div>
              <div id="DLTCompanyLocation">{companyCity}</div>
            </Col>
          </Row>
          <div id="DLTJobTitle">{jobTitle}</div>
          <div id="DLTJobDesc">{jobDeadline}</div>
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

/**
 *
 * @param {Date} date
 */
function dateFormat(date) {
  //console.log(typeof date)
  console.log(date.getMonth());
  return (
    date.getDate() +
    ' ' +
    monthFormat(date.getMonth()) +
    ' ' +
    date.getFullYear()
  );
}

function monthFormat(month) {
  let monthDict = {
    0: 'January',
    1: 'Febuary',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };
  return monthDict[month];
}

export default DashListingTile;
