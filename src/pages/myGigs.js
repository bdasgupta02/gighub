import * as Constants from '../constants.js';
import { Container, Row, Col } from 'react-grid-system'
import GigListingTile from '../components/GigListingTile'
import Button from '../components/Button'
import OngoingGigTile from '../components/OngoingGigTile'
import * as fbFunctions from '../database/firebaseFunctions';
import React, { useEffect, useState } from 'react';

export default function MyGigs(props) {
  /* Props:
  pendingReview: true or false
   */

  const [allBooked, setAllBooked] = useState({});
  const allBookedPromise = fbFunctions.getWorkerBookedGigs('5ornuxQ4USWJujeQxXnJ');


  useEffect(() => {
    allBookedPromise.then(data => {
      setAllBooked(data[0]);
      console.log("allBooked is: " + JSON.stringify(allBooked[0]))
    })
  }, [])
  //console.log('here') });

  // allBooked.then((data) => { console.log("allBookedGigs is: " + JSON.stringify(data[0])) });


  const sampleJson = { 'hi': "hello" };
  let pendingReview = true;
  return (

    < div style={{ height: '100%' }}>
      {     console.log(Object.keys(allBooked))}
      <h1> Your Gigs</h1>
      <div style={{ height: '50px' }}></div>
      <h3 style={{ color: Constants.BRIGHT_BLUE }}> Ongoing gigs </h3>
      <Row style={{ height: '30%', overflow: 'scroll' }}>
        <Col>

          <OngoingGigTile jobTitle={allBooked.title} />
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

    </div >
  );
}
