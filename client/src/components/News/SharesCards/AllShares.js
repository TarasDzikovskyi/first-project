import {useHistory} from "react-router-dom";
import '../newsPage.css'
import {useEffect, useState} from "react";

export default function AllShares({pub}) {
    const history = useHistory()
    const [sortedNews, setSortedNews] = useState([])

    useEffect(() => {
        setSortedNews([...pub.news].sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1))

    },[])

    return (
        <div>
            {sortedNews && sortedNews.map((singleNews) => (

                <div>
                    {singleNews.category === 'shares' ? (
                        <div className='news_title' onClick={() => {

                            history.push(`/news/shares/${pub._id}/${singleNews._id}`)
                        }}>
                            <div>
                                {singleNews.title}
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ))}
        </div>
    )
}

