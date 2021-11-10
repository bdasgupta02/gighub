import React from 'react'
import { animated, config, useSpring } from 'react-spring'


function LoadingIndicator(props) {

    const rotateStyle = useSpring({
        loop: true,
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
        config: config.gentle,
    })

    return (
        <animated.div
            style={{
                transform: rotateStyle.transform,
                height: '50px',
                width: '50px'
            }}>
            <svg
                id="prefix__Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
                {...props}
            >
                <defs>
                    <style>{".prefix__cls-1{fill:#a8a8a8}"}</style>
                </defs>
                <path
                    className="prefix__cls-1"
                    d="M109.036 21.704l-8.45 8.45a47.864 47.864 0 010 67.69l8.45 8.45a59.814 59.814 0 000-84.59z"
                />
            </svg>
        </animated.div>
    )
}

export default LoadingIndicator
