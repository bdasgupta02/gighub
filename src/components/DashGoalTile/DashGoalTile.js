import { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import { PencilIcon, TrashIcon } from '@primer/octicons-react'

import './dashGoalTile.css'

const DashGoalTile = (props) => {
    let goalNo = "1"
    let goalDetails = "Hustle for $200 this month"
    let goalDeadline = "20/10/2021"

    const [isHovering, setIsHovering] = useState(false)

    const tileBackgroundAnimated = useSpring({
        boxShadow: isHovering ? "4px 10px 40px #00000026" : "1px 3px 1px #00000026",
        backgroundColor: isHovering ? "#FFFFFFFF" : "#FFFFFFA6",
        config: config.default
    })

    const AnimatedContainer = animated(Container)
    return (<AnimatedContainer className="DashLTileText" id="DashLDashTileBackground" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} style={tileBackgroundAnimated}>
        <Col id="DashLMainColumn">
            <Row className="DashLGoalRow">
                <div id="DashLGoalNo">
                    #{goalNo}
                </div>
            </Row>
            <Row className="DashLGoalRow">
                <div id="DashLGoalDetails">
                    {goalDetails}
                </div>
            </Row>
            <Row className="DashLGoalRow" id="DashLBottomRow">
                <div id="DashLGoalDeadline">
                    Achieve by {goalDeadline}
                </div>
                <Col>
                    <div id="DashLGoalOptions">
                        <span className="DashLButtons">
                            <PencilIcon size={18} />
                        </span>
                        <span className="DashLButtons">
                            <TrashIcon size={18} />
                        </span>
                    </div>
                </Col>
            </Row>
        </Col>
    </AnimatedContainer>)
}

export default DashGoalTile