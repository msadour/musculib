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
            country: "",
            city: "",

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
                "country": this.state.country,
                "city": this.state.city,
                }
            )
        })
        .then(response => response.json())
        .then((data) => {
            alert("Your account have been created.")
        })
        .catch(err => {
            alert("This email is already used");
            this.props.history.push("/subscription");
        });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        return (
          <div>
            <Menu />
            <br /><br /><br />
            <form onSubmit={e => this.onSubmit(e)}>
                <table className="table_authentication table">
                    <thead>
                        <tr className="element_summary header_summary">
                            <th> <p className="text text_summary">CREATE YOUR ACCOUNT</p> </th>
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
                              <div>
                                  <label>Password : </label>
                                  <input
                                    type="password"
                                    name="password"
                                    style={{width: "100%"}}
                                    onChange={e => this.onChange(e)}
                                  />
                              </div>
                            </th>
                        </tr>

                        <tr>
                            <th>
                              <label >First name</label>
                              <input
                                type="text"
                                name="first_name"
                                style={{width: "100%"}}
                                onChange={e => this.onChange(e)}
                              />
                            </th>
                        </tr>


                        <tr>
                            <th>
                              <label >Last name</label>
                              <input
                                type="text"
                                name="last_name"
                                style={{width: "100%"}}
                                onChange={e => this.onChange(e)}
                              />
                            </th>
                        </tr>

                        <tr>
                            <th>
                              <label >Country</label>
                              <input
                                type="text"
                                name="country"
                                style={{width: "100%"}}
                                onChange={e => this.onChange(e)}
                              />
                            </th>
                        </tr>

                        <tr>
                            <th>
                              <label >City</label>
                              <input
                                type="text"
                                name="city"
                                style={{width: "100%"}}
                                onChange={e => this.onChange(e)}
                              />
                            </th>
                        </tr>

                        <tr>
                            <th>
                              <button className="button" type="submit" >
                                <label className="text">SIGN UP</label>
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

export default withRouter(Subscription)