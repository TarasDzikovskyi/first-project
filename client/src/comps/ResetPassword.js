import {useState} from "react";
import Swal from 'sweetalert2'
import {Redirect} from "react-router-dom";

export default function ResetPassword(props) {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Упс...',
                text: 'Різні паролі. Спробуйте ще!',
            })
        } else {
            const response = await fetch('http://localhost:5000/auth/reset', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    password: confirmPassword,
                    action_token: props.match.params.token
                })
            })

            const data = await response.json()
            setRedirect(true)
            console.log(data)
        }
    }

    if (redirect) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='forgot reset center-box'>
                <h4>Reset Password</h4>
                <div>
                    <input
                        name='first'
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={({target: {value}}) => setPassword(value)}/>
                </div>
                <div>
                    <input
                        name='second'
                        type="password"
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={({target: {value}}) => setConfirmPassword(value)}/>
                </div>
                <button>Reset</button>
            </form>
        </div>
    )
}
