// import 'materialize-css';
import {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import '../index.css'
import '../styles/auth.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebookF, faGoogle, faGithub} from '@fortawesome/free-brands-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../actions/auth";
import {Context} from "../index";
import firebase from 'firebase/compat'
import {useAuthState} from 'react-firebase-hooks/auth'

export default function Auth() {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({name: '', email: '', password: '', born_year: ''})

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        console.log(isSignup)
    }

    const handleAuthSubmit = (e) => {
        e.preventDefault();

        // if (!email || !password || loading) return

        try {
            if (isSignup) {
                dispatch(register(formData, history));
                } else {
                console.log('xxxxx')
                dispatch(login(formData, history));
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const googleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            const {user} = await auth.signInWithPopup(provider)
            //     .then((userAuth) => {
            //     if (userAuth) {
            //         setIsAuth(true)
            //     }
            // })
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


                            <div>
                                <div>
                                    <input
                                        name='name'
                                        placeholder='Name'
                                        type="text"
                                        value={formData.name}
                                        onChange={({target: {value}}) => setFormData({...formData, name: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        name='email'
                                        placeholder='Email'
                                        type="text"
                                        value={formData.email}
                                        onChange={({target: {value}}) => setFormData({...formData, email: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        name='born_year'
                                        placeholder='Born year'
                                        type="number"
                                        value={formData.born_year}
                                        onChange={({target: {value}}) => setFormData({...formData, born_year: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        name='password'
                                        placeholder='Password'
                                        type="text"
                                        value={formData.password}
                                        onChange={({target: {value}}) => setFormData({...formData, password: value})}
                                    />
                                </div>
                                <button
                                    type='submit'
                                    disabled={!formData.name || !formData.email ||
                                    !formData.born_year || !formData.password || loading}
                                    onClick={handleAuthSubmit}
                                >SIGN UP
                                </button>
                            </div>


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


                            <div>
                                <div>
                                    <input
                                        name='email'
                                        placeholder='Email'
                                        type="text"
                                        value={formData.email}
                                        onChange={({target: {value}}) => setFormData({...formData, email: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        name='password'
                                        placeholder='Password'
                                        type="password"
                                        value={formData.password}
                                        onChange={({target: {value}}) => setFormData({...formData, password: value})}

                                    />
                                </div>
                                <Link to="/forgot">Forgot your password?</Link>
                                <button
                                    className='mt-30'
                                    type='submit'
                                    disabled={!formData.email || !formData.password || loading}
                                    onClick={handleAuthSubmit}
                                >SIGN IN
                                </button>
                            </div>



                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id='signIn' onClick={switchMode}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id='signUp' onClick={switchMode}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*}*/}
        </div>
    )
}
