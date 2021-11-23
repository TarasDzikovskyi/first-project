import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getPubsByAdmin} from "../../../actions/admin";
import Pubs from "./Pubs";
import PubForm from "./PubForm";
import PaginationPubsItems from "./PaginationPub";
import {useLocation} from "react-router-dom";
import {getAllPubs} from "../../../actions/pubs";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function PubDashboard(){
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch()
    const query = useQuery()
    const page = query.get('page') || 1
    //
    useEffect(() => {
        dispatch(getPubsByAdmin(page))
    }, [currentId, dispatch])

    return(
        <div className='w'>
            <div>
                <div className='d-flex w-100 j-content-between mb-50'>
                    <Pubs setCurrentId={setCurrentId}/>
                    <PubForm currentId={currentId} setCurrentId={setCurrentId}/>
                </div>
                <PaginationPubsItems page={page}/>
            </div>
        </div>
    )
}
