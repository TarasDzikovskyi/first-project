import {Admin, Resource, fetchUtils} from 'react-admin';
import lb4Provider from 'react-admin-lb4'
import restProvider from 'ra-data-simple-rest'
import PubsList from "./PubsList";
import {useEffect, useState} from "react";
import {getPubs} from "../../actions/pubs";
import {useDispatch, useSelector} from "react-redux";
import {getPubsByAdmin, getUsersByAdmin} from "../../actions/admin";
import Users from "./Users/Users";
import Form from "./Form";
import './adminPage.css'
import PaginationItems from "../Pagination";
import {useLocation} from "react-router-dom";
import PaginationUserItems from "./PaginationUser";
//
// const httpClient = (url, options = {}) => {
//     if (!options.headers) {
//         options.headers = new Headers({ 'Content-Type': 'application/json' });
//     }
//     options.headers.set('Access-Control-Expose-Headers', 'Content-Range');
//     options.headers.set('Content-Range', 'posts 0-20/100');
//
//     return fetchUtils.fetchJson(url, options);
// }
//
// const dataProvider= restProvider('https://localhost:3000', httpClient)

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function AdminPage() {

    // const dispatch = useDispatch()
    //
    // const {pubs, isLoading} = useSelector((state) => state.pubs)
    //
    //
    // useEffect(() => {
    //     dispatch(getPubsByAdmin())
    // }, [dispatch])

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch()
    const query = useQuery()
    const page = query.get('page') || 1

    useEffect(() => {
        dispatch(getUsersByAdmin())
    }, [currentId, dispatch])


    return (
        <div>
            <div className='wrapper'>
                <div className='d-flex h-50'>
                    <div id='btn-error' className='animation' style={{display: 'none'}}>Error message!</div>
                    <div id='btn-success' className='animation' style={{display: 'none'}}>Success message</div>
                </div>
                <div className='d-flex w-100 j-content-between mb-100'>

                    <Users setCurrentId={setCurrentId}/>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </div>
            </div>

            {/*/!*<h1>Admin Page</h1>*!/*/}
            {/*<Admin id='wrapper' dataProvider={dataProvider}>*/}
            {/*    <Resource name='pubs' list={PubsList}/>*/}
            {/*</Admin>*/}
            <PaginationUserItems page={page}/>
        </div>


    )
}
