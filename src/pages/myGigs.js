import * as Constants from '../constants.js';
import { Row, Col } from 'react-grid-system'
import GigListingTile from '../components/GigListingTile'
import Button from '../components/Button'
import OngoingGigTile from '../components/OngoingGigTile'
import * as fbFunctions from '../database/firebaseFunctions';
import React, { useEffect, useState } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { Timestamp } from 'firebase/firestore'
import ReviewTile from '../components/ReviewTile/ReviewTile.js';
import CreateReviewTile from '../components/CreateReviewTile/CreateReviewTile.js';

export default function MyGigs(props) {
  /* Props:
  pendingReview: true or false
   */

  const [allBooked, setAllBooked] = useState();
  const allBookedPromise = fbFunctions.getWorkerBookedGigs('5ornuxQ4USWJujeQxXnJ');
  const [allFinished, setAllFinished] = useState();
  const [isOpenReview, setIsOpenReview] = useState(false)


  useEffect(() => {
    let tempBooked = []
    if (allBooked == null) {
      allBookedPromise.then(arr => {
        arr.map(
          el => fbFunctions.getCompanyByRef(el.companyId).then(
            compData => {
              el['companyData'] = compData;
              console.log('new el in allBookedPromise: ' + (Object.keys(el)))
              tempBooked.push(el)
              setAllBooked(tempBooked)
            }))

        //   console.log("after setting: " + tempBooked);
      }

      )

    }

    if (allFinished == null) {
      let tempFinished = []
      fbFunctions.getWorkerArchivedGigs('5ornuxQ4USWJujeQxXnJ').then(arr => {
        arr.map(
          el => fbFunctions.getCompanyByRef(el.companyId).then(
            compData => {
              el['companyData'] = compData;
              console.log('new el: ' + JSON.stringify(el.companyId.id))
              tempFinished.push(el)
              setAllFinished(tempFinished)
            }))

        console.log("after setting: " + tempFinished);
      }

      )

    }
  }, [])
  //console.log('here') });

  // allBooked.then((data) => { console.log("allBookedGigs is: " + JSON.stringify(data[0])) });

  let pendingReview = true;
  return (

    < div style={{ height: '100%' }}>

      <h1> Your Gigs</h1>
      <div style={{ height: '50px' }}></div>
      <h3 style={{ color: Constants.BRIGHT_BLUE }}> Ongoing gigs </h3>
      <Row style={{ height: '30%', overflow: 'scroll' }}>
        <Col>
          {console.log('in render: ' + JSON.stringify(allBooked))}
          {allBooked == null ? "No Booked Gigs Yet!" :

            allBooked.map(gig =>
              <OngoingGigTile
                jobTitle={gig.title}
                jobDesc={gig.description}
                companyName={gig.companyData.name}
                companyLogo={gig.companyData.profilePicture}
                companyCity={gig.companyData.location.city}
                payAmt={gig.dailyPay}
                isFlexible={gig.isFlexible}
                payFor={(gig.endDate - gig.startDate) / 3600 / 24}
                link={gig.contractLink}
                startDate={gig.startDate.toDate().toDateString()}
                endDate={gig.endDate.toDate().toDateString()}
                contactNum={gig.companyData.phone}
                companyId={gig.companyId}

              />

            )

          }
        </Col>
      </Row>
      <div style={{ height: '60px' }}></div>

      <h3 style={{ color: Constants.BRIGHT_BLUE }}> Finished gigs </h3>

      <Row style={{ height: '50%', overflow: 'scroll' }}>

        {allFinished == null ? "No Finished Gigs Yet!" :

          allFinished.map(gig => (
            <Col xs={3} style={{ marginTop: '20px' }}>
              <div > </div>
              <div>
                <GigListingTile
                  jobTitle={gig.title}
                  jobDesc={gig.description}
                  companyName={gig.companyData.name}
                  companyLogo={gig.companyData.profilePicture}
                  companyCity={gig.companyData.location.city}
                  payAmt={gig.dailyPay}
                  isFlexible={gig.isFlexible}
                  payFor={(gig.endDate - gig.startDate) / 3600 / 24}
                  link={gig.contractLink}
                  startDate={gig.startDate.toDate().toDateString()}
                  endDate={gig.endDate.toDate().toDateString()}
                />
                {gig.pendingReview ? <div className="ReviewTag">
                  <Button onClick={() => { setIsOpenReview(true) }} text={'Review!'} forceWidth={50} type='GREEN' /> </div> : null}
                <Dialog open={isOpenReview} onClose={() => { setIsOpenReview(false) }}>
                  <DialogContent>
                    <DialogContentText>
                      {gig.companyId.id}
                      <CreateReviewTile gigRef={gig.gigRef} companyId={gig.companyId.id} />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => { setIsOpenReview(false) }}
                      color="primary" autoFocus text="Close"
                    />
                  </DialogActions>
                </Dialog>
              </div>
            </Col>)

          )

        }

      </Row>

    </div >
  );
}
