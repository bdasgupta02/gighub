import React from 'react'
import ApplicationsTile from '../../components/ApplicationsTile'
import { useAuth } from '../../contexts/AuthContext'

function MyApplications() {

    const { isWorker, currentUser } = useAuth()
    return (
        <div>
            <div id="HeaderTexts"> Applications</div>
            <ApplicationsTile />
        </div>
    )
}

export default MyApplications
