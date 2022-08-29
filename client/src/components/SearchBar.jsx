import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";
import '../components/SearchBar.css';


export default function SeaechBar({setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleImputCountries(el){
        el.preventDefault()
        setName(el.target.value)
        console.log(name)    
    }
    function handleSubmit(el){
        el.preventDefault()
        if(!name) return alert("Write a country")
        dispatch(getNameCountries(name))
        setCurrentPage(1)
        setName ("")
    }

    return(
        <div>
            
            <div className="containerr">      
                <input type= 'text'  placeholder = ' Search...' onChange={(el) => handleImputCountries(el)} />
                <div className="btnn">
                    <button className="search" type="submit"  onClick={(el)=> handleSubmit(el)} >Search</button>
                </div>
            </div>
        </div>

    )
}