import React, { useState } from 'react'
import { animated, config, useSpring } from 'react-spring'
import { Container, Col, Row } from 'react-grid-system'
import { useHistory } from 'react-router'
import LogoGenerator from '../LogoGenerator'
import { StarFillIcon } from '@primer/octicons-react'
import LogoBox from '../../components/LogoBox'
import './profileTile.css'

function ProfileTile(props) {
    const history = useHistory()
    const { user, isWorker } = props
    const [isHovering, setIsHovering] = useState(false)
    const isReviewed = user.avgReview === -1 ? false : true

    const tileBackgroundAnimated = useSpring({
        boxShadow: isHovering ? "4px 10px 40px #00000026" : "1px 3px 5px #00000026",
        backgroundColor: isHovering ? "#FFFFFFFF" : "#FFFFFFA6",
        config: config.default
    })

    const logo = typeof user.profilePicture === 'undefined' || user.profilePicture === "" ? <LogoGenerator name={user.name} /> : <img style={{ width: '70%', height: '70%' }} src={user.profilePicture} />

    // ops
    console.log(user)
    const handleClick = () => {
        history.push("/view_profile", { userId: user.id, userType: 'worker' })
    }

    const AnimatedContainer = animated(Container)
    return (
        <div>
            <AnimatedContainer className="PLTileText" id="PLTileBackground" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} style={tileBackgroundAnimated} onClick={handleClick}>
                <Col id="PLMainColumn">
                    <Row style={{ alignSelf: 'flex-start' }}>
                        <LogoBox src={user.profilePicture} name={user.name} />
                        <Col>
                            <div id="PLProfileName">
                                {user.name}
                            </div>
                            <div id="PLProfileLocation">
                                {user.location.city}
                            </div>

                        </Col>
                    </Row>
                    <div id="PLAvgReview" style={isReviewed ? { color: '#fcba03' } : null}>
                        {isReviewed ? (
                            <div>
                                <StarFillIcon /> {'user.avgReview'}
                            </div>
                        ) : 'Not reviewed'}
                    </div>
                </Col>
            </AnimatedContainer>
        </div>
    )
}

export default ProfileTile
