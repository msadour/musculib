import React, { Component } from "react";
import { useState, useEffect } from 'react';

import Menu from './menu/Menu';


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
                <img src="../../../../media/other/cover.png" id="image_cover"/>
                <br /><br /><br />
                <Menu />
                <br /><br /><br />
                <p className="text title title_main"> Welcome to Musculib </p>
                <hr style={{width:"80%", backgroundColor:"white"}} />

                <br /><br />

                <div id="intro">
                    <p className="text" id="intro">Musculib is a website that provide almost 100 fitness exercises through an internal API.</p>
                </div>
                <br />

                <table id="summary" className="table" border="1">
                    <tbody>
                        <tr className="element_summary header_summary">
                            <th> <p className="text text_summary">MUSCLE</p> </th>
                            <th > <p className="text text_summary">URL</p></th>
                        </tr>

                            <tr className="element_summary" >
                                <th> <p className="text paragraph"> All exercises </p> </th>
                                <th > <a className="text paragraph" href={"/exercises"} >Click here</a></th>
                            </tr>

                        {this.state.muscles.map((muscle) => (
                            <tr className="element_summary" key={muscle.id}>
                                <th> <p className="text paragraph"> Exercises that work mainly {muscle.name} </p> </th>
                                <th > <a className="text paragraph" href={"/exercises/muscle/" + muscle.id} >Click here</a></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br /><br />

                <table id="summary" className="table" border="1">
                    <tbody>
                        <tr className="element_summary header_summary">
                            <th> <p className="text text_summary">DECLINATION</p> </th>
                            <th> <p className="text text_summary">URL</p></th>
                        </tr>

                        {this.state.declinations.map((declination) => (
                            <tr key={declination.id}>
                                <th> <p className="text paragraph"> Exercises that need {declination.name} </p> </th>
                                <th > <a className="text paragraph" href={"/exercises/declination/" + declination.id} >Click here</a></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <br />
            </div>
        )
    }
}