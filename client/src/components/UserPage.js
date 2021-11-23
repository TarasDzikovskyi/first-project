import React, {useContext,} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import moment from "moment";


export default function UserPage() {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const userData = JSON.parse(localStorage.getItem('profile'))
    console.log(userData)

    return (
        <div className='d-flex w'>
            <div className='w-50'>
                <div className='center align-center w-300'>

                    <h3>My Profile</h3>
                    <div className='img-wrapper'>
                        {userData ? (
                            <img src={userData.avatar} className='img'/>
                        ) : (
                            <img src={user.photoURL} height={100}/>
                        )}
                    </div>
                    {/*<img src={} alt=""/>*/}
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
                <button>My favourite pubs</button>
                <br/>
                <br/>
                <button>Change Password</button>

            </div>
        </div>
    )
}
