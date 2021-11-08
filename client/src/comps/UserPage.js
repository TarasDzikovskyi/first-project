import React, {useContext} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import moment from "moment";

export default function UserPage() {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const userData = JSON.parse(localStorage.getItem('profile'))
    console.log(userData)


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
                                    <div className="d-flex center-box">
                                        <a href="#" className="btn btn-sm btn-default float-right">Edit</a>
                                    </div>
                                </div>
                                    <div className="text-center mt-22">
                                        <div className="center-box">
                                            <i>{moment(userData.createdAt).fromNow()}</i>
                                        </div>
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
                        <div className='d-flex center-box'>
                            <b>Пиячок - споживай відповідально!</b>
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}
