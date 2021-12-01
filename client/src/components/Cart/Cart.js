import {useDispatch, useSelector} from 'react-redux'
import CartItem from "./CartItem";
import {useEffect, useState} from "react";
import {getUser} from "../../actions/users";

export default function Cart() {
    const {user} = useSelector((state) => state.users);
    const userDB = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()

    const [data, setData] = useState([])

    useEffect(() => {
        dispatch(getUser(userDB._id))
        setData(user)

    },[dispatch])

    console.log(data)

    return (
        <div className='w-90 center-box'>
            <div>
                <h1>Cart</h1>
            </div>
            <div>
                {!user && (
                    <h2>Please Login.</h2>
                )}
            </div>

            <div className='d-flex jc-sa x'>
                {user && user.cart.map((item) => (
                    <div key={item._id} className='w-50'>
                        <CartItem item={item} user={user}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
