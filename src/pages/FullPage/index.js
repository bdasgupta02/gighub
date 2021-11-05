import React from 'react'
import { Container, Row } from 'react-grid-system'
import './fullPage.css'

function FullPage(props) {

    return (
        <div id="FPageStyle" {...props.style}>
            <div id="FPPadding">
                <div style={{ marginLeft: '36px' }}>
                    <Row id="FPPageHeader">
                        {props.header}
                    </Row>
                    <Row>
                        {props.children}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default FullPage
