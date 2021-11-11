import React, { useState, useEffect } from 'react'
import FullPage from '../FullPage'
import { useHistory } from 'react-router'
import { getWorkers } from '../../database/firebaseFunctions'
import ProfileTile from '../../components/ProfileTile'
import { SearchIcon } from '@primer/octicons-react'
import { createFilter } from 'react-search-input'
import { Row, Col } from 'react-grid-system'
import LoadingIndicator from '../../components/LoadingIndicator'
import { accessDB } from '../../database/firebase'
import * as constants from '../../constants'
import './searchWorkers.css'

function SearchWorkers() {
    const [workers, setWorkers] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')

    const getDB = async () => {
        setLoading(true)
        let workerCache = []
        const workerRef = await accessDB.collection(constants.WORKERS).get()
        for (let i = 0; i < workerRef.docs.length; i++) {
            let worker = workerRef.docs[i].data()
            worker = { ...worker, id: workerRef.docs[i].id }
            console.log(worker)
            workerCache.push(worker)
        }
        console.log(workerRef.docs)
        

        setWorkers(workerCache)
        setLoading(false)
    }

    useEffect(() => {
        getDB()
    }, [])

    // filtering
    // TODO: check nested keys
    const keysToFilter = ["name", "email", "location"]
    let finalWorkers = []
    if (searchText === '') {
        finalWorkers = workers
    } else {
        finalWorkers = workers.filter(createFilter(searchText, keysToFilter))
    }

    console.log(finalWorkers)
    return (
        <FullPage header="Search workers">

            <div style={{ width: '100%', height: '50px'}} />
            <Row style={{ width: '100%', marginLeft: '15px', }}>
                <Row id="SWSearchTextBox">
                    <form>
                        <input value={searchText} onChange={event => setSearchText(event.target.value)} id="SWSearchText" placeholder="Search workers" />
                    </form>
                    <div id="SWSearchIconBox" className="SWIconBox">
                        <SearchIcon size="small" fill="#9E9E9E" />
                    </div>
                </Row>
            </Row>

            <div style={{ width: '100%', height: '65px'}} />
            {finalWorkers.map((e) => (
                <div style={{ marginRight: '16px', marginTop: '16px', width: 'fit-content' }}>
                    <ProfileTile user={e} isWorker />
                </div>
            ))}
            {loading && <LoadingIndicator />}
        </FullPage>
    )
}

export default SearchWorkers
