import 'materialize-css';
// import {useSelector} from "react-redux";
import {useState} from "react";
import {Link} from "react-router-dom";
import '../index.css'

const CreateFrom = ({onSubmit}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

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
        <form onSubmit={handleSubmit}>
            <div className='input-field'>
                <label htmlFor='email'>Email</label>
                <input
                    placeholder='Email'
                    type="text"
                    value={email}
                    onChange={({target: {value}}) => setEmail(value)}
                />
            </div>
            <div>
                <label htmlFor="email">Password</label>
                <input
                    placeholder='Password'
                    type="password"
                    value={password}
                    onChange={({target: {value}}) => setPassword(value)}

                />
            </div>
            <button
                className='btn yellow darken-4'
                style={{marginRight: 10}}
                type='submit'
                disabled={!email || !password || loading}
            >Login
            </button>
        </form>
    )
}

export default function Auth() {
    const loginHandler = async (email, password) => {
        if (!email || !password) return;

        const response = await fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(response)
        const data = await response.json();
        console.log(data)
    }

    return (
        <div>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Welcome to Пиячок</span>
                            <p>Дякуємо, що скористались нашою послугою "Пиячка". Сподіваємось Ви знайдете заклад, який
                                Вам допоможе розслабитись.</p>

                                <CreateFrom onSubmit={loginHandler}/>

                                <button
                                    className='btn grey lighten-1 black-text mt'
                                    type='submit'
                                    style={{textDecoration: 'none'}}
                                ><Link to={'/register'}>Registration</Link>
                                </button>
                        </div>
                    </div>
                </div>
            </div>

            <div><Link to={'/'}>GO TO MAIN PAGE</Link></div>
            <div><Link to={'/pubs'}>GO TO TOP PUBS PAGE</Link></div>
            <div><Link to={'/alco'}>ALCOGOLIC</Link></div>
            <div><Link to={'/user'}>GO TO USER PAGE</Link></div>
            <div><Link to={'/admin'}>GO TO ADMIN PAGE</Link></div>

        </div>
    )
}
