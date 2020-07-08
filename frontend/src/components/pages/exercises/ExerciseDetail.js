import React, { Component } from "react";
import { useState, useEffect } from 'react';

import axios from 'axios';

class ExerciseDetail extends Component {

    constructor() {
        super()
        this.state = {
            exercise: {}
        }
    }

    componentDidMount() {
        fetch("/api_musculib/exercice/" + this.props.match.params.id + "/")
        .then(response => response.json())
        .then((data) => {
            this.setState({ exercise: data})
        })
        .catch((err) => {
            alert("error");
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <table id="exercice_detail" className="table">
                    <tbody>
                        <tr>
                            <th className="header_summary"> <p>{this.state.exercise.name}</p> </th>
                        </tr>

                        <tr>
                            <th> <img id="img_detail" src={"http://0.0.0.0:3000/" + this.state.exercise.display_image} /> </th>
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
                                <h2>Muscle primary worked</h2>
                                <p>{ this.state.exercise.main_muscle }</p>
                                <br /> <br />
                            </th>
                        </tr>

                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExerciseDetail;