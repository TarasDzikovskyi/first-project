import {useEffect, useState} from "react";
import {deleteReviews, getAllReviews} from "../../actions/pubs";
import {useDispatch, useSelector} from "react-redux";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import { DataGrid } from "@material-ui/data-grid";

export default function Reviews(){
    const [pubId, setPubId] = useState("");
    const dispatch = useDispatch()

    const {reviews} =useSelector((state) => state.pubs.reviews)
    console.log(reviews)

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(pubId, reviewId));
    };


    const reviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(pubId));
    };

    useEffect(() => {
        if (pubId.length === 24) {
            dispatch(getAllReviews(pubId));
        }
        // if (error) {
        //     alert.error(error);
        //     dispatch(clearErrors());
        // }
        //
        // if (deleteError) {
        //     alert.error(deleteError);
        //     dispatch(clearErrors());
        // }
        //
        // if (isDeleted) {
        //     alert.success("Review Deleted Successfully");
        //     history.push("/admin/reviews");
        //     dispatch({ type: DELETE_REVIEW_RESET });
        // }
    }, [dispatch, pubId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },

        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <Button
                            onClick={() =>
                                deleteReviewHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const rows = [];

    reviews &&
    reviews.forEach((item) => {
        rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name,
        });
    });

    return(
        <div className='w'>
            <div>

            <form className="reviewsForm center" onSubmit={reviewsSubmitHandler}>
                <h1>ВСІ ВІДГУКИ</h1>

                <div>
                    <Star />
                    <input
                        type="text"
                        placeholder="Product Id"
                        required
                        value={pubId}
                        onChange={({target: {value}}) => setPubId(value)}
                    />
                </div>

                <button
                    className="btn-change"
                    type="submit">
                    Пошук
                </button>
            </form>
            </div>

            <div>
                {reviews && reviews.length > 0 ? (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                ) : (
                    <h1 className="center mt-20">ВІДГУКІВ НЕ ЗНАЙДЕНО</h1>
                )}
            </div>
        </div>
    )
}
