import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {newsPub} from "../../../actions/pubs";

export default function NewsForm({ currentId }) {
    const dispatch = useDispatch()

    const pub = useSelector((state) => currentId ? state.pubs.pubs.find((pub) => pub._id === currentId) : null)

    const [currentPub, setCurrentPub] = useState([])

    useEffect(() => {
        if (pub) setCurrentPub(pub)
    }, [pub])

    const [news, setNews] = useState(currentPub?.news)
    const [singleNews, setSingleNews] = useState('')

    const handleNews = async () => {
            const finalNews = `${singleNews}`
            const newNews = await dispatch(newsPub(finalNews, currentPub._id))
            setNews(newNews)
        setNews('')
    }

    return (
        <div>
             <div>
             <h5>News</h5>

                <div className='mt-22'>
                    <h6>Write a news</h6>
                    <input
                        value={singleNews}
                        className='w-500'
                        placeholder='Write a news...'
                        onChange={({target: {value}}) => setSingleNews(value)}
                    />
                    <button disabled={!singleNews} onClick={handleNews}>Send</button>
                </div>
        </div>

        </div>
    )
}
