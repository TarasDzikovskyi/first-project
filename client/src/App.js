import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import News from './comps/News'
import CreateForm from './comps/CreateForm'
import Auth from './comps/Auth';
import Main from './comps/Main';
import Pubs from "./comps/Pubs";
import Alcogolic from "./comps/Alcogolic";
import UserPage from "./comps/UserPage";
import AdminPage from "./comps/AdminPage";
import Search from "./comps/Search";
import Navbar from "./comps/Navbar";
import PubDetails from "./comps/PubDetails";

function App() {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <div>
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path={'/'} component={Main}/>
                    <Route exact path={'/news'} component={News}/>
                    <Route exact path={'/create'} component={CreateForm}/>
                    <Route exact path={'/login'} component={() => (!user ? <Auth/> : <Redirect to='/'/>)}/>
                    <Route exact path={'/pubs'} component={Pubs}/>
                    <Route exact path={'/pubs/:pub_id'} component={PubDetails}/>
                    <Route exact path={'/alco'} component={Alcogolic}/>
                    <Route exact path={'/user'} component={UserPage}/>
                    <Route exact path={'/admin'} component={AdminPage}/>
                    <Route exact path={'/search'} component={Search}/>
                    <Redirect to={'/login'}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
