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
            this.props.history.push("/authentication");
        });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        const{ username, password} = this.state

        return (
          <div>
                <Menu />
                <br /><br /><br />
              <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                  <h2 className="text-center text_jl">Login</h2>
                  <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                      <label className="text_jl">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={e => this.onChange(e)}
                        value={this.state.username}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={e => this.onChange(e)}
                        value={this.state.password}
                      />
                    </div>

                    <div className="form-group">
                      <button className="button" type="submit" className="button" >
                        <label className="text_jl_button">LOGIN</label>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          </div>
        )
    }
}

export default withRouter(Login)