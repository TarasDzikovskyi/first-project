import {useDispatch, useSelector} from "react-redux";
import Pub from "./Pub";
import {getPubsByAdmin} from "../../../actions/admin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {getPubsByOnlySearch} from "../../../actions/pubs";
import {DataGrid} from "@material-ui/data-grid";
import * as React from "react";
import {Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Pubs({setCurrentId}){
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const {pubs} = useSelector((state) => state.pubs)
    console.log(pubs)

     const pub = pubs.map((pub) => pub)

    if (!pubs.length) return 'No pubs'

    const searchPub = () => {
        if (search.trim()) {
            dispatch(getPubsByOnlySearch({search}))
            // history.push(`/root/search?searchQuery=${search || 'none'}`)
        } else {
            dispatch(getPubsByAdmin(1))
            // history.push('/root')
        }
    }

    return(
        <div className='w-65'>
            <div>
                <div className='d-flex pl-15'>
                    <div className='search-input'>
                        <input
                            type='text'
                            placeholder='Пошук закладів...'
                            onChange={({target: {value}}) => setSearch(value)}
                        />
                    </div>
                    <FontAwesomeIcon icon={faSearch} className='ml-20 icon center-vertical' onClick={searchPub}/>

                </div>
            </div>

            <div className='table-wrapper h-780 shadow'>
                <div className='d-flex j-content-around w-100 header-table'>
                    <div className='w-20 tr-text'>NAME</div>
                    <div className='w-30 tr-text'>ID</div>
                    <div className='w-30 tr-text'>ADDRESS</div>
                    {/*<div className='w-20 tr-text'>CONTACT</div>*/}
                    <div className='w-10 tr-text'>ORDER</div>
                </div>
                {pubs.map((pub) => (
                    <div key={pub._id}>
                        <Pub pub={pub} pubs={pubs} setCurrentId={setCurrentId}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
