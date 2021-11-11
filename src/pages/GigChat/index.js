import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import FullPage from '../FullPage'
import './gigChat.css'

/**
 * Location info:
 * - gigId
 * 
 * Assumption:
 * - this page won't be accessible in the first place if a worker is not assigned to this gig and the company does not own it
 * (need to implement this in the view gig page)
 * - if the current user is worker, the other must be company (will be searched from company) and vice versa
 */
function GigChat(props) {
    const { currentUserId, isWorker } = useAuth()


    return (
        <FullPage header="View chat">
            
        </FullPage>
    )
}

export default GigChat
