
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
        <Container id="Keyword">
            <Col>
                {keyword}
            </Col>
            <div id="Spacer" />
            {isReadOnly === true ? null : (
                <Col onClick={onClose}>
                    <XCircleFillIcon size="small" />
                </Col>
            )}
        </Container>
    )
}

export default Keyword;