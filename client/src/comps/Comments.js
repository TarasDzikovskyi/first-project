import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {commentPub} from "../actions/pubs";

export default function Comments({pub}) {
    const dispatch = useDispatch()
    // const commentRef = useRef()

    const [comments, setComments] = useState([pub?.comments])
    const [comment, setComment] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'))
    // console.log(user)

    const handleComment = async () => {
        const finalComment = `${user?.displayName}: ${comment}`

        const newComments = await dispatch(commentPub(finalComment, pub._id))

        setComment('')
        setComments(newComments)

        // commentRef.current.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <div>
            <div>
                <h5>Comments</h5>
                {comments?.map((c, i) => (
                    <div key={i}>
                        <strong>{c}</strong>
                    </div>
                ))}
            </div>
            <div>
                <h6>Write a comment</h6>
                <input
                    value={comment}
                    placeholder='Залиште коментар...'
                    onChange={({target: {value}}) => setComment(value)}
                />
                <button disabled={!comment.length} onClick={handleComment}>Comment</button>
            </div>
        </div>
    )
}
