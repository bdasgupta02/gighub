import { useState } from "react"
import { animated, useSpring, config } from 'react-spring'
import './button.css'
import {
  BrowserIcon, SearchIcon,
  NoteIcon, ChecklistIcon,
  PersonIcon, GearIcon
} from '@primer/octicons-react';


/**
 * Props:
 * - type: PRIMARY, SECONDARY, WHITE, GREEN
 * - isBlock: stretch 100% width of parentif true
 * - onClick: func
 * - text
 * - forceWidth
 * - icon
 */
const Button = (props) => {
    const [isHovering, setIsHovering] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const { isBlock, type, onClick, text, forceWidth, icon } = props

    const boxStyle = {
        display: isBlock || forceWidth !== null  ? 'flex' : 'inline-block',
        width: forceWidth !== null ? forceWidth : null,
    }

    const animatedBackground = useSpring({
        // elevation animation
        boxShadow: isHovering ? "4px 10px 15px #00000026" : "0px 0px 0px #00000000",
        config: config.stiff
    })

    const animatedClick = useSpring({
        // color animation
        backgroundColor: type === 'SECONDARY' ? !isPressed ? '#ECECEC' : '#DBDBDB' : type === 'GREEN' ? isPressed ? '#ECECEC' : '#00A9B4' : type === 'WHITE' ? !isPressed ? '#FFFFFF' : '#DBDBDB' : !isPressed ? '#2fc2cc' : '#27a4ab',
        config: {
            mass: 1,
            tension: 300,
            friction: 10,
            clamp: true
        }
    })

    const textStyle = {
        color: type === 'SECONDARY' || type === 'WHITE' ? '#8A8A8A' : '#FFF'
    }

    return (
        <animated.div id="ButtonBox"
            style={{...boxStyle, ...animatedBackground, ...animatedClick}}
            onClick={onClick}
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}>
            <div id="ButtonText" style={textStyle}>
              {icon}  {text}
            </div>
        </animated.div>
    )
}

export default Button
