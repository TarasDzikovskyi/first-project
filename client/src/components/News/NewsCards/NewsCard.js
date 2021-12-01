import {useEffect, useState} from "react";
import {getAllPubs} from "../../../actions/pubs";
import {useDispatch, useSelector} from "react-redux";
import AllNews from "./AllNews";

export default function NewsCard() {
    const dispatch = useDispatch()

    const [sortedPubs, setSortedPubs] = useState([])

    const {pubs} = useSelector((state) => state.pubs)

    useEffect(() => {
        dispatch(getAllPubs())

        setSortedPubs([...pubs].sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1))

    }, [dispatch])

    console.log(pubs)
    console.log(sortedPubs)

    return (
        <div className='w-80 center-box'>
            <h1>Новини</h1>

            <div className='w-100 '>

                {sortedPubs.map((pub) => (
                    <div key={pub._id}>
                        <AllNews pub={pub}/>
                    </div>
                ))}
            </div>
        </div>
    )
}