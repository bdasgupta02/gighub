import React, { useCallback, useEffect, useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import Highlight from './Highlight'
import LogoGenerator from '../LogoGenerator';
import './createReviewTile.css'
import ReviewStars from '../ReviewStars';
import * as fbFunctions from '../../database/firebaseFunctions';
import LoadingIndicator from '../LoadingIndicator'
import Button from '../Button'
import Multiselect from 'multiselect-react-dropdown';
import { getAuth } from "firebase/auth";


const CreateReviewTile = (props) => {
    //props: onCloseFunction --> sets parent state to closed
    const [isHovering, setIsHovering] = useState(false)
    const [gig, setGig] = useState();
    // go to company  --> add review with attribute 'gig': gigRef
    //reviewDetails --> reviewerId, textReview, numStars, reviewTags (array of strings. fetch strings from DB), date, gigRef

    // placeholders for now:
    let gigRef = props.gigRef ?? null;
    const companyId = props.companyId;
    let gigTitle = props.gigTitle ?? 'Gift Packer'
    let rating = props.rating ?? 2

    const [allTags, setAllTags] = useState([])
    const [reviewerId, setReviewerId] = useState()
    const [textReview, setTextReview] = useState()
    const [numStars, setNumStars] = useState(0)
    const [selectedTags, setSelectedTags] = useState([])
    const [date, setDate] = useState()
    const [loading, setLoading] = useState()
    const [submitError, setSubmitError] = useState()
    const [selectedHighlight, setSelectedHighlight] = useState()
    const [user, setUser] = useState()
    const auth = getAuth();


    const tileBackgroundAnimated = useSpring({
        boxShadow: isHovering ? "4px 10px 40px #00000026" : "1px 3px 5px #00000026",
        backgroundColor: isHovering ? "#FFFFFFFF" : "#FFFFFFA6",
        config: config.default
    })


    const AnimatedContainer = animated(Container)

    useEffect(() => {
        if (allTags.length == 0) {
            let temp = []
            fbFunctions.getReviewTags().then(data =>
                setAllTags(data)) //["tag1" , "tag2"]
        }

        if (user == null) {
            setUser(auth.currentUser)
            //user.uid to get user id
        }

    }, [])


    const onSelect = (selectedList, selectedItem) => {
        console.log("selectedList in onSelect: " + selectedList)
        setSelectedTags(selectedList)
        setSelectedHighlight(selectedList.map(data => (<div>
            <Highlight text={data} />
        </div>)))

    }

    const onRemove = (selectedList, removedItem) => {
        console.log("selectedList in onRemove: " + selectedList)
        setSelectedTags(selectedList)
        setSelectedHighlight(selectedList.map(data => (<div>
            <Highlight text={data} />
        </div>)))

    }

    const handleTextChange = (event) => {
        setTextReview(event.target.value)
        setSubmitError('')
    }

    const handleSubmit = useCallback(async event => {
        setLoading(true);
        if (textReview === null || numStars === 0) {
            setSubmitError('Error: empty fields!')
            setLoading(false)
        } else {
            event.preventDefault()
            try {
                //reviewDetails --> reviewerId, textReview, numStars, reviewTags (array of strings. fetch strings from DB), date, gigRef

                let review = {
                    "reviewerId": user.uid,
                    "textReview": textReview,
                    "numStars": numStars,
                    "reviewTags": selectedTags,
                    "date": new Date(),
                    "wasViewed": false,
                    "gig": gigRef
                }
                console.log("company id being passed: " + companyId);
                await fbFunctions.createCompanyReview(review, companyId)
                //REDIRECT
                setSubmitError("Successfully reviewed company!")
                setLoading(false)
            } catch (e) {
                if (e.message.includes('user-not-found')) {
                    setSubmitError('Sign-in failed: Email does not exist!')
                } else {
                    setSubmitError('Reviewing failed: ' + e)
                }
                setLoading(false)
            }
        }
    }
    )


    return (

        <div>

            <form onSubmit={() => { }} style={{ width: '100%' }}>
                <Container id="SignInFormat">
                    <Row id="TitleText">
                        Add Your Review
                </Row>
                    <Row>

                        <Multiselect
                            options={allTags} // Options to display in the dropdown
                            isObject={false}
                            onRemove={onRemove}
                            onSearch={function noRefCheck() { }}
                            onSelect={onSelect}
                            selectionLimit={3}
                        />
                    </Row>
                    <div className="Spacer" />
                    <Row>
                        {selectedHighlight}
                    </Row>
                    <Row>
                        <input
                            className="InputText"
                            type="text"
                            placeholder="Write your review here..."
                            onChange={handleTextChange} value={textReview}
                            style={{ height: '400px' }}
                        />
                    </Row>
                    <Row>
                        <ReviewStars isEditing={true} parentFunction={(el) => { setNumStars(el) }} />
                        {numStars}
                    </Row>
                    <div className="SpacerBig" />
                    <Row>
                        <Button text="Submit" onClick={handleSubmit} type="PRIMARY" forceWidth="120px" />
                    </Row>
                    <div className="Spacer" />
                    {loading && <LoadingIndicator />}
                    {submitError != null ? (
                        <Row id="ErrorText">
                            {submitError}
                        </Row>
                    ) : null}
                    <div className="SpacerChin" />
                </Container>
            </form>
        </div>
    )

}

export default CreateReviewTile



