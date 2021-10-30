import { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import { FilterIcon } from '@primer/octicons-react'
import './searchBar.css'

const Filter = (props) => {
    const [isHovering, setIsHovering] = useState(false)
    const [dropVisible, setDropVisible] = useState(false)
    const { filters, toggleFilter } = props

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

    return (<div id="SBFilterBox" style={{ zIndex: 2 }}>
        <animated.div
            className="SBBorderRadius SBSideBox"
            style={barBackgroundAnimatedStyle}
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
            onClick={() => setDropVisible(!dropVisible)}>
            <div className="SBIconBox">
                <FilterIcon size="small" fill="#9E9E9E" />
            </div>
        </animated.div>
        <animated.div className="SBDropDown SBFilterText" style={dropDownAnimatedStyle}>
            <Container>
                <Row>
                    <label>
                        <input type="radio" value="new" checked={filters.new} onClick={() => toggleFilter('new', !filters.new)} />
                        New
                    </label>
                </Row>
                <div style={{ width: '1px', height: '10px' }} />
                <Row>
                    <label>
                        <input type="radio" value="goodMatch" checked={filters.match} onClick={() => toggleFilter('match', !filters.match)} />
                        Good match
                    </label>
                </Row>
                <div style={{ width: '1px', height: '10px' }} />
                <Row>
                    <label>
                        <input type="radio" value="flexible" checked={filters.flexible} onClick={() => toggleFilter('flexible', !filters.flexible)} />
                        Flexible
                    </label>
                </Row>
                <div style={{ width: '1px', height: '10px' }} />
                <Row>
                    <label>
                        <input type="radio" value="fixed" checked={filters.fixed} onClick={() => toggleFilter('fixed', !filters.fixed)} />
                        Fixed
                    </label>
                </Row>
            </Container>
        </animated.div>
    </div>)
}

export default Filter