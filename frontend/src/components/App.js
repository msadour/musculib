import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from './pages/Home'
import ExercisesList from './pages/exercises/ExercisesList'
import ExerciseDetail from './pages/exercises/ExerciseDetail'

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
                        </Switch>
                    </div>
                </Fragment>
            </Router>
          </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'));