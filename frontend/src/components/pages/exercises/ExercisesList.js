import React, { Component } from "react";
import { useState, useEffect } from 'react';

class ExercisesList extends Component {

    constructor() {
        super()
        this.state = {
            exercises: []
        }

        this.onclick.bind(this)
    }

    componentDidMount() {
        fetch("/api_musculib/exercice/")
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
                {this.state.exercises.map((exercise) => (
                    <div>
                        <br /><br />
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
                                            src={exercise.display_image}
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