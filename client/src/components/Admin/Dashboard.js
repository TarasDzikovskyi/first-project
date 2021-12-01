import Sidebar from "./Sidebar";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllPubs} from "../../actions/pubs";
import {getAllUsers} from "../../actions/users";
import {Link} from "react-router-dom";

export default function Dashboard() {
    const dispatch = useDispatch()

    const {pubs} = useSelector((state) => state.pubs)
    const {users} = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(getAllPubs())
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <div className='d-flex center-box w-90'>
            <div className='w-20'>
                <Sidebar/>
            </div>

            <div className="center w-80">
                <div>
                    <p>
                        {/*Total Amount <br /> ₹{totalAmount}*/}
                    </p>
                </div>
                <div className="d-flex text j-content-around">
                    <Link to="/admin/products">
                        <div className='pubs-dashboard'>
                            <div className='center-circle'>
                                <p>Заклади</p>
                                <p>{pubs && pubs.length}</p>
                            </div>
                        </div>
                    </Link>
                    {/*<Link to="/admin/orders">*/}
                    {/*    <p>Orders</p>*/}
                    {/*    <p>{orders && orders.length}</p>*/}
                    {/*</Link>*/}
                    <Link to="/admin/users">
                        <div className='pubs-dashboard users-dashboard'>
                            <div className='center-circle'>
                                <p>Користувачі</p>
                                <p>{users && users.length}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
