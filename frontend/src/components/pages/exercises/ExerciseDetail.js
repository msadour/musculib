import React, { Component } from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';

class ExerciseDetail extends Component {

    constructor() {
        super()
        this.state = {
            exercise: {}
        }

        this.onclickToMuscleExercises.bind(this)
    }

    componentDidMount() {
        fetch("/api_musculib/exercise/" + this.props.match.params.id + "/")
        .then(response => response.json())
        .then((data) => {
            this.setState({ exercise: data})
        })
        .catch((err) => {
            alert("error");
            console.log(err)
        })
    }

    onclickToMuscleExercises (id) {
        this.props.history.push("/exercises/muscle/" + id)
    }

    render() {
        if(this.state.exercise.main_muscle_worked == undefined) {
            return (<div></div>)
        }

        return (
            <div>
                <br />
                <Link to='/'>
                    <img className="img_go_home" src="../../../../../media/other/home.png" />
                </Link>
                <br />
                <table id="exercice_detail" className="table">
                    <tbody>
                        <tr>
                            <th className="header_summary"> <p>{this.state.exercise.name}</p> </th>
                        </tr>

                        <tr>
                            <th> <img id="img_detail" src={"../../../../../" + this.state.exercise.display_image} /> </th>
                        </tr>

                        <tr>
                            <th>
                                <br />
                                <h2>Description</h2>
                                {this.state.exercise.description}
                                <br /> <br />
                            </th>
                        </tr>

                        <tr>
                            <th>
                                <h2>Muscle thats mainly worked </h2>
                                <p><a href={"/exercises/muscle/" + this.state.exercise.main_muscle_worked.id} >{ this.state.exercise.main_muscle_worked['name'] }</a></p>
                                <br />
                            </th>
                        </tr>

                        {this.state.exercise.others_muscles_worked.length == 0 ? (
                            <tr><th> <br /> </th></tr>
                        ) : (
                            <tr>
                                <th >
                                    <h2>Other(s) muscle(s) secondary used</h2>
                                    {this.state.exercise.others_muscles_worked.map((muscle) => (
                                        <div key={muscle.id}>
                                            <p><a  href={"/exercises/muscle/" + muscle.id} >{ muscle.name }</a></p>
                                            <br />
                                        </div>

                                    ))}
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
                <br /><br />
            </div>
        )
    }
}

export default ExerciseDetail;