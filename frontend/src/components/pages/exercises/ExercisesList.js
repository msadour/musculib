import React, { Component } from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Menu from '../menu/Menu';

class ExercisesList extends Component {

    constructor() {
        super()
        this.state = {
            exercises: [],
            customer: null,
            title: null
        }

        this.onclick.bind(this);
        this.removeExercise.bind(this);
        this.addExercise.bind(this);
    }

    componentDidMount() {

        if (localStorage.getItem('customer_id')){
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

        let url = "";

        if(window.location.pathname.includes('/exercises/muscle/')) {
            url = "/api_musculib/muscle/" + this.props.match.params.id + "/";
            fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.setState({ exercises: data['main_muscle_worked']})
            })
            .catch((err) => {
                console.log(err)
            })


        } else if (window.location.pathname.includes('exercises/declination/')) {
            url = "/api_musculib/declination/" + this.props.match.params.id + "/";
            fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.setState({ exercises: data['related_exercises']})
            })
            .catch((err) => {
                console.log(err)
            })


        }
        else if (window.location.pathname.includes('your_favorite_exercises')) {
            url = "/api_musculib/customer/" + localStorage.getItem('customer_id') + "/";
            fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.setState({ exercises: data['favorite_exercice']})
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else {
            url = "/api_musculib/exercise/";
            fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.setState({ exercises: data})
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    onclick (id) {
        this.props.history.push("/exercises_detail/" + id)
    }

    onChange(e) {
        fetch('/api_musculib/exercise?search=' + e.target.value)
        .then(response => response.json())
        .then((data) => {
            this.setState({exercises: data});
        })
        .catch(err => {
            alert('error');
        });
    }

    removeExercise (id) {
        fetch('/api_musculib/customer/' + this.state.customer.id + '/', {
            method: "PATCH",
            body: JSON.stringify({ "remove_exercise" : id }),
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
    }

    addExercise (id) {
        fetch('/api_musculib/customer/' + this.state.customer.id + '/', {
            method: "PATCH",
            body: JSON.stringify({ "add_exercise" : id }),
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
    }

    render() {
        if (this.state.exercises == undefined) {
            return (
                <div>Exercies loading...</div>
            )
        }

        return (
            <div>
                <Menu />
                <br />

                {window.location.pathname.includes('all_exercises') == true ? (
                   <input
                    style={{"border":"1px solid black", width: "30%", padding: "0.9%", marginLeft: "30%"}}
                    placeholder="Filter exercises.."
                    onChange={(e) => this.onChange(e)}
                   />
                ) : (
                    <div></div>
                )}

                <br />
                {this.state.exercises.map((exercise) => (
                    <div key={exercise.id}>
                        <br />
                        <table key={exercise.id} className="table result">
                            <tbody>
                                <tr className="header_summary">
                                    <th> <p className="text text_summary">{exercise.name}</p> </th>
                                </tr>

                                <tr>
                                    <th>
                                        <Link to={"/exercises_detail/" + exercise.id}>
                                            <img
                                                className="img_result"
                                                src={"../../../../../" + exercise.display_image}
                                            />
                                        </ Link>
                                        <br /><br />
                                    </th>
                                </tr>

                                {this.state.customer !== null ? (
                                    <tr>
                                        <th>
                                            {this.state.customer.favorite_exercice.find(exercise_favorite => exercise_favorite.id == exercise.id) ? (
                                                <button onClick={(e) => this.removeExercise(exercise.id)}>Remove</button>
                                            ) : (
                                                <button onClick={(e) => this.addExercise(exercise.id)}>Add</button>
                                            )}
                                        </th>
                                    </tr>
                                ) : (
                                    <tr> <th></th></tr>
                                )}
                            </tbody>
                        </table>
                        <br />
                    </div>

                ))}
            </div>
        )
    }
}

export default ExercisesList;