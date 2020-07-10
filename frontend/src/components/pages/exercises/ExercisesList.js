import React, { Component } from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

class ExercisesList extends Component {

    constructor() {
        super()
        this.state = {
            exercises: []
        }

        this.onclick.bind(this)
    }

    componentDidMount() {
        fetch("/api_musculib/exercise/")
        .then(response => response.json())
        .then((data) => {
            this.setState({ exercises: data})
        })
        .catch((err) => {
            alert("error");
            console.log(err)
        })
    }

    onclick (id) {
        this.props.history.push("/exercises_detail/" + id)
    }

    render() {

        if (this.state.exercises.length == 0) {
            return (
                <div>Exercies loading...</div>
            )
        }
        return (
            <div>
                <br />
                <Link to='/'>
                    <img className="img_go_home" src="../../../../../media/home.png" />
                </Link>
                <br />
                {this.state.exercises.map((exercise) => (
                    <div key={exercise.id}>
                        <br />
                        <table key={exercise.id} className="table result">
                            <tbody>
                                <tr className="header_summary">
                                    <th> <h2>{exercise.name}</h2> </th>
                                </tr>

                                <tr>
                                    <th>
                                        <img
                                            className="img_result"
                                            onClick={() => this.onclick(exercise.id)}
                                            src={"../../../../../" + exercise.display_image}
                                        />
                                        <br /><br />
                                    </th>
                                </tr>
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