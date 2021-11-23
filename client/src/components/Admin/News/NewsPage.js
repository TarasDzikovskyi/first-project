import {useState, useRef, useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Context} from "../../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {createPub, deletePub, newsPub, updatePub} from "../../../actions/pubs";

export default function NewsPage({currentId, setCurrentId}) {
    const dispatch = useDispatch()
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const userData = JSON.parse(localStorage.getItem('profile'))

    const pub = useSelector((state) => currentId ? state.pubs.pubs.find((pub) => pub._id === currentId) : null)

    const [news, setNews] = useState({news: []})

    useEffect(() => {
        if (pub) setNews(pub)
    }, [pub])

    const clear = () => {
        setCurrentId(0);
        setNews({news: []});
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        // if (
        //     !data.name ||
        //     !data.address ||
        //     !data.contact ||
        //     !data.tags ||
        //     !data.order ||
        //     !data.description ||
        //     !data.schedule
        // ) return

        // if (currentId) {
            dispatch(updatePub(currentId, news))
            // success()
            clear()
        // } else {
            // dispatch(createPub(data))
            // success()
            // clear()
        // }
    }



    console.log(news)

    return (
        <div>
            <h3>News</h3>

            <div>
                <button className='btn-link' onClick={() => {
                    clear()
                }}>Clear Form</button>

                <form onSubmit={handleSubmit}
                      id='createPubsForm'
                      className='form-wrapper center p-10 box shadow'>
                    {/*<h2>{currentId ? <div>{data.name}</div> : 'Create pub'}</h2>*/}
                    <div>
                        <label>News
                            <input
                                id='news'
                                type="text"
                                className='pl-15 aaa'
                                value={news.news}
                                onChange={({target: {value}}) => setNews({...news, news: value})}
                            />
                        </label>
                    </div>

                    {currentId ?
                        <div className='d-flex j-content-between w-100'>
                            {/*<button*/}
                            {/*    onClick={() => {*/}
                            {/*        dispatch(deletePub(pub._id))*/}
                            {/*        success()*/}
                            {/*        clear()*/}
                            {/*    }}*/}
                            {/*    className='btn-create btn-delete mt-20'>Delete*/}
                            {/*</button>*/}
                            <button type='submit' className=' btn-create mt-20'>Save</button>
                        </div> :
                        <button type='submit' className='center btn-create mt-20'>Create</button>
                    }

                </form>
            </div>

        </div>




    )
}
