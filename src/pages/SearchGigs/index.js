import { useState, useEffect } from "react";
import { createFilter } from 'react-search-input'
import SearchBar from "../../components/SearchBar";
import { Row, Col } from 'react-grid-system'
import { useAuth } from "../../contexts/AuthContext";
import GigListingTile from '../../components/GigListingTile'
import { getActiveGigs, getCompany } from "../../database/firebaseFunctions";
import { isGoodMatch } from "../../algorithms/Matcher";
import FullPage from "../FullPage";
import LoadingIndicator from '../../components/LoadingIndicator'
import './searchGigs.css'



export default function SearchGigs(props) {
    const [gigsDB, setGigs] = useState([])
    const [skills, setSkills] = useState(null)
    const [loading, setLoading] = useState(false)
    const [keywords, setKeywords] = useState([])
    const [selectedSort, setSelectedSort] = useState("Latest")
    const [filters, setFilters] = useState({
        new: false,
        match: false,
        flexible: false,
        fixed: false
    })
    let { isWorker, currentUserDB } = useAuth()


    console.log(currentUserDB)

    // db
    const fetch = async () => {
        setLoading(true)
        const gigsData = await getActiveGigs()
        let i = 0, len = gigsData.length
        while (i < len) {
            const company = await getCompany(gigsData[i].companyId.id)
            gigsData[i] = { ...gigsData[i], company: company[0], isGoodMatch: isWorker && isGoodMatch(gigsData[i].requirements, currentUserDB.skills), isNew: new Date(new Date().getTime()+(5*24*60*60*1000)) > new Date(gigsData[i].dateAdded * 1000) }
            i++
        }
        setGigs(gigsData)
        setLoading(false)
    }

    useEffect(() => {
        fetch()
    }, [])








    // REMOVE this once database is connected with private route
    if (typeof isWorker === 'undefined' || isWorker === null) isWorker = true











    /* PLACEHOLDERS: REPLACE THIS WITH QUERIES 
    
    TODO: 
    - replace the attributes with the ones from firestore
    - if the logo is empty string, it generates one
    - handle fuzzy search thing for the percentage
     */
    let gigsData = gigsDB













    // SEARCH SYSTEM
    const keysToFilter = ["title", "description", "company.name", "unit", "company.city"]
    let gigs = []
    if (keywords.length === 0) gigs = gigsData
    for (let i = 0; i < keywords.length; i++) {
        //if (gigs.indexof())
        //gigs = gigs.concat(gigsData.filter(createFilter(keywords[i], keysToFilter)))
        let filteredGigs = gigsData.filter(createFilter(keywords[i], keysToFilter))
        for (let j = 0; j < filteredGigs.length; j++) {
            let filteredGig = filteredGigs[j]
            if (gigs.indexOf(filteredGig) === -1) {
                gigs.push(filteredGigs[j])
            }
        }
    }

    // FILTERING AND SORTING SYSTEM
    const toggleFilter = (filterIn, val) => {
        setFilters({
            ...filters,
            [filterIn]: val
        })
        console.log(filterIn)
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
                    {cleanedGigs.map(e => {
                        console.log(e)
                        const convertedParams = {
                            // change this to real values
                            isNew: false,
                            id: e.id,
                            isGoodMatch: e.isGoodMatch,
                            isFlexible: e.isFlexible,
                            jobDesc: e.description,
                            payAmt: "S$ " + e.pay,
                            title: e.title,
                            payFor: e.unit,
                            companyName: e.company.name,
                            companyCity: e.company.location.city,
                            companyLogo: e.company.profilePicture
                        }

                        return (
                            <div style={{ marginRight: '16px', marginTop: '16px' }}>
                                <GigListingTile {...convertedParams} />
                            </div>
                        )
                    })}
                </Row>
                {loading && <LoadingIndicator />}
            </Col>
        </FullPage>
    );
}