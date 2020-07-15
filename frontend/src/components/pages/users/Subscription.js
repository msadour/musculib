import React, { Component } from "react";
import {withRouter} from 'react-router-dom';

import Menu from '../menu/Menu';

class Subscription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            first_name: "",
            last_name: "",

        }
        this.onChange.bind(this);
        this.onSubmit.bind(this);
    }

    onSubmit = e => {
        e.preventDefault();
        fetch('/api_musculib/customer/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                "email": this.state.username,
                "password": this.state.password,
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                }
            )
        })
        .then(response => response.json())
        .then((data) => {
            alert("Your account have been created.")

        })
        .catch(err => {
            console.log(err)
            alert("Error.");
            this.props.history.push("/subscription");
        });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        return (
          <div>
            <Menu />
            <br /><br /><br />
              <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                  <h2 className="text-center text_jl">Create your account</h2>
                  <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                      <label className="text_jl">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <button className="button" type="submit" className="button" >
                        <label className="text_jl_button">CREATE YOUR ACCOUNT</label>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          </div>
        )
    }
}

export default withRouter(Subscription)