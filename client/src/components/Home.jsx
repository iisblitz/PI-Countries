import React, { useState } from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries, filterCountriesByRegion, orderByName, getActivities, filterCreated, orderByPopulation } from "../actions";
import Card from './Card'
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import './Home.css';
import africa from "../pictures/africa.png";
import Asia from "../pictures/Asia.png";
import europa from "../pictures/europa.png";
import suramerica from "../pictures/suramerica.png";
import norteamerica from "../pictures/norteamerica.png";
import oceania from "../pictures/oceania.png";
import artantica from "../pictures/artantica.png";
import mundo from "../pictures/mundo.png";
import countries from "../pictures/countries.png";

export default function Home () {
    const dispatch = useDispatch()
    const activities = useSelector((state)=> state.activities)
    const allCountries = useSelector ((state)=> state.countries) // es lo mismo que hacer el MyStateToProps
    const [currentPage, setCurrentPage] = useState(1)
    const [orden, setOrden] = useState ('');
    const [countriesPrePage] = useState(10)
    const indexOfLastCountries = currentPage * countriesPrePage
    const indexOfFirstCountries = indexOfLastCountries - countriesPrePage
    const currentCountries = allCountries.slice(indexOfFirstCountries, indexOfLastCountries)



    const paginado = (pageNumber)=> {
        setCurrentPage(pageNumber)
    }
    

useEffect(()=>{
    dispatch(getCountries());
    dispatch(getActivities());
   },[dispatch]);
     
function handleClick(el){
    el.preventDefault();
    dispatch(getCountries());
    };

function handleSort (el){
    el.preventDefault();
    dispatch(orderByName(el.target.value))
    setOrden(`Ordenado ${el.target.value}`)
    };

function handleSortP (el){
    el.preventDefault();
    dispatch(orderByPopulation(el.target.value))
    setOrden(`Ordenado ${el.target.value}`)
    };    
  

function handleSelec (el){
    el.preventDefault();
    dispatch(filterCreated(el.target.value))    
    };
function handleFilterRegion(el){
    dispatch(filterCountriesByRegion(el.target.value))
    setCurrentPage(1)
    }

return(
<div>
<img src={countries} alt='' height= '70px' ></img>
                <h1 class="H-title">Henry Countries</h1>
            
    <div className='encabe'>
        <div className='container barr'>
            <div className='actividad'>
                <div className='crear'class="crear">
                    <Link to= '/activitiesCreate' >Create Activities</Link>
                </div>
                <div className='filtro-act'>
                    <select onChange={(el)=>handleSelec(el)}>
                    <option value = 'sin filtro'>No filter</option>
                        {activities.map((act)=>(
                    <option value={act.name}>{act.name}</option>
                     ))}
                    </select>
                </div>
            </div>  
            <div className='ordenar'>
            <select onClick={el=> {handleSort(el)}}>
                <option value = ''>Sort</option>
                <option value = 'asc'>A-Z</option>
                <option value = 'desc'>Z-A</option>
            </select> 
            </div>             
            <div className='ordenar'>
            <select onClick={el=> {handleSortP(el)}}>
                <option value = ''>Population</option>
                <option value = 'asc'>Ascending</option>
                <option value = 'desc'>Descening</option>
            </select> 
            </div>
            
            <div className='barr2'>
                <button onClick={el=> {handleClick(el)}}>
                Reload
                </button>
            </div>
            <div>
                <SearchBar setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    </div>
    <div className='container app-cont'>
        <div className='barr3'>
            <Paginado
            countriesPerPage={countriesPrePage}
            allCountries = {allCountries.length}
            paginado = {paginado}
            />
        </div>
        <div className= "container grid">
            {currentCountries.map(c=>{
            return ( 
                <div className='item' >
                    <Link to= {`/detail/${c.id}`} >              
                        <Card  key= {c.id} name= {c.name} img= {c.img} continents={c.continents} capital = {c.capital} />
                    </Link> 
                </div>         
                );
            })}          

        </div>
    </div>
        <div className='form'>
            <div className='bloq1'>
                <div class="continent">
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}} value='All'/>All
                    <br></br><br></br><br></br><br></br>
                    <img src={mundo} alt=''/>
                </div>
                <div class="continent">
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Europe'}/> Europe
                    <br></br><br></br><br></br><br></br>
                    <img src={europa} alt=''/>
                </div>
                <div class="continent">
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Asia'}/> Asia
                    <br></br><br></br><br></br><br></br>
                    <img src={Asia} alt=''/>
                </div> 
                <div class="continent">
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Africa'}/> Africa
                    <br></br><br></br><br></br><br></br>
                    <img src={africa} alt=''/>
                </div>
            
                <div class="continent">
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'South America'}/> South America
                    <br></br><br></br><br></br><br></br>
                    <img src={suramerica} alt=''/>
                </div>

                <div class="continent">
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'North America'}/> North America
                    <br></br><br></br><br></br><br></br>
                    <img src={norteamerica} alt=''/>
                </div>
                <div class="continent">
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Oceania'}/> Oceania
                    <br></br><br></br><br></br><br></br>
                    <img src={oceania} alt=''/>
                </div>
                <div class="continent">
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Antarctica'}/> Antartica
                    <br></br><br></br><br></br><br></br>
                    <img src={artantica} alt=''/>
                </div>
            </div>
        </div>
</div>
)
}