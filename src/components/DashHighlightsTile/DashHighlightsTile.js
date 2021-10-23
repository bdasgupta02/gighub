import { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import './dashHighlightsTile.css'

const DashHighlightsTile = (props) => {
    let value = "S$350,000"
    let desc = "earned this week"

    const [isHovering, setIsHovering] = useState(false)

    const tileBackgroundAnimated = useSpring({
        boxShadow: isHovering ? "4px 10px 40px #00000026" : "1px 3px 1px #00000026",
        backgroundColor: isHovering ? "#FFFFFFFF" : "#FFFFFFA6",
        config: config.default
    })

    const AnimatedContainer = animated(Container)
    return (<AnimatedContainer className="HLTileText" id="HLDashTileBackground" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} style={tileBackgroundAnimated}>
        <Col id="HLMainColumn">
            <Row>
                <div id="HLHighlightsValue">
                    {value}
                </div>
            </Row>
            <Row>
                <div id="HLHighlightsDesc">
                    {desc}
                </div>
            </Row>
        </Col>
    </AnimatedContainer>)
}

export default DashHighlightsTile