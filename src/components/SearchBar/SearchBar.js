import { useState } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { Container, Row, Col } from 'react-grid-system'
import { SearchIcon } from '@primer/octicons-react'
import Filter from './Filter'
import Sorter from './Sorter'
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
    const [keywords, setKeywords] = useState([])
    
    // just placeholders for now
    const [filter, setFilter] = useState({})
    const [sorting, setSorting] = ("")

    const textMaxLen = 150

    const barBackgroundAnimatedStyle = useSpring({
        boxShadow: isHovering || isFocused ? "4px 10px 40px #00000026" : "1px 3px 1px #00000026",
        backgroundColor: isHovering || isFocused ? "#FFFFFFFF" : "#FFFFFFA6",
        config: config.default
    })

    // check if this works
    // should store cache in text
    const handleChange = (event) => {
        setText(event.target.value)
        console.log(text)
    }

    // should refresh the text input
    // and create keyword
    const handleSubmit = (event) => {
        event.preventDefault()
        setKeywords([...keywords, text])
        setText("")
    }

    //TODO: make this functional
    const handleAdd = (keyword) => {

    }

    // To pass to keywords
    const handleRemove = (keyword) => {
        
    }

    // TODO: check if this works upstream
    const handleFilter = (filterIn) => {

    }

    const handleSorter = (sortIn) => {

    }

    // maybe make the ENTIRE length the same as 2x tiles width
    const AnimatedRow = animated(Row)
    return (<Container>
        <Row>
            {/* TODO: need breakpoints for search bar size */}
            <AnimatedRow 
                style={barBackgroundAnimatedStyle} 
                onMouseOver={() => setIsHovering(true)} 
                onMouseOut={() => setIsHovering(false)} 
                className="BorderRadius"
                id="SearchTextBox">
                {/* TODO: form actions, trim input for keyword add */}
                <form onSubmit={handleSubmit}>
                    <input 
                        maxLength={textMaxLen} 
                        onFocus={() => setIsFocused(true)} 
                        onBlur={() => setIsFocused(false)} 
                        placeholder="Search" 
                        id="SearchText" 
                        onChange={handleChange} value={text} />
                </form>
                <div id="SearchIconBox" className="IconBox">
                    <SearchIcon size="small" onClick={handleSubmit} fill="#9E9E9E" />
                </div>
            </AnimatedRow>
            {/* TODO: Sorting and filtering */}
            <Filter handleFilter={handleFilter} />
            <Sorter handleSorter={handleSorter} />
        </Row>
        {/* TODO: Keywords */}

    </Container>)
}

export default SearchBar;