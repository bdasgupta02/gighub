import { XCircleFillIcon } from '@primer/octicons-react'
import { Container, Row, Col } from 'react-grid-system'
import './searchBar.css'

/*
Props:
- keyword
*/
const Keyword = (props) => {
    // TODO: (x) button handling
    const { text, onClose } = props

    return (
        <div id="SBKeyword">
            <span>
                {text}
            </span>
            <span style={{height: '1px', width: '8px'}} />
            <span className="SBKeywordClose" onClick={onClose}>
                <XCircleFillIcon size={12}  />
            </span>
        </div>
    )
}

export default Keyword;