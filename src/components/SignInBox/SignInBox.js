import { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import GighubLogo from '../../assets/GighubLogo'
import { useHistory, withRouter } from 'react-router-dom'
import './signInBox.css'


/**
 * TODO:
 * - forgot password screen
 * - auto redict to home if logged in
 * - google support
 * - confirmation email
 */
const SignInBox = (props) => {
    const [isSignIn, setIsSignIn] = useState(true)

    return (
        <div id="SignInPage" className="FullPage">
            <div className="SpacerBig" />
            <GighubLogo />
            <div className="SpacerBig" />
            <div id="SignInBox">
                {isSignIn ? (
                    <SignIn onSignUpSwitch={() => setIsSignIn(false)} />
                ) : (
                    <SignUp />
                )}
            </div>
            <div className="SpacerBig" />
            {/* TODO: redirect to forgot password page */}
            {isSignIn ? (
                <a id="BottomLink" ><span>Forgot your password?</span><span id="BottomLinkBold"> Reset it here</span></a>
            ) : (
                <a id="BottomLink" onClick={() => setIsSignIn(!isSignIn)}><span>Already have an account?</span><span id="BottomLinkBold"> Sign-in here</span></a>
            )}
            
        </div>
    )
}

export default SignInBox;