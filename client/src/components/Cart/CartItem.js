import {removeItemFromCart} from "../../actions/cart";
import {useDispatch} from "react-redux";
import './cart.css'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as React from "react";
import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";


export default function CartItem({item, user}) {

    const dispatch = useDispatch()
    const history = useHistory()

    const deleteCartItems = (e) => {
        e.preventDefault()

        dispatch(removeItemFromCart(user._id, item._id))
    }

    const openPub = () => {
        history.push(`/pubs/${item._id}`)
    }

    return (
        <div className='center-box'>

            <div  className='m-50' >
                <div className='cart-items d-flex'>

                    <div className='w-40 ' onClick={openPub}>
                        <img src={item.avatar} alt="pub" height={150} width='100%'/>
                    </div>
                    <div className='w-55'>
                        <h5>
                            {item.name}
                        </h5>
                        <p>{item.description}</p>
                    </div>

                    <div className='w-5'>
                        <FontAwesomeIcon
                            className='small-icon'
                            icon={faTrash}
                            onClick={deleteCartItems}/>
                    </div>
                </div>
            </div>

        </div>
    )
}
