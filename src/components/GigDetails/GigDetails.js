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
import { getActiveGig, getCompany, applyToGig, getWorkerAppliedGigs } from "../../database/firebaseFunctions";

import ReactModal from "react-modal"

import "./gigDetails.css"

import { } from '@primer/octicons-react'

import { formatTimestamp } from "../../auxiliary/Auxiliary"

const GigDetails = (props) => {
  const { currentUser, currentUserId, isWorker } = useAuth()

  const location = useLocation().state
  const { gigId } = location

  const [hasApplied, setHasApplied] = useState(false)
  const [appliedGigs, setAppliedGigs] = useState([])
  const [applyDetails, setApplyDetails] = useState('')
  const [loading, setLoading] = useState(false)
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
    taken: ''
  })

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
      capacity: gigData.capacity
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
      if (currGig.gigId == gigId) {
        setHasApplied(true)
        return
      }
    })
  }

  useEffect(() => {
    fetch()
    fetchApplicationStatus()
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
                  {/*TODO: Dynamic rendering of logo*/}
                  <img className="GDCompanyLogo" src={details.companyLogo} />
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
                  {isWorker ? (<span>
                    {hasApplied ? (<Button text="Applied" onClick={() => alert("You have already applied for this position!")} type="SECONDARY" forceWidth="90px" />) : (<Button text="Apply" onClick={() => setApplyTabIsOpen(true)} type="PRIMARY" forceWidth="90px" />)}
                  </span>) : (<span></span>)}
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
              </Col>
            </Row>

          </Col>
        </Row>
      } />
    </div>)
}

export default GigDetails