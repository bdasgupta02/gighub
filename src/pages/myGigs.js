import * as Constants from '../constants.js';
import { Row, Col } from 'react-grid-system'
import GigListingTile from '../components/GigListingTile'
import Button from '../components/Button'
import OngoingGigTile from '../components/OngoingGigTile'
import * as fbFunctions from '../database/firebaseFunctions';
import React, { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore'

export default function MyGigs(props) {
  /* Props:
  pendingReview: true or false
   */

  const [allBooked, setAllBooked] = useState();
  const allBookedPromise = fbFunctions.getWorkerBookedGigs('5ornuxQ4USWJujeQxXnJ');
  const [allFinished, setAllFinished] = useState();


  useEffect(() => {
    let tempBooked = []
    if (allBooked == null) {
      allBookedPromise.then(arr => {
        arr.map(
          el => fbFunctions.getCompanyByRef(el.companyId).then(
            compData => {
              el['companyData'] = compData;
              console.log('new el: ' + JSON.stringify(el.companyData))
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
              console.log('new el: ' + JSON.stringify(el.companyData))
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
              />

            )

          }
        </Col>
      </Row>
      <div style={{ height: '60px' }}></div>

      <h3 style={{ color: Constants.BRIGHT_BLUE }}> Finished gigs </h3>

      <Row debug style={{ height: '50%', overflow: 'scroll' }}>

        {allFinished == null ? "No Finished Gigs Yet!" :

          allFinished.map(gig => (
            <Col xs={3}>
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
              </div>
            </Col>)

          )

        }

      </Row>

    </div >
  );
}
