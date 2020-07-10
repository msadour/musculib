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

    render() {

        return (
            <div>
                <br />
                <Link to='/'>
                    <img className="img_go_home" src="../../../../../media/other/home.png" />
                </Link>

               <input
                style={{"border":"1px solid black", width: "30%", padding: "0.9%", marginLeft: "30%"}}
                placeholder="Filter exercises.."
                onChange={(e) => this.onChange(e)}
               />

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