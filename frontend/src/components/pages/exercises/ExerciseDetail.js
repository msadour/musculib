import React, { Component } from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Menu from '../menu/Menu';

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
                <br /><br />
                <table id="exercice_detail" className="table">
                    <tbody>
                        <tr>
                            <th className="header_summary"> <p className="text text_summary">{this.state.exercise.name}</p> </th>
                        </tr>

                        <tr>
                            <th> <img id="img_detail" src={"../../../../../" + this.state.exercise.display_image} /> </th>
                        </tr>

                        <tr>
                            <th>
                                <br />
                                <p className="text title title_third">Description</p> <br />
                                <p className="text paragraph"> {this.state.exercise.description}</p>
                                <br />
                            </th>
                        </tr>

                        <tr>
                            <th>
                                <p className="text title title_third">Muscle thats mainly worked </p> <br />
                                <a className="text paragraph link_muscles" href={"/exercises/muscle/" + this.state.exercise.main_muscle_worked.id} >
                                { this.state.exercise.main_muscle_worked['name'] }
                                </a>
                                <br /><br />
                            </th>
                        </tr>

                        {this.state.exercise.others_muscles_worked.length == 0 ? (
                            <tr><th> <br /> </th></tr>
                        ) : (
                            <tr>
                                <th >
                                    <p className="text title title_third">Other(s) muscle(s) secondary used</p>
                                    {this.state.exercise.others_muscles_worked.map((muscle) => (
                                        <div key={muscle.id}>
                                            <a className="text paragraph link_muscles" href={"/exercises/muscle/" + muscle.id} >{ muscle.name }</a>
                                            <br /><br />
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