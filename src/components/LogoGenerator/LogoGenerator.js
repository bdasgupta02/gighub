import React from 'react'
import './logoGenerator.css'

const LogoGenerator = (props) => {
    let { name, forceSize } = props
    name.trim()
    name.toUpperCase()

    return (
        <div id="LogoGenerator" style={{ fontSize: forceSize }}>
            {name.toUpperCase().charAt(0)}
        </div>
    )
}

export default LogoGenerator
