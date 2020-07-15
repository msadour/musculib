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
                <nav className="nav nav-pills nav-fill flex-column flex-sm-row element_summary header_summary menu">

                    <Link to='/'>
                        <img className=" nav-link nav-item img_go_home item_menu" src="../../../../../media/other/home.png" />
                    </Link>

                    <Link to='/manage_account'>
                        <p className="nav-link nav-item item_menu">Manage your account</p>
                    </Link>

                    <Link to='/your_favorite_exercises'>
                        <p className="nav-link nav-item text item_menu">Your favorite exercises</p>
                    </Link>

                     <Link to='/other_users'>
                        <p className="nav-link nav-item text item_menu">They use Musculib</p>
                    </Link>

                    <Link to='/'>
                        <p className="nav-link nav-item text item_menu item_logout" onClick={this.logout}>Logout</p>
                    </Link>

                </nav>
            )

        } else {
            return (
                <nav className="nav nav-pills nav-fill flex-column flex-sm-row element_summary header_summary">

                    <Link to='/'>
                        <img className=" nav-link nav-item img_go_home item_menu" src="../../../../../media/other/home.png" />
                    </Link>

                    <Link to='/other_users'>
                        <p className="nav-link nav-item text item_menu">They use Musculib</p>
                    </Link>

                    <Link to='/subscription'>
                        <p className="nav-link nav-item text item_menu">Create your account</p>
                    </Link>

                     <Link to='/login'>
                        <p className="nav-link nav-item text item_menu item_logout">Login</p>
                    </Link>

                </nav>
            )

        }
    }
}

export default withRouter(Menu)