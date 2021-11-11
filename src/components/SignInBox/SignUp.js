import { useState, useCallback } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import Keyword from '../DivKeyword'
import ToggleSwitch from '../ToggleSwitch'
import Button from '../Button'
import { useAuth } from '../../contexts/AuthContext'
import { passwordStrength } from 'check-password-strength'
import { useHistory } from 'react-router-dom'
import LoadingIndicator from '../LoadingIndicator'
import './signInBox.css'



/**
 * TODO:
 * - error handling (password match, email already exists)
 * - password complexity check
 * - redirect when sign up with use history
 * - helper text for keyword
 * - CATCH: Firebase: The email address is already in use by another account. (auth/email-already-in-use). (catch e)
 * - helper text for asterisk
 * 
 * BUGS:
 * - company doesnt add details
 * - making worker makes company
 * - worker skills not going through
 */

/**
 * Sign up guide (fields for sign up only):
   * Worker: 
   * email(String),
   * location(String),
   * name(String),
   * password(String),
   * phone(String),
   * skills(array of skills references)
   * numReviews(0)
   * 
   * Company:
   * UEN (String),
   * email(String),
   * location(String),
   * name(String),
   * password(String),
   * phone(String),
   */

const WorkerOne = (props) => {
    const [error, setError] = useState('')
    const [details, setDetails] = useState({
        name: '',
        location: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            postal: '',
        },
        phone: '',
        age: -1,
    })
    const { onContinue, onCancel } = props

    const handleInputChange = (event, type) => {
        setDetails({
            ...details,
            [type]: event.target.value
        })
    }

    const handleLocationChange = (event, type) => {
        const newLocation = {
            ...details.location,
            [type]: event.target.value
        }
        setDetails({
            ...details,
            location: newLocation
        })
    }

    const handleContinue = () => {
        if (details.name === '' || details.location.addressLine1 === '' || details.phone === '' || details.location.city === '' || details.location.postal === '') {
            setError('One or more values are empty!')
        } else {
            onContinue(2, true, details)
        }
    }

    return (
        <Container id="SignInFormat">
            <Row id="TitleText">
                Create an account
            </Row>
            <Row>
                <input className="InputText" type="text" placeholder="* Full name" value={details.name} onChange={event => handleInputChange(event, 'name')} />
            </Row>
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="text" placeholder="* Address line 1" value={details.location.addressLine1} onChange={event => handleLocationChange(event, 'addressLine1')} />
            </Row>
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="text" placeholder="Address line 2" value={details.location.addressLine2} onChange={event => handleLocationChange(event, 'addressLine2')} />
            </Row>
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="text" placeholder="* City" value={details.location.city} onChange={event => handleLocationChange(event, 'city')} />
            </Row>
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="text" placeholder="* Postal code" value={details.location.postal} onChange={event => handleLocationChange(event, 'postal')} />
            </Row>
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="text" placeholder="* Phone number" value={details.phone} onChange={event => handleInputChange(event, 'phone')} />
            </Row>
            <div className="SpacerBig" />
            <Row>
                <Button text="Continue" type="PRIMARY" forceWidth="180px" onClick={handleContinue} />
            </Row>
            <div className="Spacer" />
            <Row>
                <Button text="Cancel" type="SECONDARY" forceWidth="180px" onClick={onCancel} />
            </Row>
            <div className="Spacer" />
            {error !== '' ? (
                <Row id="ErrorText">
                    {error}
                </Row>
            ) : null}
            <div className="SpacerChin" />
        </Container>
    )
}

const WorkerTwo = (props) => {
    const [error, setError] = useState('')
    const [keywordCache, setKeywordCache] = useState('')
    const [details, setDetails] = useState({
        skills: []
    })
    const { onSignUp, onCancel } = props

    const handleInputChange = (event) => {
        setKeywordCache(event.target.value)
    }

    const handleAdd = (event) => {
        if (event.key === 'Enter' && keywordCache !== '') {
            let skillList = details.skills
            skillList.push(keywordCache)
            setDetails({ skills: skillList })
            setKeywordCache('')
        }

    }

    const handleClose = (delKeyword) => {
        let skillList = details.skills
        const index = skillList.indexOf(delKeyword)
        if (index > -1) { skillList.splice(index, 1); }
        setDetails({ skills: skillList })
    }

    const handleSignUp = () => {
        try {
            onSignUp(details)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Container id="SignInFormat">
            <Row id="TitleText">
                Create an account
            </Row>
            <Row>
                <input className="InputText" type="text" placeholder="Enter your skills" value={keywordCache} onChange={event => handleInputChange(event)} onKeyPress={handleAdd} />
            </Row>
            <div className="Spacer" />
            <div style={{ width: '100%' }}>
                {details.skills.map((key) => (
                    <div style={{ width: 'fit-content', display: 'inline-block', marginRight: '8px', marginTop: '8px' }}>
                        <Keyword keyword={key} onClose={handleClose} />
                    </div>
                ))}
            </div>
            <div className="SpacerBig" />
            <Row>
                <Button text="Create account" type="PRIMARY" forceWidth="180px" onClick={handleSignUp} />
            </Row>
            <div className="Spacer" />
            <Row>
                <Button text="Cancel" type="SECONDARY" forceWidth="180px" onClick={onCancel} />
            </Row>
            <div className="Spacer" />
            {error !== '' ? (
                <Row id="ErrorText">
                    {error}
                </Row>
            ) : null}
            <div className="SpacerChin" />
        </Container>
    )
}

const CompanyOne = (props) => {
    const [error, setError] = useState('')
    const [details, setDetails] = useState({
        name: '',
        UEN: '',
        location: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            postal: '',
        },
        phone: '',
    })
    const { onSignUp, onCancel } = props

    const handleInputChange = (event, type) => {
        setDetails({
            ...details,
            [type]: event.target.value
        })
    }

    const handleLocationChange = (event, type) => {
        const newLocation = {
            ...details.location,
            [type]: event.target.value
        }
        setDetails({
            ...details,
            location: newLocation
        })
    }

    const handleSignUp = () => {
        try {
            if (details.name === '' || details.location.addressLine1 === '' || details.phone === '' || details.location.city === '' || details.location.postal === '') {
                setError('One or more values are empty!')
            } else {
                onSignUp(details)
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Container id="SignInFormat">
            <Row id="TitleText">
                Create an account
            </Row>
            <Row>
                <input className="InputText" type="text" placeholder="* Company name" value={details.name} onChange={event => handleInputChange(event, 'name')} />
            </Row>
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="text" placeholder="Company UEN" value={details.UEN} onChange={event => handleInputChange(event, 'UEN')} />
            </Row>
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="text" placeholder="* Address line 1" value={details.location.addressLine1} onChange={event => handleLocationChange(event, 'addressLine1')} />
            </Row>
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="text" placeholder="Address line 2" value={details.location.addressLine2} onChange={event => handleLocationChange(event, 'addressLine2')} />
            </Row>
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="text" placeholder="* City" value={details.location.city} onChange={event => handleLocationChange(event, 'city')} />
            </Row>
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="text" placeholder="* Postal code" value={details.location.postal} onChange={event => handleLocationChange(event, 'postal')} />
            </Row>
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="text" placeholder="* Phone number" value={details.phone} onChange={event => handleInputChange(event, 'phone')} />
            </Row>
            <div className="SpacerBig" />
            <Row>
                <Button text="Create account" type="PRIMARY" forceWidth="180px" onClick={handleSignUp} />
            </Row>
            <div className="Spacer" />
            <Row>
                <Button text="Cancel" type="SECONDARY" forceWidth="180px" onClick={onCancel} />
            </Row>
            <div className="SpacerChin" />
        </Container>
    )
}

//TODO: isworker
const StartingScreen = (props) => {
    const [details, setDetails] = useState({
        email: '',
        password: '',
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isWorker, setIsWorker] = useState(true)
    const [error, setError] = useState('')
    const [pwStrength, setPwStrength] = useState('')

    const customPasswordRules = [
        {
            id: 0,
            value: "Too weak",
            minDiversity: 0,
            minLength: 0
        },
        {
            id: 1,
            value: "Weak",
            minDiversity: 1,
            minLength: 6
        },
        {
            id: 2,
            value: "Medium",
            minDiversity: 2,
            minLength: 8
        },
        {
            id: 3,
            value: "Strong",
            minDiversity: 3,
            minLength: 10
        }
    ]

    const { onContinue } = props
    const handleEmailChange = (event) => {
        setDetails({
            ...details,
            email: event.target.value
        })
        setError('')
    }

    const handlePasswordChange = (event) => {
        setDetails({
            ...details,
            password: event.target.value
        })
        setError('')
        if (event.target.value === '') {
            setPwStrength('')
        } else {
            setPwStrength(passwordStrength(event.target.value, customPasswordRules).value)
        }
    }

    const handleConfirmChange = (event) => {
        setConfirmPassword(event.target.value)
        setError('')
    }

    const strengthColor = {
        color: pwStrength === '' ? '#000' : pwStrength === 'Too weak' ? '#e30e1f' : pwStrength === 'Weak' ? '#fc9505' : pwStrength === 'Medium' ? '#fccf05' : '#0ec914'
    }

    const handleContinue = () => {
        if (details.email === '') {
            setError('Email is empty!')
        } else if (details.password !== '') {
            const isMatched = details.password === confirmPassword
            if (isMatched) {
                if (pwStrength !== 'Too weak') {
                    onContinue(1, isWorker, details)
                } else {
                    setError('Password is too weak!')
                }
            } else {
                setError('Passwords don\'t match!')
            }
        } else {
            setError('Password is empty!')
        }
    }


    return (
        <Container id="SignInFormat">
            <Row id="TitleText">
                Create an account
            </Row>
            <div className="LabelText">
                I'm a ..
            </div>
            <Row>
                <ToggleSwitch onLeft={() => setIsWorker(true)} onRight={() => setIsWorker(false)} left="Job seeker" right="Company" forceWidth='260px' />
            </Row>
            <div className="SpacerBig" />
            <Row>
                <input className="InputText" type="email" placeholder="* Email" value={details.email} onChange={handleEmailChange} />
            </Row>
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="password" placeholder="* Password" value={details.password} onChange={handlePasswordChange} />
            </Row>
            {pwStrength !== '' ? (
                <Row id="PasswordStrength" style={strengthColor}>
                    Password strength: {pwStrength}
                </Row>
            ) : null}
            <div className="Spacer" />
            <Row>
                <input className="InputText" type="password" placeholder="* Confirm password" value={confirmPassword} onChange={handleConfirmChange} />
            </Row>
            <div className="SpacerBig" />
            <Row>
                <Button text="Continue" type="PRIMARY" forceWidth="180px" onClick={handleContinue} />
            </Row>
            <div className="Spacer" />
            {error !== '' ? (
                <Row id="ErrorText">
                    {error}
                </Row>
            ) : null}
            <div className="SpacerChin" />
        </Container>
    )
}

// TODO
// REDIRECT
// ERROR HANDLING
const SignUp = (props) => {
    const [details, setDetails] = useState({
        email: '',
        password: '',
        location: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            postal: '',
        },
        name: '',


        avgReview: -1,
        numReviews: 0,
        profilePicture: '',
        resume: '',
    })
    const [isWorker, setIsWorker] = useState(true)
    const [loading, setLoading] = useState(false)
    const [stage, setStage] = useState(0)
    const { signup } = useAuth()
    const history = useHistory()


    const handleContinue = (newStage, newIsWorker, newDetails) => {
        setDetails({
            ...details,
            ...newDetails
        })
        setIsWorker(newIsWorker)
        setStage(newStage)
    }

    const handleSignUp = async (newDetails) => {
        setLoading(true)
        const finalDetails = {
            ...details,
            ...newDetails
        }
        try {
            await signup(finalDetails, isWorker)
            setLoading(false)
            history.push("/")
        } catch (e) {
            alert(e.message)
            setLoading(false)
        }

    }

    const handleCancel = () => {
        setIsWorker(true)
        setStage(0)
        setDetails({})
    }

    return (
        <div>
            {stage === 0 ? (
                <StartingScreen onContinue={handleContinue} />
            ) :
                stage === 1 ?
                    isWorker ? (
                        <WorkerOne onCancel={handleCancel} onContinue={handleContinue} />
                    ) : (
                        <CompanyOne onSignUp={handleSignUp} onCancel={handleCancel} />
                    ) : (
                        <WorkerTwo onSignUp={handleSignUp} onCancel={handleCancel} />
                    )}
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {loading && <LoadingIndicator />}
            </div>

        </div>
    )
}

export default SignUp;