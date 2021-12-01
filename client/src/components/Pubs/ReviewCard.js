import {Rating} from "@material-ui/lab";
import React, {useEffect} from "react";
import photo from '../../images/avatar-removebg-preview.png'

const ReviewCard = ({review}) => {

    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className="reviewCard center">
            <div>
                <img src={photo} alt="User" height={50} className='img-comment'/>
            </div>
            <p>{review.name}</p>
            <Rating {...options} />
            <br/>
            <br/>
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
};

export default ReviewCard;
