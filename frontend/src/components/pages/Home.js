import React, { Component } from "react";
import { useState, useEffect } from 'react';

import Menu from '../layout/Menu';

export default class Home extends Component {
    render() {
        return (
            <div>
                <img src="media/cover_image.png" id="image_cover"/>

               <Menu />

                <h1>Welcome to my Fitness API</h1>
                <hr width="80%" />

                <br /><br />

                <div id="intro">
                    <p>Musculib is a website that provide almost 100 fitness exercices through an internal API. For use it, add the path in the end of the url.</p>
                </div>
                <br />

                <table id="summary" class="table" border="1">
                    <tbody>
                        <tr class="element_summary">
                            <th> <b>URL</b> </th>
                            <th > <b>DESCRIPTION</b></th>
                            <th> <b>EXEMPLE</b></th>
                            <th> <b>VALUES POSSIBLE</b> </th>
                        </tr>


                        <tr class="element_summary">
                            <th>/all</th>
                            <th>Display all exercices.</th>
                            <th>
                                <form action="{{web_host}}/all">
                                    <input type="submit" value="all" />
                                </form>
                            </th>
                            <th></th>
                        </tr>


                        <tr class="element_summary">
                            <th>/name/:exercice:</th>
                            <th>Display exercices with this name.</th>
                            <th>
                                 <form action="{{web_host}}/name/push up">
                                    <input type="submit" value="Push up" />
                                </form>

                            </th>
                            <th>
                                <select>
                                </select>
                            </th>

                        </tr>


                        <tr class="element_summary">
                            <th>/:muscle:</th>
                            <th>Display all exercices which are focused on this muscle.</th>
                            <th>
                                 <form action="{{web_host}}/focus/back">
                                    <input type="submit" value="Back focus" />
                                </form>
                            </th>
                            <th>
                                <select>
                                </select>

                            </th>
                        </tr>


                        <tr class="element_summary">
                            <th>/using/:muscle:</th>
                            <th>Display all exercices whose this muscle is mainly worked or used.</th>
                            <th>
                                 <form action="{{web_host}}/using/biceps">
                                    <input type="submit" value="Using biceps" />
                                </form>
                            </th>
                            <th>
                                <select>
                                </select>
                            </th>
                        </tr>


                        <tr class="element_summary">
                            <th>/type/:declinaison:</th>
                            <th>Display all exercices which can be doing with this declinaison.</th>
                            <th>
                                 <form action="/type/bodyweight">
                                    <input type="submit" value="bodyweight's exercices" />
                                </form>
                            </th>
                            <th>
                                <select>
                                </select>

                            </th>
                        </tr>
                    </tbody>
                </table>

                 <br />

                <h1>How use my API inside your application</h1>
                <hr width="80%" />
            </div>
        )
    }
}