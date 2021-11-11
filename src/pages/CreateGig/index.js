import React, { useState } from 'react'
import FullPage from '../FullPage'
import { Switch } from '@mui/material'
import Button from '../../components/Button'
import DatePicker from 'react-date-picker'
import { Row, Col } from 'react-grid-system'
import Keyword from '../../components/Keyword'
import VariableUnit from '../../enum/VariableUnit'
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material'
import { accessDB } from '../../database/firebase'
import * as constants from '../../constants'
import { useAuth } from '../../contexts/AuthContext'
import './createGig.css'

/**
 * TODO:
 * - Cancel button
 * - date validation: end date < completeby < start date
 */
function CreateGig() {
    const { currentUserId } = useAuth()
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
        dateAdded: new Date(),
        capacity: 0,
        taken: 0,
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
            return
        }
        const editedRequirements = gigDetails.requirements
        const idx = editedRequirements.findIndex(x => x === keywordCache)
        if (idx === -1) {
            editedRequirements.push(keywordCache)
        } else {
            alert('Keyword has already been added!')
            return
        }
        setGigDetails({ ...gigDetails, requirements: editedRequirements })
        setKeywordCache('')
    }

    const handleRemoveKeyword = (keyword) => {
        let requirements = gigDetails.requirements
        const editedRequirements = requirements.filter(x => x !== keyword)
        setGigDetails({ ...gigDetails, requirements: editedRequirements })
    }

    const handleUnitSelect = (event) => {
        setGigDetails({
            ...gigDetails,
            unit: event.target.value
        })
    }

    const handleBooleanInput = (event, type) => {
        setGigDetails({
            ...gigDetails,
            [type]: event.target.checked
        })
    }

    const handleCreateGig = async () => {
        // empty check
        // date check
        // capacity check
        // add to company inside then
        await accessDB.collection(constants.ACTIVE_GIGS).add(gigDetails).then(async (res) => {
            await accessDB.collection(constants.COMPANIES).doc(currentUserId).collection(constants.POSTED_GIGS).add({
                gig: res
            })
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
                    <input className="CGInputText" placeholder="Title" value={gigDetails.title} onChange={(event) => handleTextInput(event, 'title')} />
                </div>
                <div className="CGLabel">
                    Job description
                </div>
                <div className="CGInputBox">
                    <textarea className="CGInputText CGInputTextArea" placeholder="Description" cols="40" rows="5" type="text" onChange={(event) => handleTextInput(event, 'description')} value={gigDetails.description} />
                </div>
                <div className="CGLabel">
                    Is this job flexible?
                </div>
                <div className="CGSubLabel">
                    Are the office hours standard?
                </div>
                <div>
                    <Switch inputProps={{ 'aria-label': 'ant design' }} checked={gigDetails.isFlexible} onChange={(event) => handleBooleanInput(event, 'isFlexible')} />
                </div>
                <div className="CGLabel">
                    Is the payment variable?
                </div>
                <div className="CGSubLabel">
                    Is it dependent on hours/days?
                </div>
                <div>
                    <Switch inputProps={{ 'aria-label': 'ant design' }} checked={gigDetails.isVariable} onChange={(event) => handleBooleanInput(event, 'isVariable')} />
                </div>
                <div className="CGLabel">
                    Payment amount (in S$)
                </div>
                <div className="CGInputBoxSmall">
                    <input className="CGInputText" placeholder="Amount" type="number" onChange={(event) => handleTextInput(event, 'pay')} value={gigDetails.pay} />
                </div>
                <div className="CGLabel">
                    Payment for
                </div>
                <div className="CGSubLabel">
                    What units are the payments based on? (e.g. 10 days, hourly)
                </div>
                {gigDetails.isVariable ? (
                    <Box sx={{ width: '200px' }}>
                        <div style={{ width: '100%', height: '8px' }} />
                        <FormControl fullWidth>
                            <InputLabel id="unit-label">Unit</InputLabel>
                            <Select
                                labelId="unit-label"
                                id="unit-select"
                                value={gigDetails.unit}
                                label="Unit"
                                onChange={handleUnitSelect}
                            >
                                <MenuItem value={VariableUnit.DAY}>Daily</MenuItem>
                                <MenuItem value={VariableUnit.HOUR}>Hourly</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                ) : (
                    <div className="CGInputBoxSmall">
                        <input className="CGInputText" placeholder="Unit" type="text" value={gigDetails.unit} onChange={(event) => handleTextInput(event, 'unit')} />
                    </div>
                )}


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
                    {gigDetails.requirements.map(e => (
                        <div style={{ width: 'fit-content' }}>
                            <Keyword keyword={e} onClose={handleRemoveKeyword} />
                        </div>
                    ))}
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

                <div className="CGLabel">
                    Total capacity
                </div>
                <div className="CGSubLabel">
                    How many people can take this gig?
                </div>
                <div className="CGInputBoxSmall">
                    <input className="CGInputText" placeholder="Capacity" type="number" value={gigDetails.capacity} onChange={(event) => handleTextInput(event, 'capacity')} />
                </div>



                <div style={{ width: '100%', height: '60px' }} />
                <div>
                    <Button type="PRIMARY" text="Create gig" forceWidth="150px" onClick={handleCreateGig} />
                </div>
                <div style={{ width: '100%', height: '10px' }} />
                <div>
                    <Button type="WHITE" text="Cancel" forceWidth="150px" />
                </div>

            </form>
            <div style={{ width: '100%', height: '100px' }} />
        </FullPage >
    )
}

export default CreateGig
