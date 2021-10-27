import  * as Constants from '../constants.js';
import {Container, Row, Col} from 'react-grid-system'
import GigListingTile from '../components/GigListingTile'
import Button from '../components/Button'
import OngoingGigTile from '../components/OngoingGigTile'

export default function MyGigs(props) {
  /* Props:
  pendingReview: true or false

   */

  let pendingReview = true;
  return(
    <div>
      <h1> Your Gigs</h1>
      <h3 style={{color:Constants.BRIGHT_BLUE}}> Manage your gigs </h3>
      <div style={{height:'50px'}}></div>


    <Row>
      <Col>
      <h3 style={{color:Constants.BRIGHT_BLUE}}> Ongoing gigs </h3>
      <OngoingGigTile />
      </Col>
    </Row>

    <Row>
      <Col>
      <h3 style={{color:Constants.BRIGHT_BLUE}}> Finished gigs </h3>
      <div>
      <GigListingTile> </GigListingTile>
      {pendingReview ? <div className="ReviewTag"> <Button  onClick={()=>{}} text={'Review!'} forceWidth={50} type='GREEN' /> </div> : null}
      </div>
      </Col>
    </Row>
    </div>
  );
}
