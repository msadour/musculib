import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link, withRouter } from "react-router-dom";

class Menu extends Component {

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
            alert(err);
            console.log(err)
        });
    }

    updateContentFavoriteExercise = e => {
        this.props.history.push('/your_favorite_exercises');
        window.location.reload()
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <nav className="nav nav-pills nav-fill flex-column flex-sm-row element_summary header_summary menu">

                    <Link to='/'>
                        <img className=" nav-link nav-item img_go_home item_menu" src="../../../../../media/other/home.png" />
                    </Link>

                    <Link to='/manage_account'>
                        <p className="nav-link nav-item text item_menu">Account</p>
                    </Link>

                    <Link to='/your_favorite_exercises' onClick={this.updateContentFavoriteExercise}>
                        <p className="nav-link nav-item text item_menu">Favorite exercises</p>
                    </Link>

                     <Link to='/other_users'>
                        <p className="nav-link nav-item text item_menu">Users</p>
                    </Link>

                    <Link to='/'>
                        <p className="nav-link nav-item text item_menu item_authentication" onClick={this.logout}>Logout</p>
                    </Link>

                </nav>
            )

        } else {
            return (
                <nav className="nav nav-pills nav-fill flex-column flex-sm-row element_summary header_summary menu">
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <Link to='/'>
                                        <img className=" nav-link nav-item img_go_home item_menu" src="../../../../../media/other/home.png" />
                                    </Link>
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