import {useState} from "react";

export default function ResetPassword() {
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    return (
        <div className='forgot reset center-box'>
            <h4>Reset Password</h4>
            <div>
                <input
                    type="text"
                    placeholder='Password'
                    value={password}
                    onChange={({target: {value}}) => setPassword(value)}/>
            </div>
            <div>
                <input
                    type="text"
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={({target: {value}}) => setConfirmPassword(value)}/>
            </div>
            <button>Submit</button>
        </div>
    )
}
