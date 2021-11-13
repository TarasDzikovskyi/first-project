import React, {useContext} from 'react'
import {Link, NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGlassCheers} from '@fortawesome/free-solid-svg-icons'
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useHistory} from "react-router";

export default function Navbar() {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const history = useHistory()
    const userData = JSON.parse(localStorage.getItem('profile'))
    console.log(userData);

    return (
        <div>
            <div className='w d-flex jc mt-22 border-nav center mb-40'>
                <Link to="/">
                    <div className='d-flex'>
                        <div className='nav-logo ml-10'>Пиячок</div>
                        <div className='icon ml-10'><FontAwesomeIcon icon={faGlassCheers}/></div>
                        <div className='ml-20'><Link to={'/root'}>Admin</Link></div>
                    </div>
                </Link>
                <ul className='d-flex mt-22'>
                    <li><NavLink to={'/pubs'} className='mr-20' activeClassName='isActive'>Pubs</NavLink></li>
                    <li><NavLink to={'/news'} className='mr-20' activeClassName='isActive'>News</NavLink></li>
                    {user || userData ? (
                        <div className='d-flex'>
                            <li>
                                {user ? (
                                    <div className='name-nav'><Link to={'/user'}>{user.displayName}</Link></div>
                                ) : (
                                    <div className='name-nav'><Link to={'/user'}>{userData.name}</Link></div>
                                )}
                            </li>
                            <li>
                                <NavLink
                                    to={"/login"}
                                    className='ml-20 mr-20 isActive'
                                    onClick={() => {
                                            auth.signOut();
                                            // localStorage.clear()
                                    }}
                                >Logout
                                </NavLink>
                            </li>
                        </div>
                    ) : (
                        <li><NavLink to={"/login"} className='mr-20' activeClassName='isActive'>Sign In</NavLink></li>
                    )}
                </ul>
            </div>
        </div>
    )
}
