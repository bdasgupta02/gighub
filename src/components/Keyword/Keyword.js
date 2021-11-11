
import { Container, Row, Col } from 'react-grid-system'
import { XCircleFillIcon } from '@primer/octicons-react'
import './keyword.css'

/*
Props:
- keyword: the text itself
- onclose(text): func to close it
- isReadOnly: disables close
*/
const Keyword = (props) => {
    // TODO: (x) button handling
    const { keyword, onClose, isReadOnly } = props


    return (
        <div>
        <Container id="Keyword">
            <Row id="KeywordRow">
                <Col id="KeywordCol">
                    {keyword}
                </Col>
                <div id="Spacer" />
                {isReadOnly === true ? null : (
                    <Col id="KeywordCol" onClick={() => onClose(keyword)}>
                        <XCircleFillIcon size="small" />
                    </Col>
                )}
            </Row>
        </Container>
        </div>
    )
}

export default Keyword;