import { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import { SearchIcon } from '@primer/octicons-react'
import Filter from './Filter'
import Sorter from './Sorter'
import Keyword from './Keyword'
import ReactModal from 'react-modal'
import './searchBar.css'

/*
Props:
- functions to pass keywords, filters and sorting upstream (if we use this instead of redux)

TODO:
- auto scaling
- media query conditional
- ref based outside click detect
*/
const SearchBar = (props) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState("")
    const { filters, toggleFilter, keywords, handleKeyword, selectedSort, setSelectedSort } = props

    const [sorting, setSorting] = ("")

    const textMaxLen = 150

    const barBackgroundAnimatedStyle = useSpring({
        boxShadow: "4px 10px 20px #00000026",
        backgroundColor: isHovering || isFocused ? "#FFFFFFFF" : "#FFFFFFA6",
        zIndex: 1,
        config: config.default
    })

    // check if this works
    // should store cache in text
    const handleChange = (event) => {
        setText(event.target.value)
    }

    // should refresh the text input
    // and create keyword
    const handleSubmit = (event) => {
        event.preventDefault()
        handleKeyword(event, text, false)
        setText("")
    }

    //TODO: make this functional
    const handleAdd = (keyword) => {

    }

    // To pass to keywords
    const handleRemove = (keyword) => {
        handleKeyword(null, keyword, true)
    }

    // FILTERS


    // SORTERS
    const handleSorter = (sortIn) => {

    }


    // maybe make the ENTIRE length the same as 2x tiles width
    const AnimatedRow = animated(Row)
    return (<div>
        <Col>
            <Row>
                {/* TODO: need breakpoints for search bar size */}
                <AnimatedRow
                    style={barBackgroundAnimatedStyle}
                    onMouseOver={() => setIsHovering(true)}
                    onMouseOut={() => setIsHovering(false)}
                    className="SBBorderRadius"
                    id="SBSearchTextBox">
                    {/* TODO: form actions, trim input for keyword add */}
                    <form onSubmit={handleSubmit}>
                        <input
                            maxLength={textMaxLen}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Search"
                            id="SBSearchText"
                            onChange={handleChange} value={text} />
                    </form>
                    <div id="SBSearchIconBox" className="SBIconBox">
                        <SearchIcon size="small" onClick={handleSubmit} fill="#9E9E9E" />
                    </div>
                </AnimatedRow>
                {/* TODO: Sorting and filtering */}
                <Filter style={{ zIndex: 2 }} filters={filters} toggleFilter={toggleFilter} />
                <Sorter handleSorter={handleSorter} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
            </Row>
            {/* TODO: Keywords */}
            <div style={{ width: '1px', height: '15px' }} />
            <Row>
                {keywords.map(e => (
                    <div style={{ marginTop: '5px', width: 'fit-content' }}>
                        <Keyword text={e} onClose={() => handleRemove(e)} />
                    </div>
                ))}
            </Row>
        </Col>
    </div>)
}

export default SearchBar;