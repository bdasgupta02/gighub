import { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { ArrowDownIcon  } from '@primer/octicons-react'
import './searchBar.css'

const Sorter = (props) => {
    const [isHovering, setIsHovering] = useState(false)
    const [dropVisible, setDropVisible] = useState(false)
    const [selectedSort, setSelectedSort] = useState("Latest")

    const barBackgroundAnimatedStyle = useSpring({
        boxShadow: isHovering || dropVisible ? "4px 10px 40px #00000026" : "1px 3px 1px #00000026",
        backgroundColor: isHovering || dropVisible ? "#FFFFFFFF" : "#FFFFFFA6",
        config: config.default
    })

    const dropDownAnimatedStyle = useSpring({
        transform: dropVisible ? `translate(0px, 0px)` : 'translate(0px, -50px)',
        visibility: dropVisible ? 'visible' : 'hidden',
        opacity: dropVisible ? 1 : 0,
        config: config.stiff
    })

    return (<div id="SorterBox">
        <animated.div
            className="BorderRadius"
            id="SorterBox"
            style={barBackgroundAnimatedStyle}
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
            onClick={() => setDropVisible(true)}>
            <div id="SorterText">
                {selectedSort}
            </div>
            <div className="IconBox" id="SorterIconBox">
                <ArrowDownIcon  size="small" fill="#9E9E9E" />
            </div>
        </animated.div>
        <animated.div className="DropDown" style={dropDownAnimatedStyle} onClick={() => setDropVisible(false)}>
            <div>test</div>
            <div>test2</div>
        </animated.div>
    </div>)
}

export default Sorter