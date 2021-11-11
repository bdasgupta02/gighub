import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { useLocation } from 'react-router-dom'

import logo from "../../assets/google.svg"
import Button from "../Button/index"
import Highlight from "../GigListingTile/Highlight"
import FullPage from "../../pages/FullPage"
import Keyword from "../Keyword/Keyword"
import LoadingIndicator from '../../components/LoadingIndicator'
import { getActiveGig, getCompany } from "../../database/firebaseFunctions";

import ReactModal from "react-modal"

import "./gigDetails.css"

import { } from '@primer/octicons-react'

import { formatTimestamp } from "../../auxiliary/Auxiliary"

const GigDetails = (props) => {
  const location = useLocation().state
  const { gigId } = location

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
    tags: [],
    completeBy: null,
    startDate: null,
    endDate: null,
    dateAdded: '',
    companyLogo: '',
    companyName: ''
  })

  // DB
  // TODO: retrieval key, how to deal with tags
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
      tags: gigData.tags,
      completeBy: gigData.completeBy,
      startDate: gigData.startDate,
      endDate: gigData.endDate,
      dateAdded: gigData.dateAdded,
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

  useEffect(() => {
    fetch()
  }, [])

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
                <div className="extraVerticalPadding">
                  <Button text="Apply" onClick={() => setApplyTabIsOpen(true)} type="PRIMARY" forceWidth="90px" />
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
                          <textarea className="GDModalTextArea" placeholder="Write any additional details (Optional)" />
                        </Col>
                      </Row>

                      <Row className="emptyRow">
                        <Col></Col>
                      </Row>
                      <Row className="emptyRow">
                        <Col></Col>
                      </Row>

                      <Row align="center">
                        <Col sm={2.5}>

                        </Col>
                        <Col sm={3.2}>
                          <Button text="Submit" type="PRIMARY" forceWidth="110px"></Button>
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