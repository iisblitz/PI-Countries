import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import travellingTheWorld from "../pictures/travellingTheWorld.gif"
import CardActivities from './CardAvtivities'
import './Detail.css'


export default function Detail (){
    let {id}= useParams();
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getDetail(id));
    },[dispatch]);

    
    const myCountry = useSelector ((state)=> state.detail)
    
    
    console.log(id)
    const numberWithDot = (x) => {
        if(typeof x === 'number') {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
    }

    return (
        myCountry && myCountry.id 
        ? ( 
            
            <div>
            <div className="container detalle" key = {myCountry.id}>
                <div className="detalle2">
                    <div className="pais">
                        <img src={myCountry.img} alt = {myCountry.name} width= "500px" height= "320px" ></img>
                    </div>
                        <div className="detail">
                            <h1>{myCountry.name}</h1>
                        <h2>Continent: {myCountry.continents}</h2>
                        <h2>Capital: {myCountry.capital}</h2>
                        <h2>Sub-region: {myCountry.subregion}</h2>
                        <h2>Area: {numberWithDot(myCountry.area)} km²</h2>
                        <h2>Population: {numberWithDot(myCountry.population)} hab </h2>
                        <h2>Borders: {myCountry.borders} </h2>
                        </div>
                </div>

                <div className="bar">
                    <Link to= {'/home'}>
                        <button className="btn">go back</button>
                    </Link>
                </div>
            </div>
                <div className="card-atv">

                {myCountry.activities.map(el=> {
                    return(
                        <div >
                            <CardActivities key= {el.id} name= {el.name} temporada={el.temporada} duracion = {el.duracion} dificultad = {el.dificultad} borders = {el.borders} />   
                        </div>
                        )
                })}
                </div>       
            </div>
        )
            : <div className="gif">
                <img src={travellingTheWorld} width= "500px" height= "500px" alt="travelling the world" />
                <p>Loading...</p>
            </div>
    )

}