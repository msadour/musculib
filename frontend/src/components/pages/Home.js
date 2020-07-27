import React, { Component } from "react";
import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner'

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
            console.log(err)
        })

        fetch("/api_musculib/muscle/")
        .then(response => response.json())
        .then((data) => {
            this.setState({ muscles: data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {

        return (
            <div>
                <br /><br />
                <p className="text title title_main"> WELCOME TO MUSCULIB </p>
                <hr style={{width:"80%", backgroundColor:"#ddecf8"}} />

                <br /><br />

                <div id="intro">
                    <p className="text" id="intro">Musculib is a website that provides almost 100 fitness exercises through an internal API.</p>
                </div>
                <br /><br /><br />

                <table style={{margin: "0 auto"}}>
                    <tbody>
                        <tr>
                            <th>
                                <img style={{width: "100%"}} src="../../../../media/barbell/squat.png" />
                            </th>

                            <th>
                                <img style={{width: "100%"}} src="../../../../media/barbell/close_bench_press.png" />
                            </th>
                        </tr>

                        <tr>
                            <th>
                                <img style={{width: "100%"}} src="../../../../media/dumbbell/shoulders_press.png" />
                            </th>

                            <th>
                                <img style={{width: "100%"}} src="../../../../media/bodyweight/pull_up.png" />
                            </th>
                        </tr>
                    </tbody>
                </table>

                <br /> <br /><br /> <br /><br /> <br />
            </div>
        )
    }
}