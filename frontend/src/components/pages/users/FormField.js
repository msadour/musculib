import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

class FormField extends Component {

    constructor(props){
        super(props);

        this.state = {
            new_value: "",
        }

        this.onChange.bind(this)
        this.onSubmit.bind(this)
    }

    onSubmit = e => {
        e.preventDefault();
        const customer_id = localStorage.getItem("customer_id");
        switch(this.props.field) {
            case "first_name":
                fetch('/api_musculib/customer/' + customer_id + '/', {
                    method: "PATCH",
                    body: JSON.stringify({ "first_name" : this.state.new_value }),
                    headers: { 'Authorization': 'Token ' + localStorage.getItem('token'),
                             "Content-Type": "application/json"
                    },
                })
                .then(response => response.json())
                .then((data) => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
            break;

            case "last_name":
                fetch('/api_musculib/customer/' + customer_id + '/', {
                    method: "PATCH",
                    body: JSON.stringify({ "last_name" : this.state.new_value }),
                    headers: { 'Authorization': 'Token ' + localStorage.getItem('token'),
                             "Content-Type": "application/json"
                    },
                })
                .then(response => response.json())
                .then((data) => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
            break;

            case "email":
                fetch('/api_musculib/customer/' + customer_id + '/', {
                    method: "PATCH",
                    body: JSON.stringify({ "email" : this.state.new_value }),
                    headers: { 'Authorization': 'Token ' + localStorage.getItem('token'),
                             "Content-Type": "application/json"
                    },
                })
                .then(response => response.json())
                .then((data) => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
            break;

            case "country":
                fetch('/api_musculib/customer/' + customer_id + '/', {
                    method: "PATCH",
                    body: JSON.stringify({ "country" : this.state.new_value }),
                    headers: { 'Authorization': 'Token ' + localStorage.getItem('token'),
                             "Content-Type": "application/json"
                    },
                })
                .then(response => response.json())
                .then((data) => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
            break;

            case "city":
                fetch('/api_musculib/customer/' + customer_id + '/', {
                    method: "PATCH",
                    body: JSON.stringify({ "city" : this.state.new_value }),
                    headers: { 'Authorization': 'Token ' + localStorage.getItem('token'),
                             "Content-Type": "application/json"
                    },
                })
                .then(response => response.json())
                .then((data) => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
            break;

            case "password":
                fetch('/api_musculib/customer/' + customer_id + '/', {
                    method: "PATCH",
                    body: JSON.stringify({ "password" : this.state.new_value }),
                    headers: { 'Authorization': 'Token ' + localStorage.getItem('token'),
                             "Content-Type": "application/json"
                    },
                })
                .then(response => response.json())
                .then((data) => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
            break;

            default :
                alert('error');
        }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        return (
            <div >
                <form onSubmit={e => this.onSubmit(e)}>
                    <label>{this.props.label}: </label>
                    <input
                        type='text'
                        name="new_value"
                        style={{width: "70%"}}
                        onChange={e => this.onChange(e)}
                        placeholder={this.props.value}
                     />
                     <button type="submit" value="Submit" className="update_button">
                        Update
                    </button>
                </form>
                <br />
            </div>
        )
    }
}

export default FormField