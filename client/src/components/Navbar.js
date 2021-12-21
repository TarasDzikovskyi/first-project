import React, {useContext, useEffect, useState} from 'react'
import {Link, NavLink, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGlassCheers, faHeart} from '@fortawesome/free-solid-svg-icons'
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";

export default function Navbar() {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    // console.log(userData.avatar)

    const logout = () => {

        history.push('/login');
        dispatch({type: 'LOGOUT'});

        setUserData(null)
    };

    if (userData && !userData.name) {
        logout()
    }

    return (
        <div className='mb-150 box'>
            <div className=' d-flex jc mt-22 border-nav center mb-40 w-90'>
                <Link to="/">
                    <div className='d-flex'>
                        <div className='nav-logo ml-10'>Пиячок</div>
                        <div className='icon ml-10'><FontAwesomeIcon icon={faGlassCheers}/></div>

                        {userData && userData.role === 'admin' ? (
                            <div className='ml-20'><Link to={'/root'}>Admin</Link></div>
                        ) : (<div/>)}
                    </div>
                </Link>
                <ul className='d-flex center-vertical'>
                    <li className='center-vertical'>
                        <NavLink to={'/xxx'} className='mr-20' activeClassName='isActive'>Chat</NavLink>
                    </li>
                    <li className='center-vertical'>
                        <NavLink to={'/map'} className='mr-20' activeClassName='isActive'>Карта</NavLink>
                    </li>
                    <li className='center-vertical'>
                        <NavLink to={'/alco/items'} className='mr-20' activeClassName='isActive'>Alco</NavLink>
                    </li>
                    <li className='center-vertical'>
                        <NavLink to={'/pubs'} className='mr-20' activeClassName='isActive'>Заклади</NavLink>
                    </li>
                    <li className='center-vertical'>
                        <NavLink to={'/news'} className='mr-20' activeClassName='isActive'>Новини</NavLink>
                    </li>
                    {user || userData ? (
                        <div className='d-flex'>
                            <li className='center-vertical'>
                                {user ? (
                                    <div className='name-nav'><Link to={'/user'}>{user.displayName}</Link></div>
                                ) : (
                                    <div className='name-nav '><Link to={'/user'}>{userData.name}</Link></div>
                                )}
                            </li>
                            <li className='center-vertical'>
                                {user ? (
                                    <div className='img-nav'>
                                        <img src={user.photoURL} alt="avatar" className='img'/>
                                    </div>
                                ) : (
                                    <div className='img-nav'>
                                        <img src={userData.avatar} alt="avatar" className='img'/>
                                    </div>
                                )}
                            </li>
                            <li className='center-vertical'>
                                <div>
                                    <Link to={'/user/cart'}>
                                        <FontAwesomeIcon className='heart-icon' icon={faHeart}/>
                                    </Link>
                                </div>
                            </li>
                            <li className='center-vertical'>
                                <NavLink
                                    to={"/login"}
                                    className='ml-20 mr-20 isActive'
                                    onClick={() => {
                                        auth.signOut();
                                        logout();
                                    }}
                                >Вийти
                                </NavLink>
                            </li>
                        </div>
                    ) : (
                        <li className='center-vertical'>
                            <NavLink to={"/login"} className='mr-20' activeClassName='isActive'>Увійти</NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}
