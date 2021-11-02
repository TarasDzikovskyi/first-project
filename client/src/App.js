import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import News from './comps/News'
import Links from './comps/Links'
import CreateForm from './comps/CreateForm'
import Auth from './comps/Auth';
import Main from './comps/Main';
import Pubs from "./comps/Pubs";
import Alcogolic from "./comps/Alcogolic";
import UserPage from "./comps/UserPage";
import AdminPage from "./comps/AdminPage";
import Search from "./comps/Search";
import Navbar from "./comps/Navbar";

function App() {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <div>
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path={'/'} component={Main}/>
                    <Route path={'/news'} component={News}/>
                    <Route path={'/links'} component={Links}/>
                    <Route path={'/create'} component={CreateForm}/>
                    <Route path={'/login'} component={() => (!user ? <Auth/> : <Redirect to='/'/>)}/>
                    <Route path={'/pubs'} component={Pubs}/>
                    <Route path={'/alco'} component={Alcogolic}/>
                    <Route path={'/user'} component={UserPage}/>
                    <Route path={'/admin'} component={AdminPage}/>
                    <Route path={'/search'} component={Search}/>
                    <Redirect to={'/login'}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
