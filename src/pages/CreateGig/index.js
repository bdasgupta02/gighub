import React, { useState } from 'react'
import FullPage from '../FullPage'
import { Switch } from '@mui/material'
import Button from '../../components/Button'
import DatePicker from 'react-date-picker'
import { Row, Col } from 'react-grid-system'
import Keyword from '../../components/Keyword'
import './createGig.css'

function CreateGig() {
    const [keywordCache, setKeywordCache] = useState('')
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
        dateAdded: new Date()
    })

    const handleTextInput = (event, type) => {
        setGigDetails({
            ...gigDetails,
            [type]: event.target.value
        })
    }

    const handleDateInput = (date, type) => {
        /**
         * Validation:
         * 
         */

        setGigDetails({
            ...gigDetails,
            [type]: date
        })
    }

    const handleAddKeyword = () => {
        if (keywordCache === '') {
            alert('Keyword can\'t be empty')
        }
        const editedRequirements = gigDetails.requirements
        const idx = editedRequirements.findIndex(x => x === keywordCache)
        idx === - 1 ? setGigDetails({ ...gigDetails, requirements: editedRequirements }) : alert('Keyword has already been added!')
        setKeywordCache('')
    }

    const handleRemoveKeyword = (keyword) => {

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

                {/** Tags: text box -> keywords **/}
                <div className="CGLabel">
                    Requirements (skills)
                </div>
                <div className="CGSubLabel">
                    What skills does the worker need to have for this gig?
                </div>
                <div className="CGInputBoxSmall">
                    <input className="CGInputText" placeholder="Keyword" type="text" value={keywordCache} onChange={(event) => setKeywordCache(event.target.value)} />
                </div>
                <div style={{ width: '100%', height: '8px' }} />
                <div style={{ width: 'fit-content' }}>
                    <Button type="PRIMARY" text="Add skill" forceWidth="100px" onClick={handleAddKeyword} />
                </div>
                <div style={{ width: '100%', height: '20px' }} />
                <div>
                    keywords
                </div>


                {/** All the dates **/}
                {/** StartDate **/}
                <div className="CGLabel">
                    Start date
                </div>
                <div className="CGSubLabel">
                    When does a worker begin working on it?
                </div>
                <DatePicker value={gigDetails.startDate} onChange={(date) => handleDateInput(date, 'startDate')} />


                {/** Complete By **/}
                <div className="CGLabel">
                    Complete by
                </div>
                <div className="CGSubLabel">
                    Last date a worker can work on the gig
                </div>
                <DatePicker value={gigDetails.completeBy} onChange={(date) => handleDateInput(date, 'completeBy')} />

                {/** End Date (specify listing) **/}
                <div className="CGLabel">
                    End date
                </div>
                <div className="CGSubLabel">
                    Last date that this gig will be publicly listed
                </div>
                <DatePicker value={gigDetails.endDate} onChange={(date) => handleDateInput(date, 'endDate')} />



                <div style={{ width: '100%', height: '60px' }} />
                <div>
                    <Button type="PRIMARY" text="Create gig" forceWidth="150px" />
                </div>
                <div style={{ width: '100%', height: '10px' }} />
                <div>
                    <Button type="WHITE" text="Cancel" forceWidth="150px" />
                </div>

            </form>
            <div style={{ width: '100%', height: '100px' }} />
        </FullPage>
    )
}

export default CreateGig
