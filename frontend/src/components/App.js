import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from './pages/Home';
import ExercisesList from './pages/exercises/ExercisesList';
import ExerciseDetail from './pages/exercises/ExerciseDetail';
import ExercisesByMuscle from './pages/exercises/ExercisesByMuscle';
import ExercisesByDeclination from './pages/exercises/ExercisesByDeclination';
import Login from './pages/users/Login';
import ManageAccount from './pages/users/ManageAccount';

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
                            <Route exact path='/exercises' component={ExercisesList} />
                            <Route path="/exercises_detail/:id" component={ExerciseDetail}/>
                            <Route path="/exercises/declination/:id" component={ExercisesByDeclination}/>
                            <Route path="/exercises/muscle/:id" component={ExercisesByMuscle}/>
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/manage_account' component={ManageAccount} />
                        </Switch>
                    </div>
                </Fragment>
            </Router>
          </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'));