import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import ApplicationsTile from '../../components/ApplicationsTile'
import { useAuth } from '../../contexts/AuthContext'
import { getCompanyByRef, getWorkerAppliedGigs } from '../../database/firebaseFunctions'
import states from '../../enum/GigStates'
import { accessDB } from '../../database/firebase'


function MyApplications() {
  const history = useHistory()

  const { isWorker, currentUser, currentUserId } = useAuth()
  const [gigs, setGigs] = useState()

  const getApplicationsByCompanyId = async (companyId) => {
    //getWorkerAppliedGigs for all workers --> each is an array of gigs. check gig.id == gig.id in the gig.id of the company's posted gigs
    //add gig[workerId] = worker.id
    //add to temp = []
    //return that
    let temp = []

    
    const workersRef = await accessDB.collection("workers").get()
    for (let i = 0; i < workersRef.docs.length; i++) {
      console.log("i " + i + ", reflength: " +  workersRef.docs.length)
        const workerDetails = { workerId: workersRef.docs[i].id, workerName: workersRef.docs[i].data().name }
        const appliedGigsRef = await accessDB.collection('workers').doc(workersRef.docs[i].id).collection('appliedGigs').get()
        for (let j = 0; j < appliedGigsRef.docs.length; j++) {
            let gig = appliedGigsRef.docs[j].data()

            const innerGig = await gig.gig.get()

            let innerGigData = innerGig.data()
            console.log("j " + j + ", reflength: " + appliedGigsRef.docs.length)

            if (innerGigData.companyId.id === companyId) {
                const inCompany = await accessDB.collection('companies').doc(companyId).get()
                const inCompanyData = inCompany.data()
                gig = { ...gig, ...innerGigData, id: innerGig.id, workerId: workerDetails.workerId, workerName: workerDetails.workerName, companyData: inCompanyData }
                temp.push(gig)
            }
        }
    }




    // workersRef.forEach(async (worker) => {
    //   const workerId = worker.id
    //   const name = worker.data().name

    //   const gigArr = await getWorkerAppliedGigs(workerId)
    //   gigArr.forEach(async (gig) => {
    //     if (gig.companyId.id === companyId) {
    //       gig['workerId'] = workerId
    //       gig['workerName'] = name
    //       // zzz
    //       const innerCompany = await getCompanyByRef(gig.companyId)
    //       gig['companyData'] = innerCompany
    //       temp.push(gig)
    //     }
    //   })
    // })

    setGigs(temp)
  }

  const fetchWorkerGigs = async () => {
    let temp = []
    const workerRefGet = await accessDB.collection('workers').doc(currentUserId).collection('appliedGigs').get()
    for (let i = 0; i < workerRefGet.docs.length; i++) {
      const gigGet = await workerRefGet.docs[i].data().gig.get()
      let gig = gigGet.data()
      const companyGet = await gig.companyId.get()

      gig = { ...gig, id: workerRefGet.docs[i].id, companyData: companyGet.data(), status: workerRefGet.docs[i].data().status }
      temp.push(gig)
    }
    console.log(temp)
    setGigs(temp)
  }


  useEffect(() => {

    let tempBooked = []
    if (isWorker && currentUser != null && gigs == null) {

      fetchWorkerGigs()



      // getWorkerAppliedGigs(currentUser.uid).then(arr => {
      //     arr.map(
      //         el => getCompanyByRef(el.companyId).then(
      //             compData => {
      //                 el['companyData'] = compData;

      //                 if ([states.APPLIED, states.REJECTED, states.OFFERED, states.OFFER_REJECTED].includes(el.status)) {
      //                     tempBooked.push(el)
      //                     setGigs(tempBooked)
      //                 }
      //             }))

      //     //   console.log("after setting: " + tempBooked);
      // }

      //)
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
          payAmt={'S$' + gig.pay}
          payFor={gig.unit}
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
          payAmt={'S$' + gig.pay}
          payFor={gig.unit}
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
