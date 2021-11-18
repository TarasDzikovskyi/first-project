import {useState, useRef, useContext} from "react";
import {useDispatch} from "react-redux";
import {commentPub} from "../actions/pubs";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

export default function Comments({pub}) {
    const dispatch = useDispatch()
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const userData = JSON.parse(localStorage.getItem('profile'))

    const [comments, setComments] = useState(pub?.comments)
    const [comment, setComment] = useState('')

    const handleComment = async () => {
        if (user) {
            const finalComment = `${user.displayName}: ${comment}`
            const newComments = await dispatch(commentPub(finalComment, pub._id))
            setComments(newComments)
        } else {
            const finalComment = `${userData?.name}: ${comment}`
            const newComments = await dispatch(commentPub(finalComment, pub._id))
            setComments(newComments)
        }
        setComment('')
    }

    return (
        <div>
            <h5>Comments</h5>
            <div className='comments'>
                {comments.map((c, i) => (
                    <div key={i}>
                        <b>{c.split(': ')[0]}</b>
                        {c.split(':')[1]}
                        <div className='mt-10'/>
                    </div>
                ))}
            </div>
            {user || userData ? (
                <div className='mt-22'>
                    <h6>Write a comment</h6>
                    <input
                        value={comment}
                        className='w-500'
                        placeholder='Залиште коментар...'
                        onChange={({target: {value}}) => setComment(value)}
                    />
                    <button disabled={!comment} onClick={handleComment}>Comment</button>
                </div>
            ) : (
                <div>Comments is not access, please signIn</div>
            )}
        </div>
    )
}
