import React, { Component } from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Menu from '../menu/Menu';

export default class CustomersList extends Component {
    constructor() {
        super()
        this.state = {
            customers: []
        }
    }

    componentDidMount() {
        fetch("/api_musculib/customer/")
        .then(response => response.json())
        .then((data) => {
            this.setState({ customers: data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    deleteAccount(e, id) {
        e.preventDefault();
        fetch("/api_musculib/customer/" + id + "/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        .then(() => {
           alert("User deleted");
           window.location.reload();
        })
    }

    render() {
        return (
            <div>
                <br /><br />

                <table id="list_customers" className="table" border="1">
                    <tbody>
                        <tr className="element_summary header_summary">
                            <th> <p className="text text_summary"> Users </p> </th>
                            <th> <p className="text text_summary"> Their favorite exercises </p> </th>
                        </tr>

                        {this.state.customers.map((customer) => (
                            <tr key={customer.id}>
                                {customer.id == localStorage.getItem('customer_id') ? (
                                    <th>
                                        <p className="text paragraph">Me</p>
                                    </th>
                                ) : (
                                    <th>
                                        <p className="text paragraph">
                                        {customer.first_name} {customer.last_name.charAt(0)}. <br />

                                        Live in {customer.city}, {customer.country} <br />

                                        {localStorage.getItem('username') == "sadour.mehdi@gmail.com" ? (
                                            <button className="button_delete" onClick={(e) => this.deleteAccount(e, customer.id)}>DELETE</button>
                                        ) : (<div></div>)}

                                        </p>
                                    </th>
                                )}

                                <th>
                                    <ul style={{listStyle: "none"}}>
                                        {customer.favorite_exercice.map((exercise) => (
                                            <li key={exercise.id}>
                                                <Link to={"/exercises_detail/" + exercise.id}>
                                                    <p className="text paragraph">{exercise.name}</p>
                                                </ Link>

                                            </li>
                                        ))}
                                    </ul>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br /><br /><br /><br /><br /><br />
            </div>
        )

    }

}