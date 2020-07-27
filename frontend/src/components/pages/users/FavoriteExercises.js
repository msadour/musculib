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
            console.log(err)
        })
    }

    render() {
        return (
            {this.state.customer.favorite_exercice.length == 0 : (
                <div>
                    None exercises to display.
                </div>
            ) : (
                <div>
                    <ul>
                    {this.state.customer.favorite_exercice.map((exercise) => (
                        <li> {exercise.name}</li>
                    ))}
                    </ul>
                </div>
            )}
        )
    }
}