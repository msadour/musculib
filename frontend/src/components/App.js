import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from './pages/Home';
import ExercisesList from './pages/exercises/ExercisesList';
import ExerciseDetail from './pages/exercises/ExerciseDetail';
import Login from './pages/users/Login';
import Subscription from './pages/users/Subscription';
import ManageAccount from './pages/users/ManageAccount';
import CustomersList from './pages/users/CustomersList';

import './style.css';

export default class App extends Component {
    render() {
        return (
          <div>

            <Router>
                <Fragment>
                    <div>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/all_exercises' component={ExercisesList} />
                            <Route path="/exercises_detail/:id" component={ExerciseDetail}/>
                            <Route path="/exercises/declination/:id" component={ExercisesList}/>
                            <Route path="/exercises/muscle/:id" component={ExercisesList}/>
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/subscription' component={Subscription} />
                            <Route exact path='/manage_account' component={ManageAccount} />
                            <Route exact path='/your_favorite_exercises' component={ExercisesList} />
                            <Route exact path='/other_users' component={CustomersList} />
                        </Switch>
                    </div>
                </Fragment>
            </Router>
          </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'));