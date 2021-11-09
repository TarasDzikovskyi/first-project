import {useState} from "react";
import {Link} from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {}
    }


    return (
        <form onSubmit={handleSubmit} className='center-box forgot'>
                <h4>Forgot Password? <br/>Треба було менше пити</h4>
                <input
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={({target: {value}}) => setEmail(value)}
                />
                <button><Link to={'/reset'}>Submit</Link></button>
        </form>
    )
}
