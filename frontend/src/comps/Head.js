import React from 'react'
import {Link, BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "./Auth";
import Registration from "./Registration";
import Pubs from "./Pubs";
import News from "./News";
import Main from "./Main";

export default function Head() {
    return (
        <Router>
            <nav>
                <div className="nav-wrapper">
                       <Link to="/" className="brand-logo ml">Пиячок</Link>

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/login" activeclassname='isActive'>Login</Link></li>
                        <li><Link to="/register">Registration</Link></li>
                        <li><Link to={'/pubs'}>Pubs</Link></li>
                        <li><Link to={'/news'}>News</Link></li>
                    </ul>
                </div>
            </nav>
            <div>
                {/*<Switch>*/}
                {/*    <Route exact path="/" component={Main}/>*/}
                {/*    <Route path="/login" component={Auth}/>*/}
                {/*    <Route path="/register" component={Registration}/>*/}
                {/*    <Route path="/pubs" component={Pubs}/>*/}
                {/*    <Route path="/news" component={News}/>*/}
                {/*</Switch>*/}

            </div>
        </Router>
    )
}
