import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link, withRouter } from "react-router-dom";

class Menu extends Component {

    constructor() {
        super()
        this.state = {
            muscles: [],
            declinations: []
        }

        this.updateContent.bind(this)
    }

    componentDidMount() {
        fetch("/api_musculib/declination/")
        .then(response => response.json())
        .then((data) => {
            this.setState({ declinations: data})
        })
        .catch((err) => {
            console.log(err)
        })

        fetch("/api_musculib/muscle/")
        .then(response => response.json())
        .then((data) => {
            this.setState({ muscles: data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    logout = e => {
        e.preventDefault();
        fetch('/api_musculib/logout/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then(res => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('customer_id');
            this.props.history.push("/");
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
        });
    }

    updateContentFavoriteExercise = e => {
        this.props.history.push('/your_favorite_exercises');
        window.location.reload()
    }

    updateContent (e, url, object) {
        e.preventDefault();
        if (url.includes('/exercises/muscle/')) {
            this.props.history.push(url + object.muscle.id);
        } else if (url.includes('/your_favorite_exercises')) {
            this.props.history.push('/your_favorite_exercises');
        } else {
            this.props.history.push(url + object.declination.id);
        }
        window.location.reload()
    }

    render() {
        if(this.state.muscles.length == 0 | this.state.declinations.length == 0){
            return (
                <div></div>
            )
        }

        if (localStorage.getItem('token')) {
            return (
               <nav className="nav nav-pills nav-fill flex-column flex-sm-row element_summary menu">
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <Link to='/'>
                                        <img className=" nav-link nav-item img_go_home item_menu" src="../../../../../media/other/home.png" />
                                    </Link>
                                </th>

                                <th>
                                    <div className="dropdown item_menu">
                                        <p className="nav-link nav-item text">Exercises by muscle</p>
                                        <div className="dropdown-content">
                                            <ul style={{listStyle: "none"}}>
                                                  <li key={0}>
                                                      <Link
                                                        to='/all_exercises'
                                                      >
                                                        <p >all exercises</p>
                                                    </Link>
                                                  </li>

                                                {this.state.muscles.map((muscle) => (
                                                    <li key={muscle.id} >
                                                       <a onClick={(e) => this.updateContent(e, "/exercises/muscle/", {muscle} )}>{muscle.name}</a>
                                                    </li>
                                                ))}

                                              </ul>
                                        </div>
                                    </div>
                                </th>

                                <th>
                                    <div className="dropdown item_menu">
                                        <p className="nav-link nav-item text">Exercises by declination</p>
                                        <div className="dropdown-content">
                                            <ul style={{listStyle: "none"}}>
                                                  <li key={0}>
                                                      <Link
                                                        to='/all_exercises'
                                                      >
                                                        <p >all exercises</p>
                                                    </Link>
                                                  </li>

                                                {this.state.declinations.map((declination) => (
                                                    <li key={declination.id} >
                                                       <a onClick={(e) => this.updateContent(e, "/exercises/declination/", {declination} )}>{declination.name}</a>
                                                    </li>
                                                ))}

                                              </ul>
                                        </div>
                                    </div>
                                </th>

                                <th>
                                    <Link to='/other_users'>
                                        <p className="nav-link nav-item text item_menu">Users</p>
                                    </Link>
                                </th>

                                <th>
                                    <Link to='/manage_account'>
                                        <p className="nav-link nav-item text item_menu">Account</p>
                                    </Link>
                                </th>

                                <th>

                                    <Link to='/your_favorite_exercises' onClick={(e) => this.updateContent(e, "/your_favorite_exercises", undefined)}>
                                        <p className="nav-link nav-item text item_menu">Favorite exercises</p>
                                    </Link>
                                </th>

                                <th>
                                     <Link to='/other_users'>
                                        <p className="nav-link nav-item text item_menu">Users</p>
                                    </Link>
                                </th>

                                <th>

                                    <Link to='/'>
                                        <p className="nav-link nav-item text item_menu item_authentication" onClick={this.logout}>Logout</p>
                                    </Link>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </nav>
            )

        } else {
            return (
                <nav className="nav nav-pills nav-fill flex-column flex-sm-row element_summary menu">
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <Link to='/'>
                                        <img className=" nav-link nav-item img_go_home item_menu" src="../../../../../media/other/home.png" />
                                    </Link>
                                </th>

                                <th>
                                    <div className="dropdown item_menu">
                                        <p className="nav-link nav-item text">Exercises by muscle</p>
                                        <div className="dropdown-content">
                                            <ul style={{listStyle: "none"}}>
                                                  <li key={0}>
                                                      <Link
                                                        to='/all_exercises'
                                                      >
                                                        <p className="text" >all exercises</p>
                                                    </Link>
                                                  </li>

                                                {this.state.muscles.map((muscle) => (
                                                    <li key={muscle.id}>
                                                       <a className="text" onClick={(e) => this.updateContent(e, "/exercises/muscle/", {muscle} )}>{muscle.name}</a>
                                                    </li>
                                                ))}

                                              </ul>
                                        </div>
                                    </div>
                                </th>

                                <th>
                                    <div className="dropdown item_menu">
                                        <p className="nav-link nav-item text">Exercises by declination</p>
                                        <div className="dropdown-content">
                                            <ul style={{listStyle: "none"}}>
                                                  <li key={0}>
                                                      <Link
                                                        to='/all_exercises'
                                                      >
                                                        <p className="text">all exercises</p>
                                                    </Link>
                                                  </li>

                                                {this.state.declinations.map((declination) => (
                                                    <li key={declination.id} >
                                                       <a className="text" onClick={(e) => this.updateContent(e, "/exercises/declination/", {declination} )}>{declination.name}</a>
                                                    </li>
                                                ))}

                                              </ul>
                                        </div>
                                    </div>
                                </th>

                                <th>
                                    <Link to='/other_users'>
                                        <p className="nav-link nav-item text item_menu">Users</p>
                                    </Link>
                                </th>

                                <th>
                                    <Link to='/subscription'>
                                        <p className="nav-link nav-item text item_menu">Subscription</p>
                                    </Link>
                                </th>

                                <th>
                                    <Link to='/login'>
                                        <p className="nav-link nav-item text item_menu item_authentication">Login</p>
                                    </Link>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </nav>
            )

        }
    }
}

export default withRouter(Menu)