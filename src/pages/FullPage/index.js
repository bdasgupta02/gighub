import React from 'react'
import { Container, Row } from 'react-grid-system'
import './fullPage.css'

function FullPage(props) {

    return (
        <div id="FPageStyle" {...props.style}>
            <Container id="FPPadding">
                <Row id="FPPageHeader">
                    {props.header}
                </Row>
                <Row>
                    {props.children}
                </Row>
            </Container>
        </div>
    )
}

export default FullPage
