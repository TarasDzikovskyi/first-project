import 'materialize-css';
import {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import '../index.css'
import '../styles/auth.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebookF, faGoogle, faGithub} from '@fortawesome/free-brands-svg-icons'
import {useDispatch} from "react-redux";
import {login, register} from "../actions/auth";
import {Context} from "../index";
import firebase from 'firebase'
import {useAuthState} from 'react-firebase-hooks/auth'

const CreateFrom = ({onSubmit}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || loading) return

        try {
            setLoading(true)
            await onSubmit(email, password)
            // setEmail('')
            // setPassword('')
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div onSubmit={handleSubmit}>
            <div>
                <input
                    name='email'
                    placeholder='Email'
                    type="text"
                    value={email}
                    onChange={({target: {value}}) => setEmail(value)}
                />
            </div>
            <div>
                <input
                    name='password'
                    placeholder='Password'
                    type="password"
                    value={password}
                    onChange={({target: {value}}) => setPassword(value)}

                />
            </div>
            <Link to="/forgot">Forgot your password?</Link>
            <button
                className='mt-30'
                type='submit'
                disabled={!email || !password || loading}
                onClick={() => dispatch(login(email, password, history))}
            >SIGN IN
            </button>
        </div>
    )
}

const CreateRegisterFrom = ({onSubmit}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [born_year, setBornYear] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !name || !born_year || loading) return

        try {
            setLoading(true)
            await onSubmit(name, email, born_year, password)
            // setEmail('')
            // setPassword('')
            // setName('')
            // setBornYear('')
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div onSubmit={handleSubmit}>
            <div>
                <input
                    name='name'
                    placeholder='Name'
                    type="text"
                    value={name}
                    onChange={({target: {value}}) => setName(value)}
                />
            </div>
            <div>
                <input
                    name='email'
                    placeholder='Email'
                    type="text"
                    value={email}
                    onChange={({target: {value}}) => setEmail(value)}
                />
            </div>
            <div>
                <input
                    name='born_year'
                    placeholder='Born year'
                    type="number"
                    value={born_year}
                    onChange={({target: {value}}) => setBornYear(value)}
                />
            </div>
            <div>
                <input
                    name='password'
                    placeholder='Password'
                    type="text"
                    value={password}
                    onChange={({target: {value}}) => setPassword(value)}
                />
            </div>
            <button
                type='submit'
                disabled={!name || !email || !born_year || !password || loading}
                onClick={() => dispatch(register(name, email, born_year, password, history))}
            >SIGN UP
            </button>
        </div>
    )
}

export default function Auth() {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const loginHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        const emailField = document.querySelector('input[name="email"]')
        const passwordField = document.querySelector('input[name="password"]')

        formData.append('email', emailField.value)
        formData.append('password', passwordField.value)

        // dispatch(signIn(formData))
        //

        const response = await fetch('/auth/login', {
            method: 'POST',
            body: formData
        })

        const data = await response.json();
        console.log(data)
    }

    const registerHandler = async () => {

        const formData = new FormData()
        const nameField = document.querySelector('input[name="name"]')
        const emailField = document.querySelector('input[name="email"]')
        const yearField = document.querySelector('input[name="born_year"]')
        const passwordField = document.querySelector('input[name="password"]')

        formData.append('name', nameField.value)
        formData.append('email', emailField.value)
        formData.append('born_year', yearField.value)
        formData.append('password', passwordField.value)

        const response = await fetch('/auth/register', {
            method: 'POST',
            body: formData
        })
        const data = await response.json();
        console.log(data)
    }

    const googleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            const {user} = await auth.signInWithPopup(provider)
            console.log(user)

        } catch (e) {
            console.log(e)
        }
    }

    const facebookLogin = async () => {
        try {
            const provider = new firebase.auth.FacebookAuthProvider()
            const {user} = await auth.signInWithPopup(provider)
            console.log(user)

        } catch (e) {
            console.log(e)
        }
    }

    const githubLogin = async () => {
        try {
            const provider = new firebase.auth.GithubAuthProvider()
            const {user} = await auth.signInWithPopup(provider)
            console.log(user)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        if (signUpButton) {
            signUpButton.addEventListener('click', () => {
                container.classList.add("right-panel-active");
            });
        }

        if (signInButton) {
            signInButton.addEventListener('click', () => {
                container.classList.remove("right-panel-active");
            })
        }
    }, [])

    return (
        <div>
            {/*{!user &&*/}
            <div>
                <h2>Welcome to Пиячок</h2>
                <div className="container" id="container">
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>Create Account</h1>
                            <div className="social-container">
                                <Link to="/" className="social" onClick={googleLogin}>
                                    <FontAwesomeIcon icon={faGoogle} className='fab'/></Link>
                                <Link to="/" className="social" onClick={facebookLogin}>
                                    <FontAwesomeIcon icon={faFacebookF} className='fab'/></Link>
                                <Link to="/" className="social" onClick={githubLogin}>
                                    <FontAwesomeIcon icon={faGithub} className='fab'/></Link>
                            </div>
                            <span>or use your email for registration</span>
                            <CreateRegisterFrom onSubmit={registerHandler}/>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#">
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <Link to="/" className="social" onClick={googleLogin}>
                                    <FontAwesomeIcon icon={faGoogle} className='fab'/></Link>
                                <Link to="/" className="social" onClick={facebookLogin}>
                                    <FontAwesomeIcon icon={faFacebookF} className='fab'/></Link>
                                <Link to="/" className="social" onClick={githubLogin}>
                                    <FontAwesomeIcon icon={faGithub} className='fab'/></Link>
                            </div>
                            <span>or use your account</span>
                            <CreateFrom onSubmit={loginHandler}/>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id='signIn'>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id='signUp'>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*}*/}
        </div>
    )
}
