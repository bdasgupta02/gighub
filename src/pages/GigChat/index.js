import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import FullPage from '../FullPage'
import { accessDB } from '../../database/firebase'
import * as constants from '../../constants'
import ChatLogo from './ChatLogo'
import { Col, Row, Container } from 'react-grid-system'
import './gigChat.css'

/**
 * Location info:
 * - gigId
 * 
 * Assumption:
 * - this page won't be accessible in the first place if a worker is not assigned to this gig and the company does not own it
 * (need to implement this in the view gig page)
 * - if the current user is worker, the other must be company (will be searched from company) and vice versa
 * 
 * TODO:
 * - move all functions to firebase
 * - add constants for chat and messages collections
 * - if isWorker then use currentuserId
 * - on click on the name and logo should go to profile
 */
function GigChat(props) {
    // props needed: gigId, workerId

    const { currentUserId, isWorker } = useAuth()

    // new message
    const [newMessage, setNewMessage] = useState('')

    // data
    const [company, setCompany] = useState({
        profilePicture: '',
        name: '',
    })
    const [worker, setWorker] = useState({
        profilePicture: '',
        name: '',
    })
    const [messages, setMessages] = useState([])
    const [gig, setGig] = useState({})






    // Hardcoded
    const gigId = '22eTmjT1E2lSjMsQ7fIX'
    const workerId = 'JXoSVOEbbeeTxnUOkurEgENA7kg1'






    const fetch = async () => {
        // create chat if not exists
        // get all the data
        // sort messages
        // set state

        // create chat: check if need to create beforehand or would add message suffice

        // get data
        const gigRef = await accessDB.collection(constants.ACTIVE_GIGS).doc(gigId).get()
        const gigData = gigRef.data()

        const workerRef = await accessDB.collection(constants.WORKERS).doc(workerId).get()
        const workerData = workerRef.data()

        const companyRef = await accessDB.collection(constants.ACTIVE_GIGS).doc(gigId).get()
        const companyRefInnerId = companyRef.data().companyId
        const companyInnerRef = await accessDB.collection(constants.COMPANIES).doc(companyRefInnerId).get()
        const companyData = companyInnerRef.data()
        console.log(companyData)

        const messagesRef = await accessDB.collection(constants.ACTIVE_GIGS).doc(gigId).collection('chat').doc(workerId).collection('messages').get()
        const messagesData = typeof messagesRef === 'undefined' || messagesRef.size === 0 ? [] : messagesRef.docs.map(e => e.data())

        setCompany(companyData)
        setWorker(workerData)
        setMessages(messagesData)
        setGig(gigData)
    }

    useEffect(() => {
        fetch()
    }, [])

    const RecLogo = isWorker ? <ChatLogo src={company.profilePicture} name={company.name} /> : <ChatLogo src={worker.profilePicture} name={worker.name} />
    const recName = isWorker ? company.name : worker.name
    return (
        <FullPage header="View chat">
            <Row style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 'fit-content' }}>
                    {RecLogo}
                </div>
                <Col>
                    <div style={{ width: 'fit-content' }} className="GCSubWith">
                        This chat is with
                    </div>
                    <div style={{ width: 'fit-content' }} className="GCSubName">
                        {recName}
                    </div>
                </Col>
            </Row>

            <div style={{ width: '100%', height: '60px' }} />

            <div style={{ width: '100%' }}>
                test
            </div>

        </FullPage>
    )
}

export default GigChat
