import React, { Component } from "react";
import { useState, useEffect } from 'react';


class ExercisesByMuscle extends Component {

    constructor() {
        super()
        this.state = {
            muscle: {}
        }

        this.onclick.bind(this)
    }

    componentDidMount() {
        fetch("/api_musculib/muscle/" + this.props.match.params.id + "/")
        .then(response => response.json())
        .then((data) => {
            this.setState({ muscle: data});
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

        if (this.state.muscle.main_muscle_worked == undefined) {
            return (
                <div>Exercies loading...</div>
            )
        }
        return (
            <div>
                <h2>Exercices for {this.state.muscle.name}</h2>

                {this.state.muscle.main_muscle_worked.map((exercise) => (
                    <table key={exercise.id}>
                        <tbody>
                            <tr>
                                <th> {exercise.name} </th>
                            </tr>

                            <tr>
                                <th>
                                    <img onClick={() => this.onclick(exercise.id)}
                                         style={{width:"25%"}}
                                         src={"http://0.0.0.0:3000/" + exercise.display_image}
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

export default ExercisesByMuscle;