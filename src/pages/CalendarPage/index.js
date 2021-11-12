import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { accessDB } from '../../database/firebase'
import FullPage from '../FullPage'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import style from 'react-big-calendar/lib/css/react-big-calendar.css';
import GigStates from '../../enum/GigStates'

const localizer = momentLocalizer(moment)

function CalendarPage() {
    const { currentUserId } = useAuth()
    const [events, setEvents] = useState()

    // flow: check all gigs, then check assigned





    const fetch = async () => {
        let tempGigs = []
        const gigGet = await accessDB.collection('workers').doc(currentUserId).collection('appliedGigs').get()
        for (let i = 0; i < gigGet.docs.length; i++) {
            const gigData = gigGet.docs[i].data()
            const innerGigGet = await gigData.gig.get()
            if (innerGigGet.data().status === GigStates.ASSIGNED) {
                tempGigs.push(innerGigGet.data())
            }
        }

        let eventCache = []
        for (let i = 0; i < tempGigs.length; i++) {
            console.log(tempGigs[i])
            const convertedEvent = {
                title: tempGigs[i].title,
                start: new Date(tempGigs[i].startDate.seconds * 1000),
                end: new Date(tempGigs[i].completeBy.seconds * 1000),
            }
            eventCache.push(convertedEvent)
        }

        setEvents(eventCache)
    }

    useEffect(() => {
        fetch()
    }, [])


    return (
        <FullPage header="Calendar">
            <div style={{ width: '100%' }}>
                All the gigs you're currently assigned to!
            </div>
            <div style={{ width: '100%', height: '60px' }} />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ ...style, width: '80%', height: '700px' }}
            />
        </FullPage>
    )
}

export default CalendarPage
