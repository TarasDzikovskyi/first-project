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
import Registration from "./comps/Registration";
import Search from "./comps/Search";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getPubs} from "./actions/pubs";
import Head from "./comps/Head";

function App() {

    const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPubs())
    }, [currentId, dispatch])

    return (
        <div>
            <Router>
                <Head/>
                <Switch>
                    <Route exact path={'/'} component={Main}/>
                    <Route path={'/news'} component={News}/>
                    <Route path={'/links'} component={Links}/>
                    <Route path={'/create'} component={CreateForm}/>
                    <Route path={'/login'} component={Auth}/>
                    <Route path={'/pubs'} component={Pubs}/>
                    <Route path={'/alco'} component={Alcogolic}/>
                    <Route path={'/user'} component={UserPage}/>
                    <Route path={'/admin'} component={AdminPage}/>
                    <Route path={'/register'} component={Registration}/>
                    <Route path={'/search'} component={Search}/>
                    <Redirect to={'/register'}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
