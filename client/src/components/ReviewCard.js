import { Rating } from "@material-ui/lab";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsersByAdmin} from "../actions/admin";
import {getAllUsers, getUser} from "../actions/users";

const ReviewCard = ({ review }) => {
    const dispatch = useDispatch()

    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };

    console.log(review.user)

    // const user = useSelector((state) => state.users)
    //
    // console.log(user)
    //
    // useEffect(() => {
    //     dispatch(getUser(review.user))
    // }, [dispatch])



    return (
        <div className="reviewCard">
            <img alt="User" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
};

export default ReviewCard;
