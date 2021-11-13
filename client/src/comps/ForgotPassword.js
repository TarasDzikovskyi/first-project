import {useState} from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/auth/forgot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email
            })
        })

        await response.json()
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='center-box forgot'>
                <h4>Forgot Password? <br/>Треба було менше пити</h4>
                <input
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={({target: {value}}) => setEmail(value)}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}
