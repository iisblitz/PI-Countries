import React from "react";
import './Card.css';



export default function Card({name, img, continents, capital }) {
    return(

<div className="body">
    <div className='card-g'>
        <div className='face front'>
            <img src={img} alt="img no found" width= '100%' height= '100%'  />
            <h2>{name}</h2>
        </div>
        <div className='face back'>
            <h4>{name}</h4>
            <img src={img} alt="img no found" width= '100%' height= '100%'  />  
            <h6>{capital}</h6>
            <h3>{continents}</h3>
           
        </div>
    </div>
        
</div>



    );
}