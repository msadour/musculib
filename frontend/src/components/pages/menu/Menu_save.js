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

    render() {
        if (localStorage.getItem('token')) {
            return (
                <div>
                    <table className="table_main_menu">
                        <tbody>
                            <tr>
                                <th>
                                    <Link to='/'>
                                        <p className="nav-link text_jl">Home</p>
                                    </Link>
                                </th>

                                <th>
                                    <Link to='/manage_account'>
                                        <p className="nav-link text_jl">Manage your account</p>
                                    </Link>
                                </th>

                                <th>
                                    <Link to='/your_favorite_exercises'>
                                        <p className="nav-link text_jl">Your favorite exercises</p>
                                    </Link>
                                </th>

                                <th>
                                    <Link to='/other_users'>
                                        <p className="nav-link text_jl">Other users</p>
                                    </Link>
                                </th>

                                <th>
                                    <Link to='/'>
                                        <p className="nav-link text_jl" onClick={this.logout}>Logout</p>
                                    </Link>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )

        } else {
            return (
                <div>
                    <table className="table_main_menu">
                        <tbody>
                            <tr>
                                <th>
                                    <Link to='/'>
                                        <p className="nav-link text_jl">Home</p>
                                    </Link>
                                </th>

                                <th>
                                    <Link to='/your_favorite_exercises'>
                                        <p className="nav-link text_jl">Your favorite exercises</p>
                                    </Link>
                                </th>

                                <th>
                                    <Link to='/subscription'>
                                        <p className="nav-link text_jl">Subscription</p>
                                    </Link>
                                </th>

                                <th>
                                    <Link to='/login'>
                                        <p className="nav-link text_jl">Login</p>
                                    </Link>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )

        }
    }
}

export default withRouter(Menu)