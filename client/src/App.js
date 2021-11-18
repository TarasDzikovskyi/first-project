import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import News from './components/News'
import CreateForm from './components/CreateForm'
import Auth from './components/Auth';
import Main from './components/Main';
import Alcogolic from "./components/Alcogolic";
import UserPage from "./components/UserPage";
import AdminPage from "./components/Admin/AdminPage";
import Navbar from "./components/Navbar";
import PubDetails from "./components/PubDetails";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Swal from 'sweetalert2'
import PubsPage from "./components/PubsPage";

function App() {
    const user = JSON.parse(localStorage.getItem('profile'))

    // const alerted = localStorage.getItem('alerted') || '';
    // if (alerted !== 'yes') {
    //     Swal.fire({
    //         title: 'Вам є 18?',
    //         text: "Входячи наш сайт ви погоджуєтесь, що вам є 18 років",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Так, мені є 18!',
    //         cancelButtonText: "Мені немає 18",
    //         showClass: {
    //             popup: 'animate__animated animate__fadeInDown'
    //         },
    //         hideClass: {
    //             popup: 'animate__animated animate__fadeOutUp'
    //         }
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             Swal.fire(
    //                 'Прийнято!',
    //                 'Ласкаво просимо до "Пиячка".',
    //                 'success'
    //             )
    //         }
    //     }).then(() => {
    //         Swal.fire({
    //             title: 'Обережно!',
    //             text: "Адміністрація застерігає вас бути обережними і " +
    //                 "не зустрічатися з незнайомими людьми в небезпечних чи невідомих вам місцях!",
    //             icon: 'warning',
    //             showClass: {
    //                 popup: 'animate__animated animate__fadeInDown'
    //             },
    //             hideClass: {
    //                 popup: 'animate__animated animate__fadeOutUp'
    //             }
    //         })
    //     })
    //     localStorage.setItem('alerted', 'yes')
    // }


    return (
        <div>
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path={'/'} component={Main}/>
                    <Route exact path={'/news'} component={News}/>
                    <Route exact path={'/create'} component={CreateForm}/>
                    <Route exact path={'/login'} component={() => (!user ? <Auth/> : <Redirect to='/'/>)}/>
                    <Route exact path={'/pubs'} component={PubsPage}/>
                    <Route exact path={'/pubs/search'} component={PubsPage}/>
                    <Route exact path={'/pubs/:pub_id'} component={PubDetails}/>
                    <Route exact path={'/alco'} component={Alcogolic}/>
                    <Route exact path={'/user'} component={UserPage}/>
                    <Route exact path={'/root'} component={AdminPage}/>
                    <Route exact path={'/forgot'} component={ForgotPassword}/>
                    <Route exact path={'/reset/:token'} component={ResetPassword}/>
                    <Redirect to={'/login'}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
