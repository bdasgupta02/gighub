import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import LogoGenerator from '../components/LogoGenerator';
import logo from '../assets/GighubLogo.js';
import * as Constants from '../constants'
import * as fbFunctions from '../database/firebaseFunctions'
import ReviewStars from '../components/ReviewStars'
import ReviewTile from '../components/ReviewTile'
import GigListingTile from '../components/GigListingTile'
import { load } from 'dotenv';
import { useLocation } from 'react-router';


export default function CompanyDetails(props) {

  const [companyId, setCompanyId] = useState();
  const [company, setCompany] = useState();
  const [reviews, setReviews] = useState();
  const [gigs, setGigs] = useState();

  const location = useLocation().state;

  useEffect(
    () => {
      if (companyId == null) {
        setCompanyId(location.companyId)
        fbFunctions.getCompany(location.companyId).then(data => (setCompany(data)));
      }
      if (reviews == null) {
        fbFunctions.getCompanyReviews(location.companyId).then(
          data => {
            setReviews(data);
            console.log('company reviews: ' + JSON.stringify(data))
          }
        )
      }
      if (gigs == null) {
        let tempFinished = []
        fbFunctions.getCompanyPostedGigs(location.companyId).then(arr => {
          arr.map(
            el => fbFunctions.getCompanyByRef(el.companyId).then(
              compData => {
                el['companyData'] = compData;
                console.log('new el: ' + JSON.stringify(el.companyData))
                tempFinished.push(el)
                console.log("temp finished: " + tempFinished)
                setGigs(tempFinished)
              }))

          console.log("after setting: " + tempFinished);
        }

        )
      }
    }
    , [])

  if (company != null && reviews != null) {

    return (
      < div style={{ height: '100%', width: '100%' }}>
        <Row>
          <img src={company.profilePicture} style={{ height: '50px', display: 'inline', margin: '20px' }} />
          <Col>
            <h1> {company.name} </h1>
            <div style={{ fontWeight: 'bold', color: 'grey' }}> UEN </div>
            <div> {company.UEN == "" ? "No UEN number" : company.UEN} </div>
            <div style={{ height: '20px' }}></div>
            <div style={{ fontWeight: 'bold', color: 'grey' }}> Location </div>
            <div> {company.location == null ? "No UEN number"
              : Object.entries(company.location)
                .map(([key, value]) => <div> {value}  < br /> </div>)}
            </div>
            <div style={{ height: '20px' }}></div>
            <div style={{ fontWeight: 'bold', color: 'grey' }}> Phone Number </div>
            <div> {company.phone == "" ? "No phone number" : company.phone} </div>
            <div style={{ height: '20px' }}></div>
            <div style={{ fontWeight: 'bold', color: 'grey' }}> Email </div>
            <div> {company.email == "" ? "No email provided" : company.email} </div>
            <div style={{ height: '20px' }}></div>
          </Col>

        </Row>
        <div style={{ height: '50px' }}>  </div>
        <h3 style={{ color: Constants.BRIGHT_BLUE }}> Gigee Reviews </h3>
        <span style={{ fontWeight: 'bold', color: 'grey', display: 'inline-block' }}>
          Average: {company.avgReview == -1 ? 'No reviews yet' : <ReviewStars rating={company.avgReview} />}

        </span>

        <Row direction="row" style={{ height: '30%', width: '100%', overflow: 'auto', overflowY: 'scroll' }} nowrap='true'>
          {reviews.map(review =>
            <Col xs={3}>
              <ReviewTile
                revieweeTitle={review.gigTitle}
                date={review.date.toDate().toDateString()}
                textReview={review.textReview}
                rating={review.numStars}
                tags={review.reviewTags}
              />
            </Col>

          )}

        </Row>
        <div style={{ height: '60px' }}></div>

        <h3 style={{ color: Constants.BRIGHT_BLUE }}> Other gigs </h3>

        <Row style={{ height: '50%', overflow: 'scroll' }}>

          {gigs == null ? "No Posted Gigs Yet!" :

            gigs.map(gig => (
              <Col xs={3} style={{ marginTop: '20px' }}>
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
              </Col>)

            )

          }

        </Row>

      </div >
    );
  } else {
    return (
      <div> Loading company... </div>
    )
  }
}