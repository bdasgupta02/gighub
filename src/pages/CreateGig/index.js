import React, { useState } from 'react'
import FullPage from '../FullPage'
import { Switch } from '@mui/material'
import './createGig.css'

function CreateGig() {
    const [gigDetails, setGigDetails] = useState({
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
        dateAdded: null
    })

    const handleTextInput = (event, type) => {
        setGigDetails({
            ...gigDetails,
            [type]: event.target.value
        })
    }

    /**
     * Form details:
     * - title (title)
     * - description (desc)
     * - requirements (keywords : string[])
     * - isFlexible (boolean)
     * - isVariable (boolean)
     * - pay
     * - unit
     * - tags ? get tags -> store string of the selected tag
     * - completeBy (date)
     * - startDate (date)
     * - endDate (date) ? filters listing only - need to add to search gigs page
     * - dateAdded (date, auto generation)
     * >>>> write that all dates end at 2359
     * 
     * Notes:
     * - for edit, the title should not be edited (need to specify why)
     * - conditions for date: dateAdded < endDate && startDate < completeBy && endDate < completeBy
     * - conditions for text != null
     * - conditions for requirements: length > 0
     */
    return (
        <FullPage header="Create gig">
            <div style={{ width: '100%', height: '50px' }} />
            <form style={{ width: '100%' }}>
                <div className="CGLabel">
                    Job title (position)
                </div>
                <div className="CGInputBox">
                    <input className="CGInputText" placeholder="Title" />
                </div>
                <div className="CGLabel">
                    Job description
                </div>
                <div className="CGInputBox">
                    <textarea className="CGInputText CGInputTextArea" placeholder="Description" cols="40" rows="5" type="text" />
                </div>
                <div className="CGLabel">
                    Is this job flexible?
                </div>
                <div className="CGSubLabel">
                    Are the office hours standard?
                </div>
                <div>
                    <Switch inputProps={{ 'aria-label': 'ant design' }} />
                </div>
                <div className="CGLabel">
                    Is the payment variable?
                </div>
                <div className="CGSubLabel">
                    Is it dependent on hours/days?
                </div>
                <div>
                    <Switch inputProps={{ 'aria-label': 'ant design' }} />
                </div>
                <div className="CGLabel">
                    Payment amount (in S$)
                </div>
                <div className="CGInputBoxSmall">
                    <input className="CGInputText" placeholder="Amount" type="number" />
                </div>
                <div className="CGLabel">
                    Payment for
                </div>
                <div className="CGSubLabel">
                    What units are the payments based on? (e.g. 10 days, per hour)
                </div>
                <div className="CGInputBoxSmall">
                    <input className="CGInputText" placeholder="Unit" type="text" />
                </div>

                <div>

                </div>

                <div>

                </div>

            </form>
        </FullPage>
    )
}

export default CreateGig
