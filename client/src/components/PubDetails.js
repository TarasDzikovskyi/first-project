import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {useHistory, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPub, getPubs, newEvents, newNews, newReview, newShares} from "../actions/pubs";
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import moment from 'moment'
import {Rating} from "@material-ui/lab";
import ReviewCard from "./ReviewCard";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function PubDetails() {
    const {pub, pubs} = useSelector((state) => state.pubs)
    const dispatch = useDispatch()
    const history = useHistory()
    const {pub_id} = useParams()
    const query = useQuery()
    const page = query.get('page') || 1

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [newsText, setNewsText] = useState('')
    const [sharesText, setSharesText] = useState('')
    const [eventsText, setEventsText] = useState('')

    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        dispatch(getPub(pub_id))
        dispatch(getPubs(page))
    }, [pub_id])

    // useEffect(() => {
    //     if (pub) {
    //         dispatch(getPubsBySearch({search: 'none', tags: pub?.tags.join(',')}));
    //     }
    // }, [pub]);

    if (!pub) return 'SOSI PISOS'
    const recommendedPubs = pubs.filter(({_id}) => _id !== pub._id)
    console.log(recommendedPubs);

    const openPub = (_id) => history.push(`/pubs/${_id}`)

    const splitedTags = pub.tags.map((t) => t.split(','))
    const hashedTags = splitedTags.map(tag => tag.map(t => `#${t} `))

    const options = {
        size: "large",
        value: pub.ratings,
        readOnly: true,
        precision: 0.5,
    };

    const handleSubmitReviews = (e) => {
        e.preventDefault()

        dispatch(newReview(rating, comment, pub._id, user._id, user.name))
    }

    const handleSubmitNews = (e) => {
        e.preventDefault()

        dispatch(newNews(newsText, pub._id, user._id, user.name))
    }

    const handleSubmitShares = (e) => {
        e.preventDefault()

        dispatch(newShares(sharesText, pub._id, user._id, user.name))
    }

    const handleSubmitEvents = (e) => {
        e.preventDefault()

        dispatch(newEvents(eventsText, pub._id, user._id, user.name))
    }

    return (
        <div className='paginate w'>
            <div className='d-flex jc p-30'>
                <div className='m-details'>
                    <h2 className='ta-left'>{pub.name}</h2>
                    <h6>{moment(pub.createdAt).fromNow()}</h6>
                    <p>{hashedTags}</p>
                    <Rating {...options}/>
                    <h5 className='text-justify'>{pub.description}</h5>
                    <div className='mt-50'>
                    </div>

                    <h5>Reviews</h5>

                    <div>
                        <Rating
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            size="large"
                        />

                        <textarea
                            // className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button onClick={handleSubmitReviews}>Submit</button>

                        <div>
                            <div>
                                {pub.reviews &&
                                pub.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review}/>
                                ))}
                            </div>
                        </div>
                    </div>

                    {user && user.role === 'admin' ? (
                        <div>
                            <div>
                                <h5>News</h5>

                                <div>
                            <textarea
                                cols="30"
                                rows="5"
                                value={newsText}
                                onChange={({target: {value}}) => setNewsText(value)}/>
                                    <button onClick={handleSubmitNews}>Submit</button>
                                </div>
                            </div>

                            <div>
                                <h5>Shares</h5>

                                <div>
                            <textarea
                                cols="30"
                                rows="5"
                                value={sharesText}
                                onChange={({target: {value}}) => setSharesText(value)}/>
                                    <button onClick={handleSubmitShares}>Submit</button>
                                </div>
                            </div>

                            <div>
                                <h5>Events</h5>

                                <div>
                                    <textarea
                                        cols="30"
                                        rows="5"
                                        value={eventsText}
                                        onChange={({target: {value}}) => setEventsText(value)}/>
                                    <button onClick={handleSubmitEvents}>Submit</button>
                                </div>
                            </div>
                        </div>
                    ) : (<div></div>)}
                </div>

                <div>
                    <CardMedia
                        component="img"
                        height="380"
                        className='icon-details'
                        image={pub.avatar}
                        alt={pub.name}/>
                </div>
            </div>
            {!!recommendedPubs.length && (
                <div>
                    <h5 className='ml-20'>You might also like: (Пиячки рекомендують)</h5>
                    <div className='paginate d-flex bp jc-se'>
                        {recommendedPubs.map(({name, address, order, rating, avatar, _id}) => (
                            <div className='recomended'>
                                <div onClick={() => openPub(_id)} key={_id}>
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        className='icon-details'
                                        image={avatar}
                                        alt={name}
                                    />
                                </div>
                                <div>
                                    <div className='h-45'><b className='ml-10 mb-7'>{name}</b></div>
                                    <p className='h-45 m-0 ml-10 mb-7'>{address}</p>
                                    <p className='m-0 ml-10'>Сер. чек: {order}</p>
                                    <div className='like-recomended'>
                                        <div>
                                            <Rating size="large" value={rating} readOnly='true'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
