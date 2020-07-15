import React, { Component } from "react";
import {withRouter} from 'react-router-dom';

import Menu from '../menu/Menu';

import FormField from './FormField';

export default class ManageAccount extends Component {

    constructor() {
        super();
        this.state = {
            customer: {}
        }

        this.deleteAccount.bind(this)
    }

    componentDidMount() {
        fetch("/api_musculib/customer/" + localStorage.getItem('customer_id') + "/")
        .then(response => response.json())
        .then((data) => {
            this.setState({ customer: data})
        })
        .catch((err) => {
            alert("error");
            console.log(err)
        })
    }

    deleteAccount(e, id) {
        e.preventDefault();
        if (id !== undefined) {
            fetch("/api_musculib/customer/" + id + "/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })
            .then(() => {
                console.log("deleted");
            })
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('customer_id');
                alert("Your account has been deleted");
                this.props.history.push("/");
                window.location.reload();
        }
    }


    render() {
        return (
            <div>
                <Menu />
                <br /><br /><br />
                  <table className="table_account table">
                    <thead>
                        <tr className="element_summary header_summary">
                            <th> <p className="text text_summary">Hello {this.state.customer.first_name}</p> </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>
                                <FormField type_input="text" field="first_name" label="First name" value={this.state.customer.first_name} />
                            </th>
                        </tr>

                        <tr>
                            <th>
                                <FormField type_input="text" field="last_name" label="Last name" value={this.state.customer.last_name} />
                            </th>
                        </tr>

                        <tr>
                            <th>
                                <FormField type_input="text" field="email" label="Email" value={this.state.customer.email} />
                            </th>
                        </tr>

                        <tr>
                            <th>
                                <FormField type_input="text" field="password" label="Password" value="" />
                            </th>
                        </tr>

                        <tr>
                            <th>
                                <FormField type_input="text" field="country" label="Country" value={this.state.customer.country} />
                            </th>
                        </tr>

                        <tr>
                            <th>
                                <FormField type_input="text" field="city" label="City" value={this.state.customer.city} />
                            </th>
                        </tr>

                        <tr>
                            <th>
                                {this.state.customer.id !== undefined ? (
                                    <button className="button_delete" onClick={(e) => this.deleteAccount(e, this.state.customer.id)}>
                                        <label className="text">DELETE MY ACCOUNT</label>
                                    </button>
                                ) : (
                                    <div></div>
                                )}
                            </th>
                        </tr>

                    </tbody>
                  </table>
                <br /><br /><br /><br /><br />
            </div>
        )
    }

}