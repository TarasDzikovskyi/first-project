import * as React from "react";
import {useEffect, useState} from "react";
import {getAllSortedPubs} from "../../actions/pubs";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import PubOnMap from "./PubOnMap";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function List({setRating, setCategory, setCurrentId, pubs}) {
    // const [currentId, setCurrentId] = useState(null)
    // const [category, setCategory] = useState('')
    // const [rating, setRating] = useState('')
    // const dispatch = useDispatch()
    // // const query = useQuery()
    //
    // const [loading, setLoading] = useState(false)
    //
    // const {pubs} = useSelector((state) => state.pubs)
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //
    //         setLoading(true)
    //         try {
    //             let query
    //
    //             if (category && !rating) {
    //                 query = `?${category}`
    //             } else {
    //                 query = `?${rating}`
    //             }
    //
    //             if (rating) {
    //                 if (query.length === 0) {
    //                     query = `?${rating}`
    //                 } else {
    //                     query = query + `&${rating}`
    //                 }
    //             }
    //
    //             await dispatch(getAllSortedPubs(query))
    //
    //             setLoading(false)
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }
    //     fetchData()
    //
    // }, [dispatch, rating, category])
    //
    //
    // const handleCategorySubmit = ({target: {value}}) => {
    //     if (value === 'hookah') {
    //         setCategory('category=hookah')
    //     } else if (value === 'bar') {
    //         setCategory('category=bar')
    //     } else if (value === 'cafe') {
    //         setCategory('category=cafe')
    //     } else if (value === 'wedding') {
    //         setCategory('category=wedding')
    //     } else if (value === 'birthday') {
    //         setCategory('category=birthday')
    //     } else if (value === 'office-party') {
    //         setCategory('category=office-party')
    //     } else if (value === 'club') {
    //         setCategory('category=club')
    //     }
    //
    // }
    //
    // const handleRatingSubmit = ({target: {value}}) => {
    //     if (value === '3') {
    //         setRating('rating=3')
    //     } else if (value === '4') {
    //         setRating('rating=4')
    //     } else if (value === '5') {
    //         setRating('rating=5')
    //     }
    // }

    const handleCategorySubmit = ({target: {value}}) => {
        if (value === 'hookah') {
            setCategory('category=hookah')
        } else if (value === 'bar') {
            setCategory('category=bar')
        } else if (value === 'cafe') {
            setCategory('category=cafe')
        } else if (value === 'wedding') {
            setCategory('category=wedding')
        } else if (value === 'birthday') {
            setCategory('category=birthday')
        } else if (value === 'office-party') {
            setCategory('category=office-party')
        } else if (value === 'club') {
            setCategory('category=club')
        }

    }

    const handleRatingSubmit = ({target: {value}}) => {
        if (value === '3') {
            setRating('rating=3')
        } else if (value === '4') {
            setRating('rating=4')
        } else if (value === '5') {
            setRating('rating=5')
        }
    }

    return (
        <div className='h-list'>
            <div className='d-flex'>
                <div className='center-vertical'>
                    <select className='select-nav w-select3' onChange={handleCategorySubmit} defaultValue='SORT'>
                        <option disabled value="SORT">Категорія</option>
                        <option value='wedding'>Для весілля</option>
                        <option value='club'>Клуб</option>
                        <option value='hookah'>Кальянна</option>
                        <option value='bar'>Бар</option>
                        <option value='cafe'>Кафе</option>
                        <option value='office-party'>Для корпоративу</option>
                        <option value='birthday'>Для дня народження</option>
                    </select>
                </div>

                <div className='center-vertical'>
                    <select className='select-nav w-select3' onChange={handleRatingSubmit} defaultValue='SORT'>
                        <option disabled value="SORT">Rating</option>
                        <option value='3'>3 stars</option>
                        <option value='4'>4 stars</option>
                        <option value='5'>5 stars</option>
                    </select>
                </div>

            </div>

            {pubs.map((pub) => (

                <div key={pub._id}>
                    <PubOnMap setCurrentId={setCurrentId} pub={pub}/>
                </div>
            ))}

        </div>
    )
}
