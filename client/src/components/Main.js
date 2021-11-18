
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getPubs} from "../actions/pubs";
import MainCarousel from "./MainCarousel";
import {Carousel} from "react-bootstrap";


export default function Main() {
    const dispatch = useDispatch()

    const {pubs, isLoading} = useSelector((state) => state.pubs)

    useEffect(() => {
        dispatch(getPubs(1))
    }, [dispatch])


    return (
        <div>
            <h1>Main Page</h1>

            <div>
                {/*{pubs.map((pub) => (*/}
                {/*    <div key={pub._id}>*/}
                {/*        <MainCarousel pub={pub}/>*/}
                {/*    </div>*/}
                {/*))}*/}


                <MainCarousel/>
            </div>

        </div>
    )
}
