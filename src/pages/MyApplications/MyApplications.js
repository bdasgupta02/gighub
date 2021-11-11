import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import ApplicationsTile from '../../components/ApplicationsTile'
import { useAuth } from '../../contexts/AuthContext'
import { getCompanyByRef, getWorkerAppliedGigs } from '../../database/firebaseFunctions'
import states from '../../enum/GigStates'
import { accessDB } from '../../database/firebase'


function MyApplications() {
    const history = useHistory()
    
    const { isWorker, currentUser } = useAuth()
    const [gigs, setGigs] = useState()

    const getApplicationsByCompanyId = async (companyId) => {
        //getWorkerAppliedGigs for all workers --> each is an array of gigs. check gig.id == gig.id in the gig.id of the company's posted gigs
        //add gig[workerId] = worker.id
        //add to temp = []
        //return that
        let temp = []
        return accessDB.collection("workers").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((workerDoc) => {
                    const workerId = workerDoc.id
                    const name = workerDoc.data().name

                    console.log('worker id in getApplicationsByComp: ' + workerId);
                    // doc.data() is never undefined for query doc snapshots
                    getWorkerAppliedGigs(workerId).then(
                        gigArr => {
                            console.log("gigARr for worker: " + workerId + " " + gigArr.length)
                            gigArr.forEach(el => {
                                if (el.companyId.id == companyId) {
                                    console.log('same company! ' + JSON.stringify(el))
                                    el['workerId'] = workerId
                                    el['workerName'] = name
                                    getCompanyByRef(el.companyId).then(
                                        compData => {
                                            el['companyData'] = compData;
                                            console.log('new el in applied gigs: ' + JSON.stringify(el))
                                            if ([states.APPLIED, states.REJECTED, states.OFFERED, states.OFFER_REJECTED].includes(el.status)) {
                                                temp.push(el)
                                                setGigs(temp)
                                            }
                                        })

                                }
                            })
                        }
                    )

                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }


    useEffect(() => {

        let tempBooked = []
        if (isWorker && currentUser != null && gigs == null) {
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
        } else if (!isWorker && currentUser != null && gigs == null) {
            getApplicationsByCompanyId(currentUser.uid)
        }
    }, [])


    return (
        <div>
            {gigs != null && console.log('appliedgigs length: ' + gigs.length)}
            <div id="HeaderTexts"> Applications</div>
            <div style={{ height: '10px' }}></div>
            {(gigs != null && gigs.length != 0 && isWorker) && gigs.map(gig =>
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

            {(gigs != null && gigs.length != 0 && !isWorker) && gigs.map(gig =>
                <ApplicationsTile jobTitle={gig.title}
                    companyName={gig.companyData.name}
                    companyLogo={gig.companyData.profilePicture}
                    companyCity={gig.companyData.location.city}
                    payAmt={gig.dailyPay}
                    payFor={(gig.endDate - gig.startDate) / 3600 / 24}
                    companyId={gig.companyId}
                    gigStatus={gig.status}
                    gigId={gig.id}
                    workerName={gig.workerName}
                    workerId={gig.workerId}
                />
            )
            }
        </div>
    )
}

export default MyApplications
