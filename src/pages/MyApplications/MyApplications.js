import React, { useEffect, useState } from 'react'
import ApplicationsTile from '../../components/ApplicationsTile'
import { useAuth } from '../../contexts/AuthContext'
import { getCompanyByRef, getWorkerAppliedGigs } from '../../database/firebaseFunctions'
import states from '../../enum/GigStates'

function MyApplications() {

    const { isWorker, currentUser } = useAuth()
    const [gigs, setGigs] = useState()


    useEffect(() => {

        let tempBooked = []
        if (isWorker != null && currentUser != null && gigs == null) {
            getWorkerAppliedGigs(currentUser.uid).then(arr => {
                arr.map(
                    el => getCompanyByRef(el.companyId).then(
                        compData => {
                            el['companyData'] = compData;
                            console.log('new el in applied gigs: ' + JSON.stringify(el))
                            if ([states.APPLIED, states.REJECTED, states.OFFERED, states.OFFER_REJECTED].includes(el.status)) {
                                tempBooked.push(el)
                                setGigs(tempBooked)
                            }
                        }))

                //   console.log("after setting: " + tempBooked);
            }

            )

        }
    }, [])


    return (
        <div>
            {gigs != null && console.log('appliedgigs length: ' + gigs.length)}
            <div id="HeaderTexts"> Applications</div>
            <div style={{ height: '10px' }}></div>
            {(gigs != null && gigs.length != 0) && gigs.map(gig =>
                <ApplicationsTile jobTitle={gig.title}
                    companyName={gig.companyData.name}
                    companyLogo={gig.companyData.profilePicture}
                    companyCity={gig.companyData.location.city}
                    payAmt={gig.dailyPay}
                    payFor={(gig.endDate - gig.startDate) / 3600 / 24}
                    companyId={gig.companyId}
                    gigStatus={gig.status}
                    gigId={gig.id}
                />
            )
            }
        </div>
    )
}

export default MyApplications
