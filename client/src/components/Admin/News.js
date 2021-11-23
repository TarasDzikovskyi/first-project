import {useEffect, useState} from "react";
import {deleteNews, getAllNews} from "../../actions/pubs";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import {DataGrid} from "@material-ui/data-grid";
import * as React from "react";

export default function News() {
    const [pubId, setPubId] = useState('');

    const dispatch = useDispatch()

    const {news} = useSelector((state) => state.pubs.news)
    console.log(news)

    const deleteNewsHandler = (newsId) => {
        dispatch(deleteNews(pubId, newsId));
    };


    const newsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllNews(pubId));
    };

    useEffect(() => {
        if (pubId.length === 24) {
            dispatch(getAllNews(pubId));
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
        {field: "id", headerName: "News ID", minWidth: 200, flex: 0.5},

        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },

        {
            field: "news",
            headerName: "News",
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
                            onClick={() => deleteNewsHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon/>
                        </Button>
                    </div>
                );
            },
        },
    ];

    const rows = [];

    console.log(news)

    news &&
    news.forEach((item) => {
        rows.push({
            id: item._id,
            news: item.text,
            user: item.name,
        });
    });

    return (
        <div className='w'>
            <div>
                <form className="reviewsForm center" onSubmit={newsSubmitHandler}>
                    <h1>ВСІ НОВИНИ</h1>

                    <div>
                        <Star/>
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
                {news && news.length > 0 ? (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                ) : (
                    <h1 className="center mt-20">НОВИН НЕ ЗНАЙДЕНО</h1>
                )}
            </div>
        </div>
    )
}
