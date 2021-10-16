import { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './signInBox.css'

const SignInBox = (props) => {
    const [isSignIn, setIsSignIn] = useState(true)

    return (
        <div id="SignInBox">
            <SignIn />
        </div>
    )
}

export default SignInBox;