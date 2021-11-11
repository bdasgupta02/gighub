import React from 'react'
import LogoGenerator from '../../components/LogoGenerator'
import './gigChat.css'

function ChatLogo(props) {
    const { src, name } = props

    const logo = typeof src === 'undefined' || src === '' ? <LogoGenerator forceSize="20px" name={name} /> : <img src={src} style={{ width: '70%', height: '70%', borderRadius: '25px' }} />

    
    return (
        <div id="CLLogoCircle">
            {logo}
        </div>
    )
}

export default ChatLogo
