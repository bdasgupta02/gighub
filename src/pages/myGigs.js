import * as Constants from '../constants.js';
import { Container, Row, Col } from 'react-grid-system'
import GigListingTile from '../components/GigListingTile'
import Button from '../components/Button'
import OngoingGigTile from '../components/OngoingGigTile'
import * as fbFunctions from '../database/firebaseFunctions';

export default function MyGigs(props) {
  /* Props:
  pendingReview: true or false


   */

  const allBooked = fbFunctions.getWorkerAppliedGigs('5ornuxQ4USWJujeQxXnJ');

  allBooked.then((data) => { console.log("allBookedGigs is: " + JSON.stringify(data)) });



  let pendingReview = true;
  return (
    <div style={{ height: '100%' }}>
      <h1> Your Gigs</h1>
      <div style={{ height: '50px' }}></div>
      <h3 style={{ color: Constants.BRIGHT_BLUE }}> Ongoing gigs </h3>
      <Row style={{ height: '30%', overflow: 'scroll' }}>
        <Col>

          <OngoingGigTile />
          <OngoingGigTile />
        </Col>
      </Row>
      <div style={{ height: '60px' }}></div>

      <h3 style={{ color: Constants.BRIGHT_BLUE }}> Finished gigs </h3>

      <Row debug style={{ height: '50%', overflow: 'scroll' }}>
        <Col xs={3}>
          <div>
            <GigListingTile> </GigListingTile>
            {pendingReview ? <div className="ReviewTag"> <Button onClick={() => { }} text={'Review!'} forceWidth={50} type='GREEN' /> </div> : null}
          </div>
        </Col>
        <Col xs={3}>
          <div>
            <GigListingTile> </GigListingTile>
            {pendingReview ? <div className="ReviewTag"> <Button onClick={() => { }} text={'Review!'} forceWidth={50} type='GREEN' /> </div> : null}
          </div>
        </Col>
        <Col xs={3}>
          <div>
            <GigListingTile> </GigListingTile>
            {pendingReview ? <div className="ReviewTag"> <Button onClick={() => { }} text={'Review!'} forceWidth={50} type='GREEN' /> </div> : null}
          </div>
        </Col>
        <Col xs={3}>
          <div>
            <GigListingTile> </GigListingTile>
            {pendingReview ? <div className="ReviewTag"> <Button onClick={() => { }} text={'Review!'} forceWidth={50} type='GREEN' /> </div> : null}
          </div>
        </Col>
        <Col xs={3}>
          <div>
            <GigListingTile> </GigListingTile>
            {pendingReview ? <div className="ReviewTag"> <Button onClick={() => { }} text={'Review!'} forceWidth={50} type='GREEN' /> </div> : null}
          </div>
        </Col>
      </Row>

    </div>
  );
}
