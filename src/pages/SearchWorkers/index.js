import React, { useState, useEffect } from 'react'
import FullPage from '../FullPage'
import { useHistory } from 'react-router'
import { getWorkers } from '../../database/firebaseFunctions'
import './searchWorkers.css'

function SearchWorkers() {
    const [workers, setWorkers] = useState([])

    const getDB = async () => {
        const workersData = await getWorkers()
        setWorkers(workersData)
    }

    useEffect(() => {
        getDB()
    }, [])

    console.log(workers)
    return (
        <FullPage header="Search workers">
            
        </FullPage>
    )
}

export default SearchWorkers
