import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import FullPage from '../FullPage'
import { accessDB } from '../../database/firebase'
import * as constants from '../../constants'
import ChatLogo from './ChatLogo'
import { Col, Row, Container } from 'react-grid-system'
import ChatItem from './ChatItem'
import firebase from '@firebase/app-compat'
import Button from '../../components/Button'
import { PaperAirplaneIcon } from '@primer/octicons-react'
import { useLocation } from 'react-router'
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
 * - on click on the name and logo should go to profile (view profile)
 * - cross testing (after all of the above are done)
 */
function GigChat(props) {
    const { currentUserId, isWorker } = useAuth()
    const { gigId, workerId } = useLocation().state


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
    const messageEl = useRef(null)







    // DB
    const fetch = async () => {
        // create chat if not exists
        // get all the data
        // sort messages
        // set state

        // create chat: check if need to create beforehand or would add message suffice

        // get data
        const workerRef = await accessDB.collection(constants.WORKERS).doc(workerId).get()
        const workerData = workerRef.data()

        const companyRef = await accessDB.collection(constants.ACTIVE_GIGS).doc(gigId).get()
        const companyRefInner = await companyRef.data().companyId.get()
        const companyData = companyRefInner.data()
        console.log(companyData)

        const messagesRef = await accessDB.collection(constants.ACTIVE_GIGS).doc(gigId).collection('chat').doc(workerId).collection('messages').get()
        const messagesData = typeof messagesRef === 'undefined' || messagesRef.size === 0 ? [] : messagesRef.docs.map(e => e.data())

        messagesData.sort((a, b) => b.timestamp.seconds < a.timestamp.seconds ? 1 : -1)
        setCompany(companyData)
        setWorker(workerData)
        setMessages(messagesData)
    }

    const handleAddMessage = async () => {
        if (newMessage === '') {
            alert('Error: New message cannot be empty!')
        } else {
            await accessDB.collection(constants.ACTIVE_GIGS).doc(gigId).collection('chat').doc(workerId).collection('messages').add({
                creatorId: currentUserId,
                timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                content: newMessage
            })
        }

        setNewMessage('')
        fetch()
    }

    useEffect(() => {
        fetch()
    }, [])







    // auto scroll
    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])







    // ops
    const editNewMessage = (event) => {
        setNewMessage(event.target.value)
    }






    const RecLogo = isWorker ? <ChatLogo src={company.profilePicture} name={company.name} /> : <ChatLogo src={worker.profilePicture} name={worker.name} />
    const recName = isWorker ? company.name : worker.name
    const SendLogo = isWorker ? <ChatLogo src={worker.profilePicture} name={worker.name} /> : <ChatLogo src={company.profilePicture} name={company.name} />
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

            <div ref={messageEl} className="GCMessages">

                {messages.map(e => {
                    const date = new Date(e.timestamp.seconds * 1000)
                    const sender = currentUserId === e.creatorId

                    const convertedParams = {
                        isSender: sender,
                        logo: sender ? RecLogo : SendLogo,
                        content: e.content,
                        timeString: date.toDateString() + ", " + date.toTimeString().substring(0, 8)
                    }

                    const recStyle = {
                        width: 'fit-content',
                        paddingRight: '26px',
                        marginRight: 'auto'
                    }

                    const sendStyle = {
                        width: 'fit-content',
                        paddingLeft: '26px',
                        marginLeft: 'auto'
                    }

                    return (
                        <div style={sender ? sendStyle : recStyle}>
                            <ChatItem {...convertedParams} />
                        </div>
                    )
                })}

            </div>

            <div style={{ width: '100%', height: '20px' }} />

            <div>
                <input id="GCNewMsgInput" placeholder="Write a new message" value={newMessage} onChange={editNewMessage} /> 
            </div>
            <div style={{ height: '1px', width: '15px'}} />
            <Button type="PRIMARY" text="Send" forceWidth="140px" onClick={handleAddMessage} icon={<PaperAirplaneIcon size={16} />} />
            

        </FullPage >
    )
}

export default GigChat
