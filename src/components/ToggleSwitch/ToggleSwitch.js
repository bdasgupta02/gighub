import { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { animated, useSpring } from 'react-spring'
import './toggleSwitch.css'

/**
 * PROPS:
 * - left: the text on the left
 * - right: the text on the right
 * - onLeft: the func for left
 * - onRight: the func for the right
 * - forceWidth: overwriting width
 * - isBlock: stretch
 */
const ToggleSwitch = (props) => {
    const [isLeft, setIsLeft] = useState(true)
    const { left, right, onLeft, onRight, forceWidth, isBlock } = props

    const boxStyle = {
        display: isBlock || forceWidth !== null  ? 'flex' : 'inline-block',
        width: forceWidth !== null ? forceWidth : null,
    }

    const selectedTextStyle = {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        backgroundColor: '#55E1EAFF',
        borderRadius: '8px',
        boxShadow: "4px 10px 15px #00000026"
    }

    const unselectedTextStyle = {
        fontSize: '14px',
        color: '#8A8A8A',
        fontWeight: 'normal',
        backgroundColor: '#ECECEC00',
    }

    const leftStyle = useSpring(isLeft ? selectedTextStyle : unselectedTextStyle)
    const rightStyle = useSpring(!isLeft ? selectedTextStyle : unselectedTextStyle)

    const handleRightClick = () => {
        setIsLeft(false)
        onRight()
    }

    const handleLeftClick = () => {
        setIsLeft(true)
        onLeft()
    }

    const AnimatedCol = animated(Col)
    return (
        <Container>
            <Row style={boxStyle} id="ToggleBackground">
                <AnimatedCol className="ToggleSide" style={leftStyle} onClick={handleLeftClick}>
                    {left}
                </AnimatedCol>
                <AnimatedCol className="ToggleSide" style={rightStyle} onClick={handleRightClick}>
                    {right}
                </AnimatedCol>
            </Row>
        </Container>
    )
}

export default ToggleSwitch