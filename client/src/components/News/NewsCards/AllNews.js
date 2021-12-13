import {useHistory} from "react-router-dom";
import '../newsPage.css'
import {useEffect, useState} from "react";

export default function AllNews({pub}) {
    const history = useHistory()
    const [sortedNews, setSortedNews] = useState([])

    const sorted = [...pub.news].sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1)

    useEffect(() => {
        setSortedNews(sorted)
    },[])

    return (
        <div>
            {sortedNews && sortedNews.map((singleNews) => (

                <div>
                    {singleNews.category === 'news' ? (
                        <div className='news_title' onClick={() => {

                            history.push(`/news/news/${pub._id}/${singleNews._id}`)
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
