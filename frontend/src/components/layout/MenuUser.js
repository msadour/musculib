import React, { Component } from "react";

export default class MenuUser extends Component {

    render() {
        return (
            <nav class="navbar navbar-default">
              <div class="container-fluid">
                <ul class="nav navbar-nav">
                  <li><a href="/">home</a></li>
                  <li><a href="/favorites">Favorites</a></li>
                  <li><a href="/manage_account">Manage account</a></li>
                  <li><a href="/logout_user">Logout</a></li>
                  <li><a href="/delete_account">Delete your account</a></li>
                </ul>
              </div>
            </nav>
        )
    }

}
