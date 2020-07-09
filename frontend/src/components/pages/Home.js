import React, { Component } from "react";
import { useState, useEffect } from 'react';

import Menu from '../layout/Menu';


export default class Home extends Component {

    constructor() {
        super()
        this.state = {
            muscles: [],
            declinations: []
        }
    }

    componentDidMount() {
        fetch("/api_musculib/declination/")
        .then(response => response.json())
        .then((data) => {
            this.setState({ declinations: data})
        })
        .catch((err) => {
            alert("error");
            console.log(err)
        })

        fetch("/api_musculib/muscle/")
        .then(response => response.json())
        .then((data) => {
            this.setState({ muscles: data})
        })
        .catch((err) => {
            alert("error");
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <img src="http://0.0.0.0:3000/media/cover_image.png" id="image_cover"/>
                <br /><br /><br />
                <h1>Welcome to MuscuLib</h1>
                <hr width="80%" />

                <br /><br />

                <div id="intro">
                    <p>Musculib is a website that provide almost 100 fitness exercices through an internal API.</p>
                </div>
                <br />

                <table id="summary" className="table" border="1">
                    <tbody>
                        <tr className="element_summary header_summary">
                            <th> <b>MUSCLE</b> </th>
                            <th > <b>URL</b></th>
                        </tr>

                        {this.state.muscles.map((muscle) => (
                            <tr className="element_summary" key={muscle.id}>
                                <th> Exercises that work mainly {muscle.name} </th>
                                <th > <a  href={"/exercises/muscle/" + muscle.id} >Click here</a></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br /><br />

                <table id="summary" className="table" border="1">
                    <tbody>
                        <tr className="element_summary header_summary">
                            <th> <b>DECLINATION</b> </th>
                            <th > <b>URL</b></th>
                        </tr>

                        {this.state.declinations.map((declination) => (
                            <tr key={declination.id}>
                                <th>Exercises that you can do in/with {declination.name} </th>
                                <th > <a  href={"/exercises/declination/" + declination.id} >Click here</a></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <br />
            </div>
        )
    }
}