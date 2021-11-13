import React, {useContext, useState} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import moment from "moment";
import {updatePub} from "../actions/pubs";
import {useDispatch} from "react-redux";
import {updateUser} from "../actions/auth";
import {Link} from "react-router-dom";

export default function UserPage() {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const userData = JSON.parse(localStorage.getItem('profile'))
    console.log(userData)
    const dispatch = useDispatch()

    const [newName, setNewName] = useState('')
    const [newBornYear, setNewBornYear] = useState('')
    const [newEmail, setNewEmail] = useState('')


    const updateHandleForm = async () => {
        if (!newName) return

        await dispatch(updateUser(userData._id, {name: newName}))
    }

    const showVisible = () => {
        const input = document.getElementById('user-page');
        if (input.style.display === "none") {
            input.style.display = "block"
        } else {
            input.style.display = "none"

        }
    }


    return (
        <div className='d-flex center-box'>
            <div className="main-content">
                <div className="container mt-7">
                    <div className="mb-5 mt-10 m-0">
                        {user || userData ? (
                            <div className='d-flex center-box'>
                                {user ? (
                                    <h3>{user.displayName}</h3>
                                ) : (
                                    <h3>{userData.name}</h3>
                                )}
                            </div>
                        ) : (
                            <div>Error</div>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-xl-8 m-auto order-xl-2 mb-5 mb-xl-0">
                            <div className="card card-profile shadow">
                                <div className="row justify-content-center">
                                    <div className="col-lg-3 order-lg-2">
                                        <div className="card-profile-image">
                                            {user || userData ? (
                                                <div className='d-flex center-box'>
                                                    {user ? (
                                                        <img src={user.photoURL} className='rounded-circle mt-22 '/>
                                                    ) : (
                                                        <img src={userData.avatar} className='rounded-circle mt-22 '/>
                                                    )}
                                                </div>
                                            ) : (
                                                <div>Error</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <button onClick={showVisible} className="">Edit</button>

                                    <div className="d-flex center-box" onClick={updateHandleForm}>
                                        <div
                                            id='user-page'
                                            style={{display: 'none'}}
                                            className='center-box edit-div animate__animated animate__zoomInDown'>
                                            <input
                                                type='text'
                                                placeholder='Name'
                                                onChange={({target: {value}}) => setNewName(value)}
                                            />
                                            <button onClick={updateHandleForm}>Update</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-22">
                                    {/*<div className="center-box">*/}
                                    {/*    {user ? (*/}
                                    {/*        <i>{moment(user.createdAt).fromNow()}</i>*/}

                                    {/*        ) : (*/}
                                    {/*    <i>{moment(userData.createdAt).fromNow()}</i>*/}
                                    {/*    )}*/}
                                    {/*</div>*/}
                                    {user || userData ? (
                                        <div className="center-box">
                                            {user ? (
                                                <div>{user.email}</div>
                                            ) : (
                                                <div>{userData.email}</div>
                                            )}
                                        </div>
                                    ) : (
                                        <div>Error</div>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className='center'>
                            <div>

                                <Link to={'/reset:'}>Change Password?</Link>
                            </div>
                            <div className='mt-22'>
                                <b>Пиячок - споживай відповідально!</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
