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
import { useAuth } from '../contexts/AuthContext.js';

export default function MyGigs(props) {
  /* Props:
  pendingReview: true or false
  user.uid
   */
  const { currentUser } = useAuth()
  const [allBooked, setAllBooked] = useState();
  // const allBookedPromise = fbFunctions.getWorkerBookedGigs('5ornuxQ4USWJujeQxXnJ');

  const [allFinished, setAllFinished] = useState();
  const [isOpenReview, setIsOpenReview] = useState(false)


  useEffect(() => {
    let tempBooked = []
    if (allBooked == null && currentUser != null) {
      fbFunctions.getWorkerBookedGigs(currentUser.uid).then(arr => {
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

    if (allFinished == null && currentUser != null) {
      let tempFinished = []
      fbFunctions.getWorkerArchivedGigs(currentUser.uid).then(arr => {
        arr.map(
          el => fbFunctions.getCompanyByRef(el.companyId).then(
            compData => {
              el['companyData'] = compData;
              console.log('new el: ' + JSON.stringify(el.companyId.id))
              tempFinished.push(el)
              console.log("in my gigs: fnished gigs: " + JSON.stringify(el))
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

    < div id="Base" style={{ height: '100%' }}>

      <div id="HeaderTexts">
        <span id="HeaderTitle"> Your Gigs</span> <br />
      </div>
      <div style={{ height: '50px' }}></div>
      <div id="SectionBG"> Ongoing gigs </div>
      <Row style={{ height: '30%', overflow: 'scroll' }}>
        <Col>
          {console.log('in render: ' + JSON.stringify(allBooked))}
          {allBooked == null ? <div id="NullText">No ongoing gigs!</div> :

            allBooked.map(gig =>
              <OngoingGigTile
                id={gig.id}
                jobTitle={gig.title}
                jobDesc={gig.description}
                companyName={gig.companyData.name}
                companyLogo={gig.companyData.profilePicture}
                companyCity={gig.companyData.location.city}
                payAmt={"S$" + gig.pay}
                isFlexible={gig.isFlexible}
                payFor={gig.unit}
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


      <div id="SectionBG">Finished Gigs</div>

      <Row style={{ height: '50%', overflow: 'scroll' }}>


        {allFinished == null ? <div id="NullText">No Finished Gigs Yet!</div> :

          allFinished.map(gig => (
            <Col xs={3} style={{ marginTop: '20px' }}>
              <div > </div>
              <div style={{ width: '300px' }}>
                <GigListingTile
                  id={gig.id}
                  jobTitle={gig.title}
                  jobDesc={gig.description}
                  companyName={gig.companyData.name}
                  companyLogo={gig.companyData.profilePicture}
                  companyCity={gig.companyData.location.city}
                  payAmt={"S$" + gig.pay}
                  isFlexible={gig.isFlexible}
                  payFor={gig.unit}
                  link={gig.contractLink}
                  startDate={gig.startDate.toDate().toDateString()}
                  endDate={gig.endDate.toDate().toDateString()}
                />
                {gig.pendingReview ? <div className="ReviewTag">
                  <Button onClick={() => { setIsOpenReview(true) }} text={'Review!'} forceWidth={50} type='GREEN' /> </div> : null}
                <Dialog open={isOpenReview} onClose={() => { setIsOpenReview(false) }}>
                  <DialogContent>
                    <DialogContentText>

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
