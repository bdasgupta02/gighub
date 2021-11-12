import { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import { PencilIcon, TrashIcon } from '@primer/octicons-react'

import './dashGoalTile.css'

const DashGoalTile = (props) => {
    const { description, achieveBy, onDelete, id } = props

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
                <div id="DashLGoalDetails">
                    {description}
                </div>
            </Row>
            <Row className="DashLGoalRow" id="DashLBottomRow">
                <div id="DashLGoalDeadline">
                    Achieve by {achieveBy}
                </div>
                <Col>
                    <div id="DashLGoalOptions">
                        <span className="DashLButtons" style={{ cursor: 'pointer' }} onClick={() => onDelete(id)}>
                            <TrashIcon size={18} />
                        </span>
                    </div>
                </Col>
            </Row>
        </Col>
    </AnimatedContainer>)
}

export default DashGoalTile