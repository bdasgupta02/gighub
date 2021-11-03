import React from 'react'
import './fullPage.css'

function FullPage(props) {

    return (
        <div id="FPageStyle" {...props.style}>
            {props.children}
        </div>
    )
}

export default FullPage
