import React from "react";
import './Detail.css'



export default function CardActivities({name, dificultad , duracion, temporada }) {
    return(

<div className="body1">
    <div className='card-g1'>
        <div className='face front1'>
            <h2>Activy: {name}.</h2>
            <h4>Dificulty: {dificultad}</h4>
            <h6>Duration: {duracion}</h6>
            <h6>Season: {temporada}</h6>             
        </div>
    </div>
        
</div>



    );
}