import React, { Component } from "react";
import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

class ExercisesByDeclination extends Component {

    constructor() {
        super()
        this.state = {
            declination: {}
        }

        this.onclick.bind(this)
    }

    componentDidMount() {
        fetch("/api_musculib/declination/" + this.props.match.params.id + "/")
        .then(response => response.json())
        .then((data) => {
            this.setState({ declination: data});
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
        if (this.state.declination.related_exercises == undefined) {
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
                <h2>Exercises that you can use with/in {this.state.declination.name}</h2>
                <hr width="50%" />
                <br /><br />

                {this.state.declination.related_exercises.map((exercise) => (
                    <div key={exercise.id}>
                        <table key={exercise.id} className="table result">
                            <tbody>
                                <tr className="header_summary">
                                    <th> {exercise.name} </th>
                                </tr>

                                <tr>
                                    <th>
                                        <img onClick={() => this.onclick(exercise.id)}
                                             className="img_result"
                                             src={"../../../../../" + exercise.display_image}
                                        />
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <br /><br />
                    </div>
                ))}
            </div>
        )
    }
}

export default ExercisesByDeclination;



