
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPubs} from "../actions/pubs";



export default function Main() {
    // const dispatch = useDispatch()
    //
    // const {pubs, isLoading} = useSelector((state) => state.pubs)
    //
    // // const {users} = useSelector((state) => state.users)
    // // console.log(users)
    //
    // useEffect(() => {
    //     dispatch(getPubs(1))
    // }, [dispatch])


    return (
        <div className='w-90 center-box'>
            <h1>Main Page</h1>

            <div>
                {/*{pubs.map((pub) => (*/}
                {/*    <div key={pub._id}>*/}
                {/*        <MainCarousel pub={pub}/>*/}
                {/*    </div>*/}
                {/*))}*/}


            </div>

        </div>
    )
}
