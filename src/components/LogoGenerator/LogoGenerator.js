import React from 'react'
import './logoGenerator.css'

const LogoGenerator = (props) => {
    let { name } = props
    name.trim()
    name.toUpperCase()

    return (
        <div id="LogoGenerator">
            {name.charAt(0)}
        </div>
    )
}

export default LogoGenerator
