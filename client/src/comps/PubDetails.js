import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPub, getPubsBySearch, likePub} from "../actions/pubs";
import Comments from "./Comments";
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import moment from 'moment'
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

export default function PubDetails() {

    const {pub, pubs} = useSelector((state) => state.pubs)
    const dispatch = useDispatch()
    const history = useHistory()
    const {pub_id} = useParams()
    const [recomendedPubs, setRecomendedPubs] = useState([])
    // console.log(pubs)

    useEffect(() => {
        dispatch(getPub(pub_id))
        setRecomendedPubs(pubs)
    }, [pub_id])

    //
    // useEffect(() => {
    //     if (pub) {
    //         dispatch(getPubsBySearch({search: 'none', tags: pub?.tags.join(',')}));
    //     }
    // }, [pub]);

    if (!pub) return 'nema nicho'
    const recommendedPubs = recomendedPubs.filter(({_id}) => _id !== pub._id)
    console.log(recommendedPubs);

    const openPub = (_id) => history.push(`/pubs/${_id}`)
    // console.log(pub);

    const splitedTags = pub.tags.map((t) => t.split(','))
    const hashedTags = splitedTags.map(tag => tag.map(t => `#${t} `))

    return (
        <div className='paginate mw'>
            <div className='d-flex jc p-30'>
                <div className='m-details'>
                    <h2 className='ta-left'>{pub.name}</h2>
                    <h6>{moment(pub.createdAt).fromNow()}</h6>
                    <p>{hashedTags}</p>
                    <h5 className='text-justify'>{pub.statistic}</h5>
                    <div className='mt-50'>
                        <Comments pub={pub}/>
                    </div>
                </div>
                <div>
                    <CardMedia
                        component="img"
                        height="380"
                        className='icon-details'
                        image={pub.avatar}
                        alt={pub.name}
                    />
                </div>
            </div>
            {!!recommendedPubs.length && (
                <div>
                    <h5 className='ml-20'>You might also like: (Пиячки рекомендують)</h5>
                    <div className='paginate d-flex bp jc-se'>
                        {recommendedPubs.map(({name, likeCount, address, avatar, _id}) => (
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
                                <div className='p-10'>
                                    <div className='h-45'><b className='ml-10 mb-7'>{name}</b></div>
                                    <p className='m-0 ml-10 mb-7'>{address}</p>
                                    <p className='m-0 ml-10'>Av. bill:</p>
                                    <div className='like-recomended'>
                                        <div>
                                            <IconButton aria-label="add to favorites"
                                                        onClick={() => dispatch(likePub(_id))}>
                                                <FavoriteIcon/>
                                                {likeCount}
                                            </IconButton>
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
