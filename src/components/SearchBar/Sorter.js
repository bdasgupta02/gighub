import { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { ArrowDownIcon } from '@primer/octicons-react'
import { Container, Row, Col } from 'react-grid-system'
import './searchBar.css'

const Sorter = (props) => {
    const [isHovering, setIsHovering] = useState(false)
    const [dropVisible, setDropVisible] = useState(false)

    const { selectedSort, setSelectedSort } = props

    const barBackgroundAnimatedStyle = useSpring({
        boxShadow: isHovering || dropVisible ? "4px 10px 40px #00000026" : "1px 3px 6px #00000026",
        backgroundColor: isHovering || dropVisible ? "#FFFFFFFF" : "#FFFFFFA6",
        config: config.default
    })

    const dropDownAnimatedStyle = useSpring({
        transform: dropVisible ? `translate(0px, 0px)` : 'translate(0px, -50px)',
        visibility: dropVisible ? 'visible' : 'hidden',
        opacity: dropVisible ? 1 : 0,
        config: config.stiff
    })

    return (<div id="SBSorterOuter">
        <animated.div
            className="SBBorderRadius"
            id="SBSorterBox"
            style={barBackgroundAnimatedStyle}
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
            onClick={() => setDropVisible(!dropVisible)}>
            <div id="SBSorterText">
                {selectedSort}
            </div>
            <div className="SBIconBox" id="SBSorterIconBox">
                <ArrowDownIcon size="small" fill="#9E9E9E" />
            </div>
        </animated.div>
        <animated.div className="SBDropDown SBFilterText" style={dropDownAnimatedStyle} >
            <Container>
                <Row>
                    <label>
                        <input type="radio" value="latest" checked={selectedSort === 'Latest'} onClick={() => setSelectedSort('Latest')} />
                        Sort by latest
                    </label>
                </Row>
                <div style={{ width: '1px', height: '10px' }} />
                <Row>
                    <label>
                        <input type="radio" value="match" checked={selectedSort === 'Match'} onClick={() => setSelectedSort('Match')} />
                        Sort by match
                    </label>
                </Row>
            </Container>
        </animated.div>
    </div>)
}

export default Sorter