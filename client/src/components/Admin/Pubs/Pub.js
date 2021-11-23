import {DataGrid} from "@material-ui/data-grid";
import * as React from "react";
import {Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {deletePub, deleteShares} from "../../../actions/pubs";
import {useDispatch} from "react-redux";

export default function Pub({pub, pubs, setCurrentId}) {
    const dispatch = useDispatch()





    return (
        <div>

            <div className='d-flex j-content-around user-tr' onClick={() => setCurrentId(pub._id)}>
                <div className='w-20 tr-text'>{pub.name}</div>
                <div className='w-30 tr-text'>{pub._id}</div>
                <div className='w-30 tr-text'>{pub.address}</div>
                {/*<div className='w-20 tr-text'>{pub.contact}</div>*/}
                <div className='w-10 tr-text'>{pub.order}</div>
            </div>
        </div>
    )
}
