import React, { Component } from "react";

export default class MenuGuest extends Component {

    render() {
        return (
            <nav class="navbar navbar-default">
              <div class="container-fluid">
                <ul class="nav navbar-nav">
                  <li><a href="/">home</a></li>
                  <li><a href="/authenticate">Authenticate</a></li>
                </ul>
              </div>
            </nav>
        )
    }

}
