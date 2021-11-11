import React from 'react'
import { XCircleFillIcon } from '@primer/octicons-react'

function DivKeyword(props) {
    const { keyword, onClose, isReadOnly } = props

    const finalFunc = isReadOnly ? () => null : () => onClose(keyword)

    const outerStyle = {
        width: 'fit-content',
        backgroundColor: '#08F0FF2E',
        color: '#00A9B4',
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingTop: '6px',
        paddingBottom: '6px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isReadOnly ? 'none' : 'pointer'
    }

    return (
        <div onClick={finalFunc} style={outerStyle}>
            {keyword}&nbsp;&nbsp;&nbsp;{<XCircleFillIcon size={16} />}
        </div>
    )
}

export default DivKeyword