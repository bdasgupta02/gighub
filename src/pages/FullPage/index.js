import React from 'react'
import './fullPage.css'

function FullPage(props) {

    return (
        <div id="FPageStyle" {...props.style}>
            <div id="FPPadding">
                {props.children}
            </div>
        </div>
    )
}

export default FullPage
