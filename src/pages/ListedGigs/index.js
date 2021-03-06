import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { accessDB } from '../../database/firebase'
import FullPage from '../FullPage'
import ReactModal from 'react-modal'
import GigListingTile from '../../components/GigListingTile'
import LoadingIndicator from '../../components/LoadingIndicator'
import Button from '../../components/Button'
import { PlusIcon } from '@primer/octicons-react'
import { useHistory } from 'react-router'
import './listedGigs.css'


// TODO: add button
function ListedGigs() {
    const history = useHistory()
    const { currentUserId, currentUserDB } = useAuth()

    // data storage
    const [postedGigs, setPostedGigs] = useState([])
    const [archivedGigs, setArchivedGigs] = useState([])
    const [loading, setLoading] = useState(false)

    // TODO: move this to the firebase functions (getPostedGigsByCompany, getArchivedGigsByCompany)
    // Assumption: active gigs and posted gigs will be moved to archived gigs in 1 transaction
    const fetch = async () => {
        setLoading(true)
        const postedGigsCache = []
        const postedGigsGet = await accessDB.collection('companies').doc(currentUserId).collection('postedGigs').get()
        console.log(postedGigsGet)
        for (let i = 0; i < postedGigsGet.docs.length; i++) {
            const postedGigRef = postedGigsGet.docs[i].data()
            const postedGigGet = await postedGigRef.gig.get()
            console.log(postedGigGet.data())
            let postedGig = postedGigGet.data()
            postedGig = { ...postedGig, id: postedGigGet.id, isArchived: false, company: currentUserDB }
            postedGigsCache.push(postedGig)
        }

        const archivedGigsCache = []
        const archivedGigsGet = await accessDB.collection('companies').doc(currentUserId).collection('archivedGigs').get()
        for (let i = 0; i < archivedGigsGet.docs.length; i++) {
            const archivedGigRef = archivedGigsGet.docs[i].data()
            const archivedGigGet = await archivedGigRef.gig.get()
            let archivedGig = archivedGigGet.data()
            archivedGig = { ...archivedGig, id: archivedGigGet.id, isArchived: true, company: currentUserDB }
            archivedGigsCache.push(archivedGig)
        }

        setArchivedGigs(archivedGigsCache)
        setPostedGigs(postedGigsCache)
        setLoading(false)
    }

    useEffect(() => {
        fetch()
    }, [])

    console.log(postedGigs)
    return (
        <FullPage header="Listed gigs">
            <div style={{ width: '100%', height: '10px' }} />
            <Button type="PRIMARY" text="Create gig" icon={<PlusIcon size={16} />} onClick={() => history.push("/create_gig")} />

            <div style={{ width: '100%', height: '50px' }} />
            <div className="LGSubTitle">
                Currently listed
            </div>
            {postedGigs.map((e) => {
                console.log(e)
                const convertedParams = {
                    id: e.id,

                    // check if these need changing
                    isNew: false,
                    isGoodMatch: false,
                    isFlexible: e.isFlexible,
                    jobDesc: e.description,
                    payAmt: "S$ " + e.pay,
                    jobTitle: e.jobTitle,
                    payFor: e.unit,
                    companyName: e.company.name,
                    companyCity: e.company.location.city,
                    companyLogo: e.company.profileLogo
                }

                return (
                    <div style={{ marginRight: '16px', marginTop: '16px' }}>
                        <GigListingTile {...convertedParams} title="override" />
                    </div>
                )
            })}


            <div style={{ width: '100%', height: '50px' }} />
            <div className="LGSubTitle">
                Old
            </div>
            {archivedGigs.map((e) => {
                const convertedParams = {

                    // check if these need changing
                    isNew: false,
                    isGoodMatch: false,
                    isFlexible: e.isFlexible,
                    jobDesc: e.description,
                    payAmt: "S$ " + e.pay,
                    jobTitle: e.jobTitle,
                    payFor: e.unit,
                    companyName: e.company.name,
                    companyCity: e.company.location.city,
                    companyLogo: e.company.profileLogo
                }

                return (
                    <div style={{ marginRight: '16px', marginTop: '16px' }}>
                        <GigListingTile {...convertedParams} />
                    </div>
                )
            })}

            <div style={{ width: '100%', height: '50px' }} />
            {loading && (
                <LoadingIndicator />
            )}

            {!loading && postedGigs.length === 0 && archivedGigs.length === 0 && (
                <div>
                    You have no listed gigs!
                </div>
            )}
        </FullPage>
    )
}

export default ListedGigs
