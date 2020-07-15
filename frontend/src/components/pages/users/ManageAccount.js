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

        render() {

        return (
            <div>
                <Menu />
                <br />
                      <table className="page_content" style={{backgroundColor: "white", width:"70%"}}>
                        <tbody>

                            <tr>
                                <th><br /></th>
                            </tr>

                            <tr>
                                <th><center><h2 className="text_jl">Hello {this.state.customer.first_name}</h2></center></th>
                            </tr>

                            <tr>
                                <th><br /></th>
                            </tr>


                            <tr>
                                <th><FormField type_input="text" field="first_name" label="First name" value={this.state.customer.first_name} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="last_name" label="Last name" value={this.state.customer.last_name} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="email" label="Email" value={this.state.customer.email} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="password" label="Password" value="" /></th>
                            </tr>

                        </tbody>
                      </table>
                <br /><br /><br /><br /><br />
            </div>
        )
    }

}