import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { useLocation, useHistory } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext';

import logo from "../../assets/google.svg"
import Button from "../Button/index"
import Highlight from "../GigListingTile/Highlight"
import FullPage from "../../pages/FullPage"
import Keyword from "../Keyword/Keyword"
import LoadingIndicator from '../../components/LoadingIndicator'
import LogoBox from "../LogoBox/index"
import { getActiveGig, getCompany, applyToGig, getWorkerAppliedGigs, getWorker, getApplicationData, setApplicationStatus } from "../../database/firebaseFunctions";


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
  const history = useHistory()

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

  const [focusWorkerData, setFocusWorkerData] = useState({
    name: '',
    profilePicture: ''
  })
  const [focusApplicationData, setFocusApplicationData] = useState({
    dateApplied: '',
    optionalComments: '',
    pendingCompanyReview: '',
    pendingReview: '',
    status: ''
  })
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
    const focusWorkersData = await getWorker(focusWorkerId)
    const focusWorkerData = focusWorkersData[0]
    setFocusWorkerData({
      name: focusWorkerData.name,
      profilePicture: focusWorkerData.profilePicture
    })
  }

  const fetchApplicationData = async (inputWorkerId) => {
    console.log("Hello " + inputWorkerId)
    const focusApplicationData = await getApplicationData(inputWorkerId, gigId)
    console.log("Hello " + focusApplicationData)

    setFocusApplicationData({
      dateApplied: formatTimestamp(focusApplicationData.dateApplied),
      optionalComments: focusApplicationData.optionalComments,
      pendingCompanyReview: focusApplicationData.pendingCompanyReview,
      pendingReview: focusApplicationData.pendingReview,
      status: focusApplicationData.status
    })
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
    if (mode == 'workerPov') {
      fetchApplicationStatus()
    }

    if (mode == 'companyPovFocusWorker') {
      fetchFocusWorker()
      fetchApplicationData(focusWorkerId)
    }
  }, [])

  const handleApplyDetails = (e) => {
    setApplyDetails(e.target.value)
  }

  const handleApply = () => {
    console.log(gigId, currentUserId)
    applyToGig(gigId, currentUserId, applyDetails)
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
              <div className="GDHighlights">
                {details.isFlexible ? (<Highlight type="FLEXIBLE" />) : (<span></span>)}
              </div>
              <div className="GDHighlights">
                {details.isVariable ? (<Highlight type="VARIABLE" />) : (<span></span>)}
              </div>
              {details.requirements.map((tag) => {
                return (
                  <div className="GDHighlights">
                    <Highlight type={tag} />
                  </div>
                )
              })}
            </Row>
            <Row className="spacingRow">
              <Col></Col>
            </Row>
            <Row className="GDApplicant" onClick={() => history.push("/view_profile", { userId: details.companyId, userType: 'company' })}>
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
                    {hasApplied ? (
                      <div>
                        <Button text="Applied" onClick={() => alert("You have already applied for this position!")} type="SECONDARY" forceWidth="90px" />
                        <Button text="Chat" forceWidth="90px" type="PRIMARY" onClick={() => history.push("/gig_chat", { gigId: gigId, workerId: currentUserId, companyId: details.companyId })} />
                      </div>
                    ) : (<Button text="Apply" onClick={() => setApplyTabIsOpen(true)} type="PRIMARY" forceWidth="90px" />)}
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
                      <hr></hr>

                      <Row>
                        <Col>
                          <span className="GDSectionTitle">Application Status: <span className="GDAppStatus">{focusApplicationData.status}</span></span>
                        </Col>
                      </Row>

                      <Row className="spacingRow">
                        <Col></Col>
                      </Row>

                      <Row className="GDApplicant" onClick={() => history.push("/view_profile", { userId: focusWorkerId, userType: 'worker' })}>
                        <Col sm={2}>
                          <div className="GDHeaderLogo" >
                            <LogoBox src={focusWorkerData.profilePicture} name={focusWorkerData.name} />
                          </div>
                        </Col>
                        <Col sm={10} className="GDHeader">
                          <span className="GDName1">Applicant Name: </span><br></br>
                          <span className="GDName2">{focusWorkerData.name}</span>
                        </Col>
                      </Row>

                      <Row className="spacingRow">
                        <Col></Col>
                      </Row>

                      <Row>
                        <Col>
                          <Button text="Chat" forceWidth="90px" type="PRIMARY" onClick={() => history.push("/gig_chat", { gigId: gigId, workerId: focusWorkerId, companyId: currentUserId })} />
                        </Col>
                      </Row>

                      <Row className="spacingRow">
                        <Col></Col>
                      </Row>

                      {focusApplicationData.status == 'Applied' ? (
                        <Row>
                          <Col sm={5}>
                            <Button text="OFFER" forceWidth="90px" type="PRIMARY" onClick={() => setApplicationStatus(focusWorkerId, gigId, "Offered")} />
                          </Col>
                          <Col>
                            <Button text="REJECT" forceWidth="90px" type="PRIMARY" onClick={() => setApplicationStatus(focusWorkerId, gigId, "Rejected")} />
                          </Col>
                        </Row>
                      ) : (<span></span>)}

                      {focusApplicationData.status == 'Assigned' ? (
                        <Row>
                          <Col>
                            <Button text="CLOSE" forceWidth="90px" type="PRIMARY" onClick={() => setApplicationStatus(focusWorkerId, gigId, "Closed")} />
                          </Col>
                        </Row>
                      ) : (<span></span>)}

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