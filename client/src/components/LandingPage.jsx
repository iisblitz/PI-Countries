import React from 'react';
import {Link} from 'react-router-dom';
import "./LandingPage.css";
import henry from "../pictures/ISOLOGO_HENRY_BLACK.png";

export default function LandingPage(){
    return(
        <header  >
        <div className='texto' >
            <h1 class="title">Henry Countries</h1>
            <p class="sub-title">Proyecto Individual</p>
            <img class="logo" src={henry} alt="Henry"/>

            <h5 class="name">Nombre: David Gonzalez Alanis</h5>
            <h5 class="origin">Pais: México</h5>
            <h6 class="class">Cohorte: webft28a</h6>
            <Link to ='/home'>
                <button class="enter">Entrar a proyecto</button>
            </Link>
        </div>
        </header>
    )
}