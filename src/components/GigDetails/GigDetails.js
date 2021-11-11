import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { useLocation } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext';

import logo from "../../assets/google.svg"
import Button from "../Button/index"
import Highlight from "../GigListingTile/Highlight"
import FullPage from "../../pages/FullPage"
import Keyword from "../Keyword/Keyword"
import LoadingIndicator from '../../components/LoadingIndicator'
import LogoBox from "../LogoBox/index"
import { getActiveGig, getCompany, applyToGig, getWorkerAppliedGigs,getWorker } from "../../database/firebaseFunctions";


import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CreateReviewTile from '../CreateReviewTile/CreateReviewTile';

import ReactModal from "react-modal"

import "./gigDetails.css"

import { } from '@primer/octicons-react'

import { formatTimestamp } from "../../auxiliary/Auxiliary"

const GigDetails = (props) => {
  const { currentUser, currentUserId, isWorker } = useAuth()

  const location = useLocation().state
  const { gigId, focusWorkerId, reviewable, extraReviewDataGigRef } = location

  let mode = ''

  if (isWorker) {
    mode = 'workerPov'
  } else {
    if (focusWorkerId != null) {
      mode = 'companyPovFocusWorker'
    } else {
      mode = 'companyPov'
    }
  }

  const [focusWorkerData, setFocusWorkerData] = useState()
  const [focusApplicationData, setFocusApplicationData] = useState()
  const [hasApplied, setHasApplied] = useState(false)
  const [appliedGigs, setAppliedGigs] = useState([])
  const [applyDetails, setApplyDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOpenReview, setIsOpenReview] = useState(false)
  const [applyTabIsOpen, setApplyTabIsOpen] = useState(false)
  const [details, setDetails] = useState({
    title: '',
    description: '',
    requirements: [],
    isFlexible: false,
    isVariable: false,
    pay: 0,
    unit: '',
    completeBy: null,
    startDate: null,
    endDate: null,
    dateAdded: '',
    companyLogo: '',
    companyName: '',
    capacity: '',
    taken: '',
    companyId: ''
  })

  const fetchFocusWorker = async () => {
    const focusWorkerData = await getWorker(focusWorkerId)
    setFocusWorkerData(focusWorkerData[0])

    // get application data
  }

  // DB
  const fetch = async () => {
    setLoading(true)
    let newDetails = {
      ...details
    }

    const gigsData = await getActiveGig(gigId)
    const gigData = gigsData[0]

    newDetails = {
      ...newDetails,
      title: gigData.title,
      description: gigData.description,
      requirements: gigData.requirements,
      isFlexible: gigData.isFlexible,
      isVariable: gigData.isVariable,
      pay: gigData.pay,
      unit: gigData.pay,
      completeBy: gigData.completeBy,
      startDate: gigData.startDate,
      endDate: gigData.endDate,
      dateAdded: gigData.dateAdded,
      taken: gigData.taken,
      capacity: gigData.capacity,
      companyId: gigData.companyId.id
    }

    const companies = await getCompany(gigData.companyId.id)
    const company = companies[0]

    newDetails = {
      ...newDetails,
      companyName: company.name,
      companyLogo: company.profilePicture
    }

    setDetails(newDetails)

    setLoading(false)
  }

  const fetchApplicationStatus = async () => {
    const allAppliedGigs = await getWorkerAppliedGigs(currentUserId)

    allAppliedGigs.forEach((currGig) => {
      if (currGig.id == gigId) {
        setHasApplied(true)
        return
      }
    })
  }

  useEffect(() => {
    fetch()
    fetchApplicationStatus()

    if (mode == 'companyPovFocusWorker') {
      fetchFocusWorker()
    }
  }, [])

  const handleApplyDetails = (e) => {
    setApplyDetails(e.target.value)
  }

  const handleApply = () => {
    console.log(gigId, currentUserId)
    applyToGig(gigId, currentUserId)
    setApplyTabIsOpen(false)
  }

  return (
    <div>
      <FullPage header={
        <Row className="GDBase">
          <Col>
            <Row>
              <Col><span className="GDHeaderTitle">{details.title}</span></Col>
            </Row>
            <Row className="spacingRow">
              <Col></Col>
            </Row>
            <Row className="GDHeaderTags">
              <div>
                {details.isFlexible ? (<Highlight type="FLEXIBLE" />) : (<span></span>)}
              </div>
              <div>
                {details.isVariable ? (<Highlight type="VARIABLE" />) : (<span></span>)}
              </div>
              {details.requirements.map((tag) => {
                return (
                  <div>
                    <Highlight type={tag} />
                  </div>
                )
              })}
            </Row>
            <Row className="spacingRow">
              <Col></Col>
            </Row>
            <Row>
              <Col sm={2}>
                <div className="GDHeaderLogo" >
                  <LogoBox src={details.companyLogo} name={details.companyName} />
                </div>
              </Col>
              <Col sm={10} className="GDHeader">
                <span className="GDHeaderSub1">Listed on {formatTimestamp(details.dateAdded)} by</span> <br></br>
                <span className="GDHeaderSub2">{details.companyName}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      } children={
        <Row className="GDBase">
          <Col>
            <Row className="emptyRow">
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionTitle">Description</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionContent">
                  {details.description}
                </span>
              </Col>
            </Row>

            <Row className="emptyRow">
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionTitle">Details</span>
              </Col>
            </Row>

            <Row className="spacingRow">
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <span className="GDSectionSubTitle">Available until</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionContent">
                  {formatTimestamp(details.endDate)}
                </span>
              </Col>
            </Row>

            <Row className="spacingRow">
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <span className="GDSectionSubTitle">Payment</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionContent">
                  {details.pay} / {details.unit}
                </span>
              </Col>
            </Row>

            <Row className="spacingRow">
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <span className="GDSectionSubTitle">Complete by</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionContent">
                  {formatTimestamp(details.completeBy)}
                </span>
              </Col>
            </Row>

            <Row className="emptyRow">
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <span className="GDSectionSubTitle">Capacity</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="GDSectionContent">
                  {details.taken} / {details.capacity}
                </span>
              </Col>
            </Row>

            <Row className="emptyRow">
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <div className="extraVerticalPadding">

                  {/* Worker POV */}
                  {isWorker ? (<span>
                    {hasApplied ? (<Button text="Applied" onClick={() => alert("You have already applied for this position!")} type="SECONDARY" forceWidth="90px" />) : (<Button text="Apply" onClick={() => setApplyTabIsOpen(true)} type="PRIMARY" forceWidth="90px" />)}
                  </span>) : (<span></span>)}

                  {reviewable != null && reviewable ? <div>
                    <Button onClick={() => { setIsOpenReview(true) }} text={'Review!'} forceWidth={50} type='GREEN' /> </div> : null}

                  {/* Company POV */}
                  {!isWorker && mode == 'companyPov' && details.companyId == currentUserId ? (
                    <div>
                      <Button text="Edit" forceWidth="90px" type="PRIMARY" />
                    </div>
                  ) : (<span></span>)}

                  {!isWorker && mode == 'companyPovFocusWorker' && details.companyId == currentUserId ? (
                    <div>
                      <div>
                        <Button text="Chat" forceWidth="90px" type="PRIMARY" />
                      </div>
                      <div>
                        <Button text="Worker Profile" forceWidth="90px" type="PRIMARY" />
                      </div>
                      <div>
                        <Button text="Change Status" forceWidth="90px" type="PRIMARY" />
                      </div>
                    </div>
                  ) : (<span></span>)}

                </div>

                <ReactModal isOpen={applyTabIsOpen} className="GDModal" overlayClassName="GDModalOverlay">
                  <Row align="center" justify="center" className="GDModalBase">
                    <Col sm={4} className="GDModalCol">
                      <Row className="emptyRow">
                        <Col> </Col>
                      </Row>

                      <Row align="center">
                        <Col className="GDModalTitle">
                          Apply
                        </Col>
                      </Row>

                      <Row className="emptyRow">
                        <Col></Col>
                      </Row>

                      <Row align="center" className="GDModalInputBase">
                        <Col className="GDModalTitle GDModalInputCol">
                          <textarea className="GDModalTextArea" value={applyDetails} onChange={handleApplyDetails} placeholder="Write any additional details (Optional)" />
                        </Col>
                      </Row>

                      <Row className="emptyRow">
                        <Col></Col>
                      </Row>

                      <Row align="center">
                        <Col sm={2.5}>

                        </Col>
                        <Col sm={3.2}>
                          <Button text="Submit" onClick={handleApply} type="PRIMARY" forceWidth="110px"></Button>
                        </Col>
                        <Col sm={3}>
                          <Button text="Cancel" onClick={() => setApplyTabIsOpen(false)} type="SECONDARY" forceWidth="110px"></Button>
                        </Col>
                        <Col sm={3}>
                        </Col>
                      </Row>

                    </Col>
                  </Row>
                </ReactModal>

                <Dialog open={isOpenReview} onClose={() => { setIsOpenReview(false) }}>
                  <DialogContent>
                    <DialogContentText>

                      <CreateReviewTile gigRef={extraReviewDataGigRef} companyId={details.companyId} />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => { setIsOpenReview(false) }}
                      color="primary" autoFocus text="Close"
                    />
                  </DialogActions>
                </Dialog>
              </Col>
            </Row>

          </Col>
        </Row>
      } />
    </div>)
}

export default GigDetails