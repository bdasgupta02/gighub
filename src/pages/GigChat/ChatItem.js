import React from 'react'
import { Col, Row } from 'react-grid-system'
import './gigChat.css'

function ChatItem(props) {
    const { isSender, content, timeString, logo } = props

    const outerClass = isSender ? "CIOuterBoxCommon CIOuterBoxSend" : "CIOuterBoxCommon CIOuterBoxRec"
    return (
        <div className="CIBox">
            {isSender ? null : (
                <div style={{marginRight: '16px'}}>
                    {logo}
                </div>
            )}
            <div className={outerClass}>
                <div style={{ width: '100%' }}>
                    {content}
                </div>
                <div style={{ width: '100%', height: '16px' }} />
                <div style={{ width: '100%' }} className="CIInnerDateString">
                    {timeString}
                </div>
            </div>
            
        </div>
    )
}

export default ChatItem
