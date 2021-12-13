import {useEffect, useState} from "react";
import {getAllUsers} from "../../actions/users";
import {useDispatch, useSelector} from "react-redux";
import SingleItem from "./SingleItem";
import '../Maps/map.css'
import Loading from "../Loading/Loading";
import Map from "../Maps/Map";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackspace, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Slider, TextField} from "@material-ui/core";
import * as React from "react";
import {getAllSortedPubs} from "../../actions/pubs";
import {useHistory, useLocation} from "react-router-dom";

export default function AlcogolicItems(){
    const dispatch = useDispatch()

    const {users} = useSelector((state)=> state.users)

    useEffect(()=> {
        dispatch(getAllUsers())
    },[dispatch])

    if (!users) return <Loading/>
    return(
        <div>

            {/*<div className='map center'>*/}
            {/*    <Map/>*/}
            {/*</div>*/}

            {users && users.map((user) => (
                <div key={user._id}>
                    <SingleItem user={user} users_lenght={users.length}/>
                </div>
            ))}

        </div>
    )
}
