import {Link} from "react-router-dom";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import DoneIcon from "@material-ui/icons/Done";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import './dashboard.css'

export default function Sidebar() {

    return (
        <div className="sidebar">
            <Link to="/">Admin panel
                {/*<img src={} alt="Ecommerce" />*/}
            </Link>
            <Link to="/root/dashboard">
                <p>
                    <DashboardIcon/> Dashboard
                </p>
            </Link>
            <Link to="/root/activate">
                <p>
                    <DoneIcon/> Модерація
                </p>
            </Link>
            <Link to='/root/pubs'>
                <p>
                    <ListAltIcon/> Заклади
                </p>
            </Link>
            <Link to="/root/users">
                <p>
                    <PeopleIcon/> Користувачі
                </p>
            </Link>
            <Link to="/root/news">
                <p>
                    <AnnouncementIcon/> Новини
                </p>
            </Link>
            <Link to="/root/reviews">
                <p>
                    <RateReviewIcon/> Відгуки
                </p>
            </Link>
        </div>
    )
}
