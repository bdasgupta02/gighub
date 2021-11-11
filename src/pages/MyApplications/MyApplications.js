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

    const workersRef = await accessDB.collection("workers").get()

    workersRef.forEach(async (worker) => {
      const workerId = worker.id
      const name = worker.data().name

      const gigArr = await getWorkerAppliedGigs(workerId)
      gigArr.forEach(async (gig) => {
        if (gig.companyId.id === companyId) {
          gig['workerId'] = workerId
          gig['workerName'] = name
          // zzz
          const innerCompany = await getCompanyByRef(gig.companyId)
          gig['companyData'] = innerCompany
          temp.push(gig)
        }
      })
    })

    setGigs(temp)
  }


  useEffect(() => {

    let tempBooked = []
    if (isWorker && currentUser != null && gigs == null) {
      getWorkerAppliedGigs(currentUser.uid).then(arr => {
        arr.map(
          el => getCompanyByRef(el.companyId).then(
            compData => {
              el['companyData'] = compData;

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
