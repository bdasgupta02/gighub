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
} from '@firebase/firestore';
import React, { useState } from 'react';
import db from './firebase';
import * as constants from '../constants';

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
  const skillsList = skillsSnapshot.docs.map((doc) => doc.id);

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
  const reviewTagList = reviewTagSnapshot.docs.map((doc) => doc.id);

  return reviewTagList;
}

/*
STILL NOT WORKING AS INTENDED
Displayed functions as per documentation do not seem to work
*/
export async function getWorkerAppliedGigs(workerId) {
  const workerSubCol = collection(
    db,
    constants.WORKERS + '/' + workerId + '/' + constants.ARCHIVED_GIGS
  );
  const workerSubSnapshot = await getDocs(workerSubCol);
  //console.log("pre-call");
  const workerSubList = workerSubSnapshot.docs.map((doc) => {
    let gig = doc.get('gig');
    let includedGigDoc = getDoc(gig);
    let includedGig = includedGigDoc.then((x) => x.data());

    console.log('map return');
    console.log(includedGig);

    return includedGig;
    //includedGig contains correct promise, but when returned to workerSubList the resulting array does not correctly display. Likely an issue with mapping into a promise?
  });

  console.log(workerSubList);

  return workerSubList;
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
    await addDoc(collection(db, constants.COMPANIES), companyDetails);
}

//May want to change tags in gig to String, since having a live reference of tags is not very important
//Need to update company with reference as well, do in transaction
//untested
/**
 * @param {json_object} gigDetails should contain in json:
 * companyId(String),
 * contractLink(String),
 * dailyPay(number),
 * description(string),
 * endDate(TimeStamp),
 * endDeliverable(String),
 * isFlexible(boolean),
 * startDate(TimeStamp),
 * tags(array of tag references),
 * title(String),
 * totalPay(number)
 */
export async function createGig(gigDetails) {
  let companyId = gigDetails.companyId;
  const batch = writeBatch(db);

  const gigRef = doc(collection(db, constants.ACTIVE_GIGS));
  batch.set(gigRef, gigDetails);

  let gigId = gigRef.id;
  const companyRef = doc(db, constants.COMPANIES + '/' + companyId + '/' + constants.POSTED_GIGS, gigId);
  batch.set(companyRef, gigRef);

  await batch.commit();
  //await addDoc(collection(db, constants.ACTIVE_GIGS), gigDetails);
}

/**
 * @param {json_object} categoryTagDetails should contain in json:
 * name(String)
 */
export async function createCategory(categoryTagDetails) {
  await setDoc(doc(db, constants.CATEGORY_TAGS, categoryTagDetails.name), categoryTagDetails)
}

/**
 * @param {json_object} reviewTagDetails should contain in json:
 * name(String)
 */
export async function createReviewTag(reviewTagDetails) {
    await setDoc(doc(db, constants.REVIEW_TAGS, reviewTagDetails.name), reviewTagDetails)
}

/**
 * @param {json_object} skillDetails should contain in json:
 * name(String)
 */
export async function createSkill(skillDetails) {
    await setDoc(doc(db, constants.SKILLS, skillDetails.name), skillDetails);
}

export async function createReview(reviewDetails) {
    //requires transactions to update relevant user or company
    //update user's numReviews and avgReview(technically total review score)
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
    const companyRef = doc(db, constants.COMPANIES, newCompanyDetails.id)
    await updateDoc(companyRef, newCompanyDetails);
}

/**
 * Only updates active gigs (updating archived gigs may require separate function)
 * @param {json_object} newGigDetails json object with at minimum requires gigId as field id. 
 * Other fields can simply include fields which require updates. Non-updated fields may be excluded
 */
export async function updateGigDetails(newGigDetails) {
    const gigRef = doc (db, constants.ACTIVE_GIGS, newGigDetails.id);
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
//maybe want to update worker skills separately?
export async function archiveGig(gigId) {

}
//will need to transact references in workers and companies

/*
DELETE
need to decide on how to handle deletions. i.e. if skills/tags are kept as references there would need to be handling of referencing issues to prevent null references
*/

export async function deleteCompany(companyId) {} //need to decide on how to handle deleted companies. 
export async function deleteGig(gigId) {} //point at archiveGig?
export async function deleteWorker(workerId) {} //need to decide on how to handle deleted workers.
