import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import history from './history';
import Seller_Signup from './Shopkeeper/signup';
import Seller_Signin from './Shopkeeper/signin';
import Signin from './Customer/signin';
import Signup from './Customer/signup';
import AddItem from './Shopkeeper/SignedIn/Additems/addItem';
import Dashboard from './Shopkeeper/SignedIn/Dashboard';
import Home from './Customer/home'
import Search from './Customer/search'
import View from './Customer/modal'

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/sellersignup" exact component={Seller_Signup} />
                    <Route path="/sellersignin" exact component={Seller_Signin} />
                    <Route path="/signin/home" exact component={Home} />
                    <Route path="/signin/home/search/view" exact component={View} />
                    <Route path="/signin/home/search" exact component={Search} />
                    <Route path="/sellersignin/dashboard" exact component={Dashboard} />
                    <Route path="/sellersignin/additem" exact component={AddItem} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/" exact component={Signup} />
                </Switch>
            </Router>
        );
    }
}