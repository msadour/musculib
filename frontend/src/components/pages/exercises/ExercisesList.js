import React, { Component } from "react";
import { useState, useEffect } from 'react';

import axios from 'axios';

import ExerciseDetail from './ExerciseDetail';

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
        console.log(this.state.exercises[0])
        return (
            <div>
                {this.state.exercises.map((exercise) => (
                    <table key={exercise.id}>
                        <tbody>
                            <tr>
                                <th> {exercise.name} </th>
                            </tr>

                            <tr>
                                <th>
                                    <img onClick={() => this.onclick(exercise.id)}
                                         style={{width:"25%"}}
                                         src={exercise.display_image}
                                    />
                                </th>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>
        )
    }
}

export default ExercisesList;