import {
  collection,
  doc,
  getDoc,
  getDocs,
  get,
  query,
  addDoc,
  setDoc,
  writeBatch,
  updateDoc,
  runTransaction,
  increment,
  onSnapshot,
  where
} from '@firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import db, { storage } from './firebase';
import * as constants from '../constants';
import { load } from 'dotenv';

/*
RETRIEVE
*/
export async function getActiveGigs() {
  const activeGigsCol = collection(db, constants.ACTIVE_GIGS);
  const activeGigsSnapshot = await getDocs(activeGigsCol);
  const activeGigsList = activeGigsSnapshot.docs.map((doc) => doc.data());

  return activeGigsList;
}

export async function getArchivedGigs() {
  const archivedGigsCol = collection(db, constants.ARCHIVED_GIGS);
  const archivedGigsSnapshot = await getDocs(archivedGigsCol);
  const archivedGigsList = archivedGigsSnapshot.docs.map((doc) => doc.data());

  return archivedGigsList;
}

//eager fetch for subcollections?
export async function getWorkers() {
  const workersCol = collection(db, constants.WORKERS);
  const workersSnapshot = await getDocs(workersCol);
  const workersList = workersSnapshot.docs.map((doc) => doc.data());

  return workersList;
}

export async function getCompanies() {
  const companiesCol = collection(db, constants.COMPANIES);
  const companiesSnapshot = await getDocs(companiesCol);
  const companiesList = companiesSnapshot.docs.map((doc) => doc.data());

  return companiesList;
}

//Skills, categoryTags and ReviewTags can use doc.id as the relevant info
export async function getSkills() {
  const skillsCol = collection(db, constants.SKILLS);
  const skillsSnapshot = await getDocs(skillsCol);
  const skillsList = skillsSnapshot.docs.map((doc) => doc.data());

  return skillsList;
}

export async function getCategoryTags() {
  const categoryTagCol = collection(db, constants.CATEGORY_TAGS);
  const categoryTagSnapshot = await getDocs(categoryTagCol);
  const categoryTagList = categoryTagSnapshot.docs.map((doc) => doc.id);

  return categoryTagList;
}

export async function getReviewTags() {
  const reviewTagCol = collection(db, constants.REVIEW_TAGS);
  const reviewTagSnapshot = await getDocs(reviewTagCol);
  const reviewTagList = reviewTagSnapshot.docs.map((doc) => doc.data().name);

  return reviewTagList;
}

/**
 *
 * @param {String} workerId id of worker as listed in db
 * @returns array of workers applied gigs
 * @usage to use need to evaluate promise using .then: const hi = getWorkerAppliedGigs('5ornuxQ4USWJujeQxXnJ');
            hi.then((data) => {console.log("hi is: " + JSON.stringify(data))});
 */
export async function getWorkerAppliedGigs(workerId) {
  const workerSubCol = collection(
    db,
    constants.WORKERS + '/' + workerId + '/' + constants.APPLIED_GIGS
  );
  const workerSubSnapshot = await getDocs(workerSubCol);
  //  console.log('workerSubSnapshot: ' + (workerSubSnapshot));
  let retArray = [];
  await Promise.all(
    workerSubSnapshot.docs.map(async (doc) => {
      //looking at indivisual gigs in AppliedGig subcollection
      let gig = doc.get('gig');
      let includedGigDoc = await getDoc(gig);
      //  console.log('IncludedGigDoc: ' + includedGigDoc); //this returns a promise.
      retArray.push(includedGigDoc.data());
      // includedGigDoc.then((x) => {
      //   console.log("x is: " + JSON.stringify(x.data()))
      //   retArray.push(x.data())

      // })
    })
  );

  return retArray;
}

export async function getWorkerArchivedGigs(workerId) {
  const workerSubCol = collection(
    db,
    constants.WORKERS + '/' + workerId + '/' + constants.ARCHIVED_GIGS
  );
  const workerSubSnapshot = await getDocs(workerSubCol);
  //  console.log('workerSubSnapshot: ' + (workerSubSnapshot));
  let retArray = [];
  await Promise.all(
    workerSubSnapshot.docs.map(async (doc) => {
      //looking at indivisual gigs in AppliedGig subcollection
      let gig = doc.get('gig');
      let includedGigData = await (await getDoc(gig)).data();
      //  console.log('IncludedGigDoc: ' + includedGigDoc); //this returns a promise.
      includedGigData['gigRef'] = gig;
      retArray.push(includedGigData);
      // includedGigDoc.then((x) => {
      //   console.log("x is: " + JSON.stringify(x.data()))
      //   retArray.push(x.data())

      // })
    })
  );
  return retArray;
}

export async function getWorkerBookedGigs(workerId) {
  const workerSubCol = collection(
    db,
    constants.WORKERS + '/' + workerId + '/' + constants.BOOKED_GIGS
  );
  const workerSubSnapshot = await getDocs(workerSubCol);
  //  console.log('workerSubSnapshot: ' + (workerSubSnapshot));
  let retArray = [];
  await Promise.all(
    workerSubSnapshot.docs.map(async (doc) => {
      //looking at indivisual gigs in AppliedGig subcollection
      let gig = doc.get('gig');
      let includedGigData = await (await getDoc(gig)).data();
      //  console.log('IncludedGigDoc: ' + includedGigDoc); //this returns a promise.
      includedGigData['gigRef'] = gig;
      retArray.push(includedGigData);
      // includedGigDoc.then((x) => {
      //   console.log("x is: " + JSON.stringify(x.data()))
      //   retArray.push(x.data())

      // })
    })
  );

  return retArray;
}

export async function getWorkerGoals(workerId) { }

export async function getWorkerReviews(workerId) { }

export async function getCompanyArchivedGigs(companyId) {
  const companySubCol = collection(
    db,
    constants.COMPANIES + '/' + companyId + '/' + constants.ARCHIVED_GIGS
  );
  const companySubSnapshot = await getDocs(companySubCol);
  console.log('companySubSnapshot: ' + companySubSnapshot);
  var companySubList = companySubSnapshot.docs.map((doc) => {
    //looking at indivisual gigs in AppliedGig subcollection
    console.log('in companySubList, each doc is: ' + doc.get('data'));
    let gig = doc.get('gig');
    console.log('gig: ' + JSON.stringify(gig));
    let includedGigDoc = getDoc(gig);
    console.log('IncludedGigDoc: ' + includedGigDoc); //this returns a promise.
    let includedGig = [];
    includedGigDoc
      .then((x) => {
        includedGig.push(x.data());
        console.log(
          'in includedGigDocs : data is : ' + JSON.stringify(x.data())
        );
      })
      .then(() => {
        console.log('getWorkerAppliedGigs: returning: ');
        console.log(includedGig);
        return includedGig;
      });
  });
  return companySubList;
}

export async function getCompanyPostedGigs(companyId) {
  let companySubCol = collection(
    db,
    constants.COMPANIES + '/' + companyId + '/' + constants.POSTED_GIGS
  );
  let companySubSnapshot = await getDocs(companySubCol);
  let retArray = [];
  // await Promise.all(companySubSnapshot.docs.map(async (doc) => {
  //   retArray.push(doc.data())
  // }));
  // // return retArray

  await Promise.all(
    companySubSnapshot.docs.map(async (data) => {
      let el = data.data();
      let gigRef = el.gig;
      let gigDoc = await getDoc(gigRef);
      let gig = gigDoc.data();
      gig['gigId'] = data.id;
      console.log(gig.gigId);
      retArray.push(gig);
    })
  );
  return retArray;
}

//untested with multiple reviews, not sure how the data will be structured
export async function getCompanyReviews(companyId) {
  let companySubCol = collection(
    db,
    constants.COMPANIES + '/' + companyId + '/' + constants.REVIEWS
  );
  let companySubSnapshot = await getDocs(companySubCol);

  //  console.log('workerSubSnapshot: ' + (workerSubSnapshot));
  let retArray = [];
  await Promise.all(
    companySubSnapshot.docs.map(async (doc) => {
      retArray.push(doc.data());
    })
  );
  // return retArray

  await Promise.all(
    retArray.map(async (el) => {
      let gigRef = el.gig;
      let gig = await getDoc(gigRef);
      let title = gig.data().title;
      console.log(title);
      el['gigTitle'] = title;
    })
  );
  return retArray;
}

/*
Subcollections:
workers: appliedGigs, bookedGigs, archivedGigs, goals, reviews? (missed in original, probably want to add)
companies: archivedGigs, postedGigs, reviews
*/

/*
CREATE
*/
//may want to change skills to string rather than references since a live reference is not very important
/**
 * @param {json_object} workerDetails should contain in json:
 * age(number),
 * avgReview(-1),
 * email(String),
 * location(String),
 * name(String),
 * password(String),
 * phone(String),
 * profilePicture(Storage link),
 * resume(Storage link),
 * skills(array of skills references)
 * numReviews(0)
 */
export async function createWorker(workerDetails) {
  await addDoc(collection(db, constants.WORKERS), workerDetails);
}

/**
 *
 * @param {json_object} companyDetails should contain in json:
 * UEN (String),
 * avgReview(-1),
 * email(String),
 * location(String),
 * name(String),
 * numReviews(0),
 * password(String),
 * phone(String),
 * profilePicture(Storage link)
 */
export async function createCompany(companyDetails) {
  const newRef = await addDoc(collection(db, constants.COMPANIES), companyDetails);
  await newRef.collection("reviews");
  await newRef.collection("archivedGigs");
  await newRef.collection("postedGigs");
}

//May want to change tags in gig to String, since having a live reference of tags is not very important
//Need to update company with reference as well, do in transaction
//untested
/**
 * @param {json_object} gigDetails should contain in json:
 * companyId(String reference incl /companies/),
 * completeBy(Timestamp)
 * contractLink(String),
 * description(String),
 * endDate(Timestamp),
 * isFlexible(Boolean),
 * isVariable(Boolean),
 * pay(Number),
 * startDate(Timestasmp),
 * tags (array of refernce string including /categoryTags/),
 * title (String),
 * unit(String)
 */
export async function createGig(gigDetails) {
  let companyId = gigDetails.companyId;
  const batch = writeBatch(db);

  const gigRef = doc(collection(db, constants.ACTIVE_GIGS));
  batch.set(gigRef, gigDetails);

  let gigId = gigRef.id;
  const companyRef = doc(db, companyId, constants.POSTED_GIGS + '/' + gigId);
  // const companyRef = doc(
  //   db,
  //   companyId + '/' + constants.POSTED_GIGS,
  //   gigId
  // );
  batch.set(companyRef, gigRef);

  await batch.commit();
  //await addDoc(collection(db, constants.ACTIVE_GIGS), gigDetails);
}

/**
 * @param {json_object} categoryTagDetails should contain in json:
 * name(String)
 */
export async function createCategory(categoryTagDetails) {
  await setDoc(
    doc(db, constants.CATEGORY_TAGS, categoryTagDetails.name),
    categoryTagDetails
  );
}

/**
 * @param {json_object} reviewTagDetails should contain in json:
 * name(String)
 */
export async function createReviewTag(reviewTagDetails) {
  await setDoc(
    doc(db, constants.REVIEW_TAGS, reviewTagDetails.name),
    reviewTagDetails
  );
}

/**
 * @param {json_object} skillDetails should contain in json:
 * name(String)
 */
export async function createSkill(skillDetails) {
  await setDoc(doc(db, constants.SKILLS, skillDetails.name), skillDetails);
}

/**
 * While not enforced in db function, enforce that the uploaded file is actually a picture file.
 * https://roufid.com/javascript-check-file-image/ shows how to check for images in general or a specific image type (may want to limit it to jpeg, png, svg)
 * May want to limit file size as well.
 * uuidv4() used to ensure that there is no duplicate reference name
 * @param {File} picture a File, preferably of an image type. No error will be thrown even if the file is not an image type.
 * @returns {Promise<String>} the download link (in HTTPS:// format) to be stored as a String in firestore
 */
export async function createProfilePicture(picture) {
  let picName = picture.name + uuidv4();
  const storageRef = ref(storage, 'profile_pics/' + picName);

  let upload = await uploadBytes(storageRef, picture);
  let dlURL = getDownloadURL(upload.ref);

  return dlURL;
}

/**
 * While not enforced in db function, should enforce the uploaded file is actually a document type.
 * @param {File} resume a File, preferably of pdf type. No error will be thrown even if the file is not a pdf.
 * @returns {Promise<String>} the download link (in HTTPS:// format) to be stored as a String in firestore
 */
export async function createResume(resume) {
  let resumeName = resume.name + uuidv4();
  const storageRef = ref(storage, 'resumes/' + resumeName);

  let upload = await uploadBytes(storageRef, resume);
  let dlURL = getDownloadURL(upload.ref);
  return dlURL;
}

/*
UPDATE
*/
/**
 *
 * @param {json_object} newCompanyDetails json object with at minimum requires companyId as field id.
 * Other fields can simply include fields which require updates. Non-updated fields may be excluded
 */
export async function updateCompanyDetails(newCompanyDetails) {
  const companyRef = doc(db, constants.COMPANIES, newCompanyDetails.id);
  await updateDoc(companyRef, newCompanyDetails);
}

/**
 * Only updates active gigs (updating archived gigs may require separate function)
 * @param {json_object} newGigDetails json object with at minimum requires gigId as field id.
 * Other fields can simply include fields which require updates. Non-updated fields may be excluded
 */
export async function updateGigDetails(newGigDetails) {
  const gigRef = doc(db, constants.ACTIVE_GIGS, newGigDetails.id);
  await updateDoc(gigRef, newGigDetails);
}

/**
 *
 * @param {json_object} newWorkerDetails json object with at minimum requires worker Id as field id.
 * Other fields can simply include fields which require updates. Non-updated fields may be excluded
 */
export async function updateWorkerDetails(newWorkerDetails) {
  const workerRef = doc(db, constants.WORKERS, newWorkerDetails.id);
  await updateDoc(workerRef, newWorkerDetails);
}
/*
DELETE
need to decide on how to handle deletions. i.e. if skills/tags are kept as references there would need to be handling of referencing issues to prevent null references
decided as marked for deletion. 
*/

export async function deleteCompany(companyId) { } //need to decide on how to handle deleted companies.
export async function deleteGig(gigId) { } //point at archiveGig?
export async function deleteWorker(workerId) { } //need to decide on how to handle deleted workers.

/*
FUNCTIONAL
Meant to facilitate specific functionality with a lower usage
*/

export async function getActiveGig(gigId) {
  let gigRef = doc(db, constants.ACTIVE_GIGS, gigId);
  let gigDoc = await getDoc(gigRef);

  let gig = [];
  gig.push(gigDoc.data());

  return gig;
}

export async function getArchivedGig(gigId) {
  let gigRef = doc(db, constants.ARCHIVED_GIGS, gigId);
  let gigDoc = await getDoc(gigRef);

  let gig = [];
  gig.push(gigDoc.data());

  return gig;
}

export async function getWorker(workerId) {
  let workerRef = doc(db, constants.WORKERS, workerId);
  let workerDoc = await getDoc(workerRef);

  let worker = [];
  worker.push(workerDoc.data());

  return worker;
}

export async function getCompany(companyId) {
  let companyRef = doc(db, constants.COMPANIES, companyId);
  let companyDoc = await getDoc(companyRef);

  let company = [];
  company.push(companyDoc.data());

  return company;
}

export async function getCompanyByRef(companyRef) {
  return (await getDoc(companyRef)).data();
  //  console.log('IncludedGigDoc: ' + includedGigDoc); //this returns a promise.
}

/**
 *
 * @param {String} workerId id of worker as listed in db
 * @param {Array<String>} skills array of skills to be added
 */
export async function addSkillsToWorker(workerId, skills) {
  let workerRef = doc(db, constants.WORKERS, workerId);
  let workerDoc = await getDoc(workerRef);

  let oldSkills = workerDoc.get('skills');
  oldSkills.push(skills);

  await updateDoc(workerRef, {
    skills: oldSkills,
  });
}

export async function removeSkillsFromWorker(workerId, skills) {
  let workerRef = doc(db, constants.WORKERS, workerId);
  let workerDoc = await getDoc(workerRef);

  let oldSkills = workerDoc.get('skills');
  let newSkills = oldSkills.filter((x) => {
    return !skills.includes(x);
  });

  await updateDoc(workerRef, {
    skills: newSkills,
  });
}

/**
 *
 * @param {json_object} reviewDetails reviewDetails should contain in json:
 * date(Date),
 * gig(reference as /activeGigs/gigId or /archivedGigs/gigId. However, reviewing archived gigs should be rare),
 * numStars(Number)
 * reviewTags(array of references as /reviewTags/reviewTagId)
 * textReview(String)
 * @param {String} companyId id of company as listed in database
 */
export async function createCompanyReview(reviewDetails, companyId) {
  try {
    console.log('creating review for companyId: ' + companyId)
    const companyDocRef = doc(db, constants.COMPANIES, companyId);
    console.log("company ref: " + companyDocRef)
    const companyDoc = await getDoc(companyDocRef);
    if (!companyDoc.exists()) {
      throw 'Document does not exist!';
    }
    const reviewRef = collection(db, constants.COMPANIES, companyId + '/' + constants.REVIEWS);
    let companyData = companyDoc.data();
    let oldNumReviews = companyData.numReviews;
    let oldAvg = companyData.avgReview;
    let newAvgReviews;
    let newNumReviews;

    if (oldNumReviews == 0 && oldAvg < 0) {
      newAvgReviews = reviewDetails.numStars;
      newNumReviews = 1 * 1;
    } else if (oldNumReviews != 0 && oldAvg >= 0) {
      newAvgReviews = oldAvg + reviewDetails.numStars;
      newNumReviews = oldNumReviews * 1 + 1;
    } else {
      throw new Error('Error in recorded review scores stored in database!');
    }

    await updateDoc(companyDocRef, { avgReview: newAvgReviews, numReviews: increment(1) });
    await addDoc(reviewRef, reviewDetails);
    //console.log('Transaction successfully committed!');
  } catch (e) {
    console.log('Transaction failed: ', e);
  }
}

/**
 *
 * @param {json_object} reviewDetails reviewDetails should contain in json:
 * date(Date),
 * gig(reference as /activeGigs/gigId or /archivedGigs/gigId. However, reviewing archived gigs should be rare),
 * numStars(Number)
 * reviewTags(reference as /reviewTags/reviewTagId)
 * textReview(String)
 * @param {String} workerId workerID as listed in db
 */
export async function createWorkerReview(reviewDetails, workerId) {
  try {
    await runTransaction(db, async (transaction) => {
      let workerDocRef = doc(db, constants.WORKERS, workerId);
      let workerDoc = await transaction.get(workerDocRef);
      if (!workerDoc.exists()) {
        throw new Error('Document does not exist!');
      }
      let reviewRef = doc(
        collection(db, constants.WORKERS, workerId + '/' + constants.REVIEWS)
      );
      let workerData = workerDoc.data();
      let oldNumReviews = workerData.numReviews;
      let oldAvg = workerData.avgReview;
      let newAvgReviews;
      let newNumReviews;

      if (oldNumReviews === 0 && oldAvg < 0) {
        newAvgReviews = reviewDetails.numStars;
        newNumReviews = 1;
      } else if (oldNumReviews !== 0 && oldAvg >= 0) {
        newAvgReviews = oldAvg + reviewDetails.numStars;
        newNumReviews = oldNumReviews * 1 + 1;
      } else {
        throw new Error('Error in recorded review scores stored in database!');
      }

      transaction.update(workerDocRef, { avgReview: newAvgReviews });
      transaction.update(workerDocRef, { numReviews: newNumReviews });
      transaction.set(reviewRef, reviewDetails);
    });
    console.log('Transaction successfully committed!');
  } catch (e) {
    console.log('Transaction failed: ', e);
  }
}

//still untested, incl compile test
export async function archiveGig(gigId) {
  let batch = writeBatch(db);
  let hiredColSnapshot = await getDocs(
    collection(db, constants.ACTIVE_GIGS, gigId + '/' + constants.HIRED)
  );
  let appliedColSnapshot = await getDocs(
    collection(db, constants.ACTIVE_GIGS, gigId + '/' + constants.APPLICANTS)
  );
  let oldGigRef = doc(db, constants.ACTIVE_GIGS, gigId);
  let newGigRef = doc(db, constants.ARCHIVED_GIGS, gigId);
  let gig = await getDoc(oldGigRef);
  let gigData = gig.data();

  //copy main document
  batch.set(newGigRef, gigData);

  //copy hired subscollection
  hiredColSnapshot.forEach((document) => {
    //console.log(doc.id + " contains: " + doc.data());
    let workerDocRefString =
      document.get(constants.GIG_WORKER) + '/' + constants.BOOKED_GIGS;
    let workerDocRef = doc(db, workerDocRefString, gigId);
    let workerGigRef = getDoc(workerDocRef).get('gig');
    let newGigRef = workerGigRef.replace(
      '/' + constants.ACTIVE_GIGS + '/',
      '/' + constants.ARCHIVED_GIGS + '/'
    );
    batch.update(workerDocRef, { gig: newGigRef });
  });

  //copy applied subcollection
  appliedColSnapshot.forEach((document) => {
    //console.log(doc.id + " contains: " + doc.data());
    let workerDocRefString =
      document.get(constants.GIG_WORKER) + '/' + constants.BOOKED_GIGS;
    let workerDocRef = doc(db, workerDocRefString, gigId);
    let workerGigRef = getDoc(workerDocRef).get('gig');
    let newGigRef = workerGigRef.replace(
      '/' + constants.ACTIVE_GIGS + '/',
      '/' + constants.ARCHIVED_GIGS + '/'
    );
    batch.update(workerDocRef, { gig: newGigRef });
  });

  //delete old gig
  batch.delete(oldGigRef);
  //forEach in gig's hired list, change /constants.ACTIVE_GIG/ reference to /constants.ARCHIVED_GIG/
  //forEach in gig's application list, change /constants.ACTIVE_GIG/ reference to /constants.ARCHIVED_GIG/
}
//will need to transact references in workers and companies

export async function applyToGig(gigId, workerId) {
  let batch = writeBatch(db);
  let inGigRef = doc(
    db,
    constants.ACTIVE_GIGS,
    gigId + '/' + constants.APPLICANTS + '/' + workerId
  );
  let gigRef = doc(db, constants.ACTIVE_GIGS, gigId);
  let inWorkerRef = doc(
    db,
    constants.WORKERS,
    workerId + '/' + constants.APPLIED_GIGS + '/' + gigId
  );
  let workerRef = doc(db, constants.WORKERS, workerId);

  let currentDate = new Date();

  let gigData = {
    gig: gigRef,
    dateApplied: currentDate,
    status: 'pending',
  };

  let workerData = {
    worker: workerRef,
  };

  batch.set(inWorkerRef, gigData);
  batch.set(inGigRef, workerData);
  //batch add to worker's applied gig
  //batch add to gig's application list

  //batch update. Add gig to worker's appliedGigs ref, add worker to appliedGigs subcoll?
}

//untested, no compile error
export async function hireWorker(gigId, workerId) {
  let batch = writeBatch(db);
  let currentDate = new Date();

  let gigMainRef = doc(db, constants.ACTIVE_GIGS, gigId);
  let gigMainDoc = await getDoc(gigMainRef);
  let numSpots = gigMainDoc.get('numSpots');
  let numHired = gigMainDoc.get('numHired');

  if (numHired >= numSpots) {
    console.log('attempting to hire above amount of spots');
  } else {
    let workerOldRef = doc(
      db,
      constants.WORKERS,
      workerId + '/' + constants.APPLIED_GIGS + '/' + gigId
    );
    let workerNewRef = doc(
      db,
      constants.WORKERS,
      workerId + '/' + constants.BOOKED_GIGS + '/' + gigId
    );
    let workersGig = await getDoc(workerOldRef);

    let gigOldRef = doc(
      db,
      constants.ACTIVE_GIGS,
      gigId + '/' + constants.APPLICANTS + '/' + workerId
    );
    let gigNewRef = doc(
      db,
      constants.ACTIVE_GIGS,
      gigId + '/' + constants.HIRED + '/' + workerId
    );
    let gigsWorker = await getDoc(gigOldRef);

    batch.set(workerNewRef, workersGig.data());
    batch.set(workerNewRef, { dateHired: currentDate });
    batch.delete(workerOldRef);

    batch.set(gigNewRef, gigsWorker.data());
    batch.delete(gigOldRef);

    let newNumSpots = numSpots * 1 + 1;
    batch.set(gigMainRef, { numHired: newNumSpots });

    if (numSpots === newNumSpots) {
      let gigApplicantColRef = collection(
        db,
        constants.ACTIVE_GIGS,
        gigId + '/' + constants.APPLICANTS
      );
      let gigApplicantCol = await getDocs(gigApplicantColRef);
      gigApplicantCol.forEach((applicant) => {
        let applicantId = applicant.id;
        let applicationRef = doc(
          db,
          constants.WORKERS,
          applicantId + '/' + constants.APPLIED_GIGS + '/' + gigId
        );
        batch.set(applicationRef, { status: 'denied' });
      });
    }
  }
  //batch remove + add: remove from worker's applied, add to worker's bookedGig
  //batch remove + add: remove from gig's application list, add to gig's hired
  //batch update: +1 to gig's taken spots
  //if gig's new taken spots = gig's total spots, batch update for each still in application to rejected
}

export async function deleteWorkerProfilePicture(workerId) {
  let workerDetails = {
    id: workerId,
    profilePicture: ''
  }
  updateWorkerDetails(workerDetails);
}

/*
HELPER FUNCTIONS
*/


/*
NOTIFICATION FUNCTIONS
*/

export const workerAppliedGigsSubscription = (workerId) => {
  const q = query(collection(
    db,
    constants.WORKERS + '/' + workerId + '/' + constants.APPLIED_GIGS
  ));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const cities = [];
    querySnapshot.forEach((doc) => {
      cities.push(doc.data());
    });
    console.log("Current cities in CA: ", cities.join(", "));
  });
}

export const workerReviewSub = (workerId) => {
  let reviews = []
  const q = query(collection(
    db,
    constants.WORKERS + '/' + workerId + '/' + constants.REVIEWS
  ), where('wasViewed', '==', false));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {

    querySnapshot.forEach((doc) => {
      reviews.push(doc.data())
    })
    console.log("Current unviewed reviews: ", reviews.join(", "))
  })
  return unsubscribe
  // const unsub = onSnapshot(doc(db, "workers", workerId + '/' + constants.REVIEWS), (doc) => {
  //   console.log(" data in wrokerReviewSub: ", JSON.stringify(doc.data()));
  // });
}

export const companyReviewSub = (companyId) => {
  let reviews = []
  const q = query(collection(
    db,
    constants.COMPANIES + '/' + companyId + '/' + constants.REVIEWS
  ), where('wasViewed', '==', false));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {

    querySnapshot.forEach((doc) => {
      reviews.push(doc.data())
    })
    console.log("Current unviewed reviews: ", reviews.join(", "))
  })
  return unsubscribe
  // const unsub = onSnapshot(doc(db, "workers", workerId + '/' + constants.REVIEWS), (doc) => {
  //   console.log(" data in wrokerReviewSub: ", JSON.stringify(doc.data()));
  // });
}