import {useEffect, useState} from "react";
import {
    deleteEvents,
    deleteNews,
    deleteReviews,
    getAllEvents,
    getAllNews,
    getAllReviews,
    newReview
} from "../../actions/pubs";
import {useDispatch, useSelector} from "react-redux";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import { DataGrid } from "@material-ui/data-grid";
import {Rating} from "@material-ui/lab";
import * as React from "react";

export default function News(){
    const [pubId, setPubId] = useState('');

    const dispatch = useDispatch()

    // const user = JSON.parse(localStorage.getItem('profile'))


    const {events} =useSelector((state) => state.pubs.events)
    console.log(events)

    const deleteEventHandler = (eventsId) => {
        dispatch(deleteEvents(pubId, eventsId));
    };


    const eventSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllEvents(pubId));
    };

    useEffect(() => {
        if (pubId.length === 24) {
            dispatch(getAllEvents(pubId));
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
        { field: "id", headerName: "News ID", minWidth: 200, flex: 0.5 },

        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },

        {
            field: "events",
            headerName: "Events",
            minWidth: 350,
            flex: 1,
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
                            onClick={() => deleteEventHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const rows = [];

    console.log(events)

    events &&
    events.forEach((item) => {
        rows.push({
            id: item._id,
            events: item.text,
            user: item.name,
        });
    });

    return(
        <div className='w'>
            <div>
                <form className="reviewsForm center" onSubmit={eventSubmitHandler}>
                    <h1>ВСІ ПОДІЇ</h1>
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
                {events && events.length > 0 ? (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                ) : (
                    <h1 className="center mt-20">ПОДІЙ НЕ ЗНАЙДЕНО</h1>
                )}
            </div>
        </div>
    )
}
