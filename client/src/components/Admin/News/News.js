import NewsList from "./NewsList";
import {useEffect, useState} from "react";
import {getPubsByAdmin} from "../../../actions/admin";
import {useDispatch} from "react-redux";
import NewsPage from "./NewsPage";
import {useLocation} from "react-router-dom";
import PaginationPubsItems from "../Pubs/PaginationPub";
import NewsForm from "./NewsForm";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function News() {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch()
    const query = useQuery()
    const page = query.get('page') || 1

    useEffect(() => {
        dispatch(getPubsByAdmin(page))
    }, [currentId, dispatch])

    return (
        <div className='w'>

            <div className='d-flex'>
                <div className='w-33'>
                    <NewsList currentId={currentId} setCurrentId={setCurrentId}/>
                </div>
                <div className='w-65'>
                    <NewsPage currentId={currentId} setCurrentId={setCurrentId}/>
                    <NewsForm currentId={currentId}/>
                </div>


            </div>
            <PaginationPubsItems page={page}/>
        </div>
    )
}
