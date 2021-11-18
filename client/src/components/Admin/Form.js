import {useEffect, useState} from "react";
import {createUserByAdmin, deleteUserByAdmin, updateUserByAdmin} from "../../actions/admin";
import {useDispatch, useSelector} from "react-redux";

export default function Form({currentId, setCurrentId}) {
    const dispatch = useDispatch()
    const user = useSelector((state) => currentId ? state.users.users.find((user) => user._id === currentId) : null)

    const [data, setData] = useState({
        name: '',
        email: '',
        born_year: '',
        password: ''
    })

    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        if (user) setData(user)
    }, [user])

    const clear = () => {
        setCurrentId(0);
        setData({
            name: '',
            email: '',
            born_year: '',
            password: ''
        });
        setConfirmPassword('')
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            !data.name ||
            !data.password ||
            !data.email ||
            !data.born_year
        ) return

        if (currentId) {
                dispatch(updateUserByAdmin(currentId, data))
                success()
                clear()
            } else {
            dispatch(createUserByAdmin(data))
            success()
            clear()
        }
    }

    const error = () => {
        setTimeout(() => {
            document.getElementById('btn-error').style.display = 'block'
            setTimeout(() => {
                document.getElementById('btn-error').style.display = 'none'
            }, 2000)
        }, 300)
    }

    const success = () => {
        setTimeout(() => {
            document.getElementById('btn-success').style.display = 'block'
            setTimeout(() => {
                document.getElementById('btn-success').style.display = 'none'
            }, 3000)
        }, 500)
    }

    return (
        <div className='w-33 mt-50'>
            <form onSubmit={handleSubmit}
                  id='create-form'
                  style={{display: 'none'}}
                  className='form-wrapper center p-10 box h-670'>
                <div className='btn-close' onClick={() => {
                    clear();
                    const input = document.getElementById('create-form');
                    input.style.display = 'none'
                }}>X
                </div>
                <h2>{currentId ? <div>{data.name}</div> : 'Create new user'}</h2>
                <div className='mt-20'>
                    <label>Name*
                        <input
                            type="text"
                            className='pl-15'
                            value={data.name}
                            onChange={({target: {value}}) => setData({...data, name: value})}
                        />
                    </label>
                </div>
                <div className='mt-20'>
                    <label>Born year*
                        <input
                            type="number"
                            className='pl-15'
                            value={data.born_year}
                            required
                            onChange={({target: {value}}) => setData({...data, born_year: value})}
                        />
                    </label>
                </div>
                <div className='mt-20'>
                    <label>Email*
                        <input
                            type="email"
                            className='pl-15'
                            value={data.email}
                            required
                            onChange={({target: {value}}) => setData({...data, email: value})}
                        />
                    </label>
                </div>
                <div className='mt-20'>
                    <label>Password*
                        <input
                            type="password"
                            className='pl-15'
                            value={data.password}
                            onChange={({target: {value}}) => setData({...data, password: value})}
                        />
                    </label>
                </div>

                {currentId ?
                    <div className='d-flex j-content-between w-100'>
                        <button
                            onClick={() => {
                                dispatch(deleteUserByAdmin(user._id))
                                success()
                                clear()
                            }}
                            className='btn-create btn-delete mt-20'>Delete
                        </button>
                        <button type='submit' className=' btn-create mt-20'>Save</button>
                    </div> :
                    <button type='submit' className='center btn-create mt-20'>Create</button>
                }

            </form>
        </div>
    )
}
