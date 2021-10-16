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
    return (<AnimatedContainer className="TileText" id="DashTileBackground" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} style={tileBackgroundAnimated}>
        <Col id="MainColumn">
            <Row>
                <div id="GoalNo">
                    #{goalNo}
                </div>
            </Row>
            <Row>
                <div id="GoalDetails">
                    {goalDetails}
                </div>
            </Row>
            <Row id="BottomRow">
                <div id="GoalDeadline">
                    Achieve by {goalDeadline}
                </div>
                <Col>
                    <div id="GoalOptions">
                        <span className="Buttons">
                            <PencilIcon size={18} />
                        </span>
                        <span className="Buttons">
                            <TrashIcon size={18} />
                        </span>
                    </div>
                </Col>
            </Row>
        </Col>
    </AnimatedContainer>)
}

export default DashGoalTile