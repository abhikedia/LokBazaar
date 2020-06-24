import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import history from './history';
import Seller_Signup from './Shopkeeper/signup';
import Seller_Signin from './Shopkeeper/signin';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/sellersignup" exact component={Seller_Signup} />
                    {/* <Route path="/" exact component={Register} /> */}
                    <Route path="/sellersignin" exact component={Seller_Signin} />
                </Switch>
            </Router>
        );
    }
}