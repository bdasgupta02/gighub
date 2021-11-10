import React, { useEffect } from 'react';
import NavButton from './NavButton';
import { Container, Row, Col } from 'react-grid-system'
import {
  BrowserIcon,
  SearchIcon,
  NoteIcon,
  ChecklistIcon,
  PersonIcon,
  BellIcon,
  SignOutIcon,
  PeopleIcon,
  ListUnorderedIcon
} from '@primer/octicons-react';
import GighubLogo from "../../assets/GighubLogo"
import { useAuth } from '../../contexts/AuthContext'
import './navBar.css'
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { useState } from 'react'
import Button from '../Button'
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import NotificationList from '../NotificationList/NotificationList';


import {
  collection,
  query,
  onSnapshot,
  where
} from '@firebase/firestore';

import db from '../../database/firebase';


//https://primer.style/octicons/


// inefficient design
const NavBar = (props) => {
  const { isWorker, currentUser } = useAuth()
  const isCompany = typeof isWorker !== 'undefined' && isWorker === false
  const [notifOpen, setNotifOpen] = useState(false)
  const [reviews, setReviews] = useState([])

  const useStyles = makeStyles({
    topScrollPaper: {
      height: '1300px',
      width: '650px',
      backgroundColor: 'transparent',
    },
    dialogPaper: {
      minHeight: '30vh',
      maxHeight: '40vh',
      maxWidth: '300px'
    },
  })
  const classes = useStyles()



  const handleNotif = () => {
    console.log('notif opened')
    setNotifOpen(true);
  }

  const workerReviewSub = (workerId) => {
    let temp = []
    const q = query(collection(
      db,
      "workers" + '/' + workerId + '/' + "reviews"
    ), where('wasViewed', '==', false));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('in snapshot: ' + querySnapshot)
      querySnapshot.forEach((doc) => {
        console.log('data')
        temp.push(doc.data())

      })
      console.log("Current unviewed reviews: ", temp.join(", "))
      setReviews(temp)
    })
    // const unsub = onSnapshot(doc(db, "workers", workerId + '/' + constants.REVIEWS), (doc) => {
    //   console.log(" data in wrokerReviewSub: ", JSON.stringify(doc.data()));
    // });
  }

  useEffect(() => {
    if (currentUser != null) {
      workerReviewSub(currentUser.uid)
    }
  }, [])




  return (
    <div>
      <div className="NBBackground">

        <nav>
          <Col xs={2} justify="center" align="center">

            <Row> <Col> <GighubLogo /> </Col></Row>
            {console.log("reviews in index.js: ", reviews)}
            <Row className="NBSpacer"> </Row>

            <Row> <NavButton to="/" buttonText="Dashboard" icon={<BrowserIcon size={16} />} /> </Row>
            <Row> <NavButton to="/search_gigs" buttonText="Search gigs" icon={<SearchIcon size={16} />} /> </Row>
            {isWorker && (<Row> <NavButton to="/my_gigs" buttonText="My gigs" icon={<NoteIcon size={16} />} /> </Row>)}
            {isWorker && (<Row> <NavButton to="/my_applications" buttonText="Applications" icon={<ChecklistIcon size={16} />} /> </Row>)}
            {isCompany && (<Row> <NavButton to="/search_workers" buttonText="Workers" icon={<PeopleIcon size={16} />} /> </Row>)}
            {isCompany && (<Row> <NavButton to="/listed_gigs" buttonText="Listed gigs" icon={<ListUnorderedIcon size={16} />} /> </Row>)}
            <Row> <NavButton to="/my_profile" buttonText="Profile" icon={<PersonIcon size={16} />} /> </Row>
            <Row> <NavButton to="/notifs" buttonText="Notifications" isNotif icon={<BellIcon size={16} />} parentFunction={handleNotif} /> </Row>
            <Row> <NavButton to="/signin" buttonText="Sign-out" isSignOut icon={<SignOutIcon size={16} />} /> </Row>

          </Col>
        </nav>
        <Dialog open={notifOpen}
          onClose={(value) => { setNotifOpen(false) }}
          scroll="paper"
          classes={{
            scrollPaper: classes.topScrollPaper,
            paper: classes.dialogPaper
          }}
          BackdropProps={{ style: { backgroundColor: "transparent" } }}
        >
          <DialogContent>
            <DialogContentText>
              <NotificationList />
            </DialogContentText>
          </DialogContent>

        </Dialog>
      </div>



    </div>

  )

}
export default NavBar
