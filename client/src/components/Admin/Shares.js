import {useEffect, useState} from "react";
import {
    deleteShares,
    getAllShares,
} from "../../actions/pubs";
import {useDispatch, useSelector} from "react-redux";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import { DataGrid } from "@material-ui/data-grid";
import * as React from "react";

export default function News(){
    const [pubId, setPubId] = useState('');

    const dispatch = useDispatch()

    const {shares} =useSelector((state) => state.pubs.shares)
    console.log(shares)

    const deleteSharesHandler = (sharesId) => {
        dispatch(deleteShares(pubId, sharesId));
    };

    const sharesSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllShares(pubId));
    };

    useEffect(() => {
        if (pubId.length === 24) {
            dispatch(getAllShares(pubId));
        }
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
            field: "shares",
            headerName: "Shares",
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
                            onClick={() => deleteSharesHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const rows = [];

    console.log(shares)

    shares &&
    shares.forEach((item) => {
        rows.push({
            id: item._id,
            shares: item.text,
            user: item.name,
        });
    });

    return(
        <div className='w'>

            <div>

                <form className="reviewsForm center" onSubmit={sharesSubmitHandler}>
                    <h1>ВСІ ЗНИЖКИ</h1>

                    <div>
                        <Star />
                        <input
                            type="text"
                            placeholder="Id закладу"
                            required
                            value={pubId}
                            onChange={({target: {value}}) => setPubId(value)}
                        />
                    </div>

                    <button
                        className='btn-change'
                        type="submit">
                        Пошук
                    </button>
                </form>
            </div>

            <div>
                {shares && shares.length > 0 ? (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                ) : (
                    <h2 className="center mt-20">ЗНИЖОК НЕ ЗНАЙДЕНО</h2>
                )}
            </div>
        </div>
    )
}
