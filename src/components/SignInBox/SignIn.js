import { useState, useCallback } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import LoadingIndicator from '../../components/LoadingIndicator'
import Button from '../Button'

/**
 * Props:
 * - onSignIn(email, password), func to sign in
 * - onSignUp(), change page to sign up
 * 
 * TODO: 
 * - error handling: password
 * - email doesnt exist
 * - google support
 * - redirect to / once done
 * - toggle switch on top
 * - catch email error from firebase (catch e)
 * 
 * Notes:
 * - Can't toggle between worker and company due to common auth email
 */
const SignIn = (props) => {
    const { onSignUpSwitch } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signout, currentUser, signin } = useAuth()
    const history = useHistory()

    //TODO: left with this
    // make intermediate function
    const [isValid, setIsValid] = useState(true)

    // error handling?


    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        setError('')
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        setError('')
    }

    const onSignIn = useCallback(async event => {
        setLoading(true)
        if (email === '' || password === '') {
            setError('Error: empty fields!')
            setLoading(false)
        } else {
            event.preventDefault()
            try {
                await signin(email, password)
                //REDIRECT
                setLoading(false)
                history.push("/")
            } catch (e) {
                if (e.message.includes('user-not-found')) {
                    setError('Sign-in failed: Email does not exist!')
                } else if (e.message.includes('invalid-email')) {
                    setError('Sign in failed: Email format is wrong!')
                } else if (e.message.includes('wrong-password')) {
                    setError('Sign in failed: Incorrect password!')
                } else {
                    setError('Sign in failed')
                }
                setLoading(false)
            }
        }
    })

    return (
        <form onSubmit={() => onSignIn(email, password)} style={{ width: '100%' }}>
            <Container id="SignInFormat">

                <Row id="TitleText">
                    Sign-in
                </Row>
                <Row>
                    <input className="InputText" type="email" placeholder="Email" onChange={handleEmailChange} value={email} />
                </Row>
                <div className="Spacer" />
                <Row>
                    <input className="InputText" type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
                </Row>
                <div className="SpacerBig" />
                <Row>
                    <Button text="Sign-in" onClick={onSignIn} type="PRIMARY" forceWidth="120px" />
                </Row>
                <Row style={{ marginTop: '8px' }}>
                    <Button text="Or sign-up instead" onClick={onSignUpSwitch} type="SECONDARY" forceWidth="120px" />
                </Row>
                <div className="Spacer" />
                {loading && <LoadingIndicator />}
                {error !== '' ? (
                    <Row id="ErrorText">
                        {error}
                    </Row>
                ) : null}
                <div className="SpacerChin" />
            </Container>
        </form>
    )
}

export default SignIn