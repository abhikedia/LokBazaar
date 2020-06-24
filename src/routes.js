import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import history from './history';
import Seller_Signup from './Shopkeeper/signup';
import Seller_Signin from './Shopkeeper/signin';
import Signin from './Customer/signin';
import Signup from './Customer/signup';
import AddItem from './Shopkeeper/SignedIn/Additems/addItem';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/sellersignup" exact component={Seller_Signup} />
                    <Route path="/sellersignin" exact component={Seller_Signin} />
                    <Route path="/sellersignin/additem" exact component={AddItem} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/" exact component={Signup} />
                </Switch>
            </Router>
        );
    }
}