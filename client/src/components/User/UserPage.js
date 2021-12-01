import React, {useContext,} from "react";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import moment from "moment";
import {Link} from "react-router-dom";

export default function UserPage() {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const userData = JSON.parse(localStorage.getItem('profile'))

    return (
        <div className='d-flex w-90 center-box'>
            <div className='w-50'>
                <div className='center align-center w-300'>

                    <h3>My Profile</h3>
                    <div className='img-wrapper'>
                        {userData ? (
                            <img src={userData.avatar} alt='user_photo' className='img'/>
                        ) : (
                            <img src={user.photoURL} alt='user_photo' height={100}/>
                        )}
                    </div>
                    <button className='btn-user mt-30'>Edit Profile</button>
                </div>

            </div>
            <div className='w-50'>
                <div>
                    <h5>Full Name</h5>
                    <p>{userData ? (
                        <div>{userData.name}</div>
                    ) : (
                        <div>{user.displayName}</div>
                    )}</p>
                </div>
                <div>
                    <h5>Email</h5>
                    <p>{userData ? (
                        <div>{userData.email}</div>
                    ) : (
                        <div>{user.email}</div>
                    )}</p>
                </div>
                <div>
                    <h5>Joined On</h5>
                    <p>{userData ? (
                        <div>{moment(userData.createdAt).fromNow()}</div>
                    ) : (
                        <div>Joined from unknown times</div>
                    )}
                    </p>
                </div>

                <Link to={'/user/cart'}>
                    <button className='btn-user'>Улюблені заклади</button>
                </Link>

                <br/>
                <br/>

                <Link>
                    <button className='btn-user'>Change Password</button>
                </Link>

            </div>
        </div>
    )
}
