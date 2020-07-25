import React, { Component } from "react";
import {withRouter} from 'react-router-dom';

import Menu from '../menu/Menu';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",

        }
        this.onChange.bind(this);
        this.onSubmit.bind(this);
    }

    onSubmit = e => {
        e.preventDefault();
        fetch('/api_musculib/api-token-auth/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"username": this.state.username, "password": this.state.password})
        })
        .then(response => response.json())
        .then((data) => {
            if (data["token"] !== undefined) {
                localStorage.setItem('token', data["token"]);
                localStorage.setItem('customer_id', data["customer_id"]);
                localStorage.setItem('username', this.state.username);
                this.props.history.push("/");
                window.location.reload();
            } else {
                alert("Login or password is wrong.");
            }

        })
        .catch(err => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('customer_id');
            alert("Login or password is wrong.");
            this.props.history.push("/login");
        });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        return (
          <div>
            <br /><br /><br />
            <form onSubmit={e => this.onSubmit(e)}>
                <table className="table_authentication table">
                    <thead>
                        <tr className="element_summary header_summary">
                            <th> <p className="text text_summary">LOGIN</p> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                  <label >Email : </label>
                                  <input
                                    type="text"
                                    name="username"
                                    style={{width: "100%"}}
                                    onChange={e => this.onChange(e)}
                                  />
                            </th>
                        </tr>

                        <tr>
                            <th>
                                  <label>Password : </label>
                                  <input
                                    type="password"
                                    name="password"
                                    style={{width: "100%"}}
                                    onChange={e => this.onChange(e)}
                                  />
                            </th>
                        </tr>

                        <tr>
                            <th>
                              <button className="button" type="submit" className="button" >
                                <label className="text">LOGIN</label>
                              </button>
                              <br /><br />
                            </th>
                        </tr>
                    </tbody>
                </table>
            </form>
          </div>
        )
    }
}

export default withRouter(Login)