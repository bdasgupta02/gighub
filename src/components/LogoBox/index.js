import React from 'react'
import LogoGenerator from '../LogoGenerator'
import './logoBox.css'

function LogoBox(props) {
    const { src, name } = props

    const logo = typeof src === 'undefined' || src === '' ? <LogoGenerator name={name} /> : <img src={src} style={{ width: '70%', height: '70%' }} />

    return (
        <div id="LBLogoBox">
            {logo}
        </div>
    )
}

export default LogoBox
