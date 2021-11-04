import { useState, cloneElement } from "react";
import SearchInput, { createFilter } from 'react-search-input'
import SearchBar from "../../components/SearchBar";
import { Container, Row, Col } from 'react-grid-system'
import { useAuth } from "../../contexts/AuthContext";
import GigListingTile from '../../components/GigListingTile'
import LogoGenerator from "../../components/LogoGenerator"
import FullPage from "../FullPage";
import './searchGigs.css'




/**
 * TODO:
 * - check isWorker or not for match % (edit gig listing tile and make new auth context thing)
 */
export default function SearchGigs(props) {
    const [skills, setSkills] = useState(null)
    const [keywords, setKeywords] = useState([])
    const [selectedSort, setSelectedSort] = useState("Latest")
    const [filters, setFilters] = useState({
        new: false,
        match: false,
        flexible: false,
        fixed: false
    })
    let { isWorker } = useAuth()








    // REMOVE this once database is connected with private route
    if (typeof isWorker === 'undefined' || isWorker === null) isWorker = true











    /* PLACEHOLDERS: REPLACE THIS WITH QUERIES 
    
    TODO: 
    - replace the attributes with the ones from firestore
    - if the logo is empty string, it generates one
    - handle fuzzy search thing for the percentage
     */
    let gigsData = [
        {
            companyName: "Test Company 1",
            companyLogo: "",
            companyCity: "Singapore",
            jobTitle: "Job Title",
            jobDesc: "This is the description.",
            payAmt: "2000",
            payFor: "5 projects",
            isNew: true,
            isGoodMatch: true,
            matchPercentage: 80,
            isFlexible: true,
            link: "",
            creationDate: new Date('2/1/21')
        },
        {
            companyName: "Company 2",
            companyLogo: "",
            companyCity: "Singapore",
            jobTitle: "Some job",
            jobDesc: "This is a job description.",
            payAmt: "10,000",
            payFor: "10 things",
            isNew: false,
            isGoodMatch: true,
            matchPercentage: 70,
            isFlexible: false,
            creationDate: new Date('1/1/21')
        }
    ]













    // SEARCH SYSTEM
    const keysToFilter = ["companyName", "companyCity", "jobTitle", "jobDesc", "payFor"]
    let gigs = []
    if (keywords.length === 0) gigs = gigsData
    for (let i = 0; i < keywords.length; i++) {
        gigs = gigs.concat(gigsData.filter(createFilter(keywords[i], keysToFilter)))
    }

    // FILTERING AND SORTING SYSTEM
    const toggleFilter = (filterIn, val) => {
        setFilters({
            ...filters,
            [filterIn]: val
        })
    }

    const handleKeyword = (event, text, isDel) => {
        if (isDel) {
            const filteredKeywords = keywords.filter(e => e !== text)
            setKeywords(filteredKeywords)
        } else {
            event.preventDefault()
            if (!keywords.includes(text)) setKeywords([...keywords, text])
        }
    }

    const handleSelectedSort = (sort) => {
        setSelectedSort(sort)
    }

    const sortingComparator = (a, b) => {
        if (selectedSort === 'Match') {
            return a.matchPercentage < b.matchPercentage ? 1 : -1
        } else {
            return a.creationDate > b.creationDate ? 1 : -1
        }
    }

    if (!(filters.new === false && filters.match === false && filters.flexible === false && filters.fixed === false)) {
        if (filters.new === true) {
            gigs = gigs.filter(e => e.isNew === true)
        }
        if (filters.match === true) {
            gigs = gigs.filter(e => e.isGoodMatch === true)
        }
        if (filters.flexible === true) {
            gigs = gigs.filter(e => e.isFlexible === true)
        }
        if (filters.fixed === true) {
            gigs = gigs.filter(e => e.isFlexible === false)
        }
    }

    gigs.sort(sortingComparator)
    const cleanedGigs = isWorker ? gigs : gigs.map(({ isGoodMatch, ...rest }) => rest)

    //TODO: get user skills

    console.log(typeof GigListingTile)
    return (
        <FullPage header="Discover gigs">
            <Col>
                <Row className="SearchSpacer" />
                <SearchBar
                    filters={filters}
                    toggleFilter={toggleFilter}
                    keywords={keywords}
                    handleKeyword={handleKeyword}
                    selectedSort={selectedSort}
                    setSelectedSort={handleSelectedSort}
                />
                <Row className="SearchSpacer" />
                <Row>
                    {cleanedGigs.map(e => (
                        <div style={{ marginRight: '20px' }}>
                            <GigListingTile {...e} />
                        </div>
                    ))}
                </Row>
            </Col>
        </FullPage>
    );
}