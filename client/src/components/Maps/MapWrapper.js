import Map from "./Map";
import List from "./List";
import {useEffect, useState} from "react";
import {getPlacesData} from "../../API";
import {useDispatch, useSelector} from "react-redux";
import {getAllSortedPubs} from "../../actions/pubs";
import Loading from "../Loading/Loading";

export default function MapWrapper() {
    const [places, setPlaces] = useState([])
    const [place, setPlace] = useState('')
    const [currentId, setCurrentId] = useState(null)
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState('')
    const dispatch = useDispatch()

    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coordinates: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude})
        })
    }, [])


        console.log(coordinates, bounds)
    useEffect(() => {

        // getPlacesData()
        //     .then((data) => {
        //         console.log(data)
        //
        //         setPlaces(data)
        //     })

    }, [coordinates, bounds])


    // const query = useQuery()

    const [loading, setLoading] = useState(false)

    const {pubs} = useSelector((state) => state.pubs)

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true)
            try {
                let query

                if (category && !rating) {
                    query = `?${category}`
                } else {
                    query = `?${rating}`
                }

                if (rating) {
                    if (query.length === 0) {
                        query = `?${rating}`
                    } else {
                        query = query + `&${rating}`
                    }
                }

                await dispatch(getAllSortedPubs(query))

                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()

    }, [dispatch, rating, category])

    if (!pubs.data) return <Loading/>

    const coors = pubs.data ? pubs.data.map((pub) => pub.location.coordinates) : null

    const location = coors.map((l) => ({lat: l[0], lng: l[1]}))

    return (
        <div className='w-90 center-box'>
            <h1>hello</h1>

            <div>
                <input type="text" placeholder='Search...'/>
            </div>
            <div className='d-flex jc-sa'>
                <div className='w-30'>
                    <h2>list</h2>
                    <List
                        setCategory={setCategory}
                        setRating={setRating}
                        setCurrentId={setCurrentId}
                        pubs={pubs.data}
                    />
                </div>
                <div className='w-65'>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        pubs={pubs.data}
                        location={location}
                    />
                </div>
            </div>

        </div>
    )
}
