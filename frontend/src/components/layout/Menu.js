import React, { Component } from "react";

import MenuGuest from "./MenuGuest";
import MenuUser from "./MenuUser";

export default class Menu extends Component {

    render() {
        return (
            <div>
              { localStorage.getItem('token') == undefined ? (
                <MenuGuest />
              ) : (
                <MenuUser />
              )}
            </div>
        )
    }

}
