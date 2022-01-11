import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import CreateForm from './components/Pubs/CreateForm'
import Auth from './components/Auth/Auth';
import Main from './components/Main';
import Alcogolic from "./components/Alcogolic/Alcogolic";
import UserPage from "./components/User/UserPage";
import Navbar from "./components/Navbar";
import PubDetails from "./components/Pubs/PubDetails";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Swal from 'sweetalert2'
import PubsPage from "./components/Pubs/PubsPage";
import Moderation from "./components/Admin/Moderation/Moderation";
import News from "./components/Admin/News";
import Dashboard from "./components/Admin/Dashboard";
import Reviews from "./components/Admin/Reviews";
import UserDashboard from "./components/Admin/Users/UserDashboard";
import PubDashboard from "./components/Admin/Pubs/PubDashboard";
import NewsPage from "./components/News/NewsPage";
import Footer from "./components/Footer/Footer";
import NewsCard from "./components/News/NewsCards/NewsCard";
import SharesCard from "./components/News/SharesCards/SharesCard";
import EventsCard from "./components/News/EventsCards/EventsCard";
import Cart from "./components/Cart/Cart";
import SingleNews from "./components/News/NewsCards/SingleNews";
import AlcogolicItems from "./components/Alcogolic/AlcogolicItems";
import Messenger from "./components/Messenger/Messenger";
import MapWrapper from './components/Maps/MapWrapper'
import ErrorPage from "./components/ErrorPage";

function App() {
    const alerted = localStorage.getItem('alerted') || '';
    if (alerted !== 'yes') {
        Swal.fire({
            title: 'Вам є 18?',
            text: "Входячи на наш сайт, ви погоджуєтесь, що вам є 18 років",
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
        // Swal.fire({
        //     title: 'Вам є 18?',
        //     text: "Входячи на наш сайт, ви погоджуєтесь, що вам є 18 років",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Так, мені є 18!',
        //     cancelButtonText: "Мені немає 18",
        //     showClass: {
        //         popup: 'animate__animated animate__fadeInDown'
        //     },
        //     hideClass: {
        //         popup: 'animate__animated animate__fadeOutUp'
        //     }
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         Swal.fire(
        //             'Прийнято!',
        //             'Ласкаво просимо до "Пиячка".',
        //             'success'
        //         )
        //     } else {
        //         redirect()
        //     }
        // })
.then(() => {
            Swal.fire({
                title: 'Обережно!',
                text: "Адміністрація застерігає вас бути обережними і " +
                    "не зустрічатися з незнайомими людьми в небезпечних чи невідомих вам місцях!",
                icon: 'warning',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        })
        localStorage.setItem('alerted', 'yes')
    }

    return (
        <div>
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path={'/'} component={Main}/>
                    <Route exact path={'/news'} component={NewsPage}/>
                    <Route exact path={'/news/news'} component={NewsCard}/>
                    <Route exact path={'/news/news/:pub_id/:news_id'} component={SingleNews}/>
                    <Route exact path={'/news/shares'} component={SharesCard}/>
                    <Route exact path={'/news/shares/:pub_id/:news_id'} component={SingleNews}/>
                    <Route exact path={'/news/events'} component={EventsCard}/>
                    <Route exact path={'/news/events/:pub_id/:news_id'} component={SingleNews}/>
                    <Route exact path={'/create'} component={CreateForm}/>
                    <Route exact path={'/login'} component={Auth}/>
                    <Route exact path={'/pubs'} component={PubsPage}/>
                    <Route exact path={'/pubs/search'} component={PubsPage}/>
                    <Route exact path={'/pubs/:pub_id'} component={PubDetails}/>
                    <Route exact path={'/alco'} component={Alcogolic}/>
                    <Route exact path={'/alco/items'} component={AlcogolicItems}/>
                    <Route exact path={'/user/cart'} component={Cart}/>
                    <Route exact path={'/user'} component={UserPage}/>
                    <Route exact path={'/root'} component={Dashboard}/>
                    <Route exact path={'/root/activate'} component={Moderation}/>
                    <Route exact path={'/root/reviews'} component={Reviews}/>
                    <Route exact path={'/root/users'} component={UserDashboard}/>
                    <Route exact path={'/root/pubs'} component={PubDashboard}/>
                    <Route exact path={'/root/news'} component={News}/>
                    <Route exact path={'/forgot'} component={ForgotPassword}/>
                    <Route exact path={'/reset/:token'} component={ResetPassword}/>

                    <Route exact path={'/xxx'} component={Messenger}/>
                    <Route exact path={'/error'} component={ErrorPage}/>
                    <Route exact path={'/map'} component={MapWrapper}/>
                    <Redirect to={'/login'}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    )
}

export default App;
