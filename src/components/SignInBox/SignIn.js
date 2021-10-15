import { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import Button from '../Button'

/**
 * Props:
 * - onSignIn(email, password), func to sign in
 * - onSignUp(), change page to sign up
 */
const SignIn = (props) => {
    const { onSignIn, onSignUpSwitch } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // error handling?


    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
        <form onSubmit={onSignIn} style={{width: '100%'}}>
            <Container id="SignInFormat">

                <Row id="TitleText">
                    Sign-in
                </Row>
                <Row>
                    <input className="InputText" placeholder="Email" onChange={handleEmailChange} value={email} />
                </Row>
                <div className="Spacer" />
                <Row>
                    <input className="InputText" type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
                </Row>
                <div className="SpacerBig" />
                <Row>
                    <Button text="Sign-in" onClick={() => onSignIn(email, password)} type="PRIMARY" forceWidth="120px" />
                </Row>
                <Row style={{ marginTop: '8px' }}>
                    <Button text="Or sign-up instead" onClick={onSignUpSwitch} type="SECONDARY" forceWidth="120px" />
                </Row>
                <div className="SpacerChin" />
                
            </Container>
        </form>
    )
}

export default SignIn;