import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {addActivities, getActivities} from "../actions/index";
import {useDispatch, useSelector} from "react-redux";
import viaje from "../pictures/viaje.gif";
import './ActivitiesCreate.css';

function validate(input){   
    let errors = {};
    if (!input.name){
        errors.name = 'write an activity'
    }else if (!input.dificultad) {
        errors.dificultad = 'Set a defficulty'
       
    }else if (!input.duracion) {
        errors.duracion = 'set a duration'
       
    }else if (!input.temporada) {
        errors.temporada = 'in which seasons can this activity be practiced'
    }
    return errors;
}

export default function ActivitiesCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state)=> state.countries)
    
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        dificultad:"", // igual que temporada[]
        duracion: "",
        temporada: "", // seria como decir Ocupacion []
        countriesId: [],
    });
    
    function handleChange(el){
    
        
        setInput({
            ...input,
            [el.target.name]: el.target.value
        })
        setErrors(validate({
            ...input,
            [el.target.name]: el.target.value
        }
        ));
        console.log(input)
    }
    function handleCheck(el){
        if (el.target.checked){
            
            setInput({
                ...input,
                [el.target.name]:el.target.value
                
            })
            setErrors(validate({
                ...input,
                [el.target.name]: el.target.value
            }
            ));
        }
    }
    function handleSelec(el){
        const country = countries.find(c=>c.id === el.target.value)
          setInput({
            ...input,
            countriesId: [...input.countriesId,country]
        })
    }

    function handleSumit(el){
        el.preventDefault();
        console.log(input)
        dispatch(addActivities(input))
        alert("Activy Created")
        setInput({
            name: "",
            dificultad:[], 
            duracion: "",
            temporada: []
        })
        history.push('/home')
    }

    
    function handleDelete(el){
        setInput({
            ...input, // se trae el estado anterior
            countriesId: input.countriesId.filter(occ => occ !== el)
        })
    }

    useEffect(() => {
        dispatch(getActivities());
    },[dispatch]);

    return (
        <div className="container act" class="activity">
                    <div className="imagen">
                    <img src={viaje} alt='' ></img>
                    </div>
            <h1>Create a turistic activity</h1>
            <form onSubmit={(el)=>handleSumit(el)}>
                <div className="act1">
                    <label>Activity:</label>
                    <input
                    type = "text"
                    required
                    value= {input.name}
                    name= "name"
                    onChange={(el)=>handleChange(el)}
                    />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                        )}
                </div>
                <div className="dif1">
                    <label>Dificulty:</label>
                    <label><input
                    type = "radio"
                    required
                    name= "dificultad"
                    value= "1"
                    onChange={(el)=>handleCheck(el)}
                    />1</label>   
                    <label><input
                    type = "radio"
                    name= "dificultad"
                    value= "2"
                    onChange={(el)=>handleCheck(el)}
                    />2</label>   
                    <label><input
                    type = "radio"
                    name= "dificultad"
                    value= "3"
                    onChange={(el)=>handleCheck(el)}
                    />3</label>
                    <label><input
                    type = "radio"
                    name= "dificultad"
                    value= "4"
                    onChange={(el)=>handleCheck(el)}
                    />4</label>     
                     <label><input
                    type = "radio"
                    name= "dificultad"
                    value= "5"
                    onChange={(el)=>handleCheck(el)}
                    />5</label>
                    {errors.dificultad && (
                        <p className="error">{errors.dificultad}</p>
                        )}     
                </div>
                <div className="dur1">
                    <label>Duration:</label>
                    <input
                    type = "number"
                    required
                    min="1"
                    max="12"
                    value= {input.duracion}
                    name= "duracion"
                    onChange={(el)=>handleChange(el)}
                    />
                    {errors.duracion && (
                        <p className="error">{errors.duracion}</p>
                    )} 
                </div>
                <div className="tem1">
                    <label>Season:</label>
                    <label><input
                    type = "radio"
                    required
                    name= "temporada"
                    value= "Primavera"
                    onChange={(el)=>handleCheck(el)}
                    />Spring</label>          
                    <label><input
                    type = "radio"
                    name= "temporada"
                    value= "Verano"
                    onChange={(el)=>handleCheck(el)}  
                    />Summer</label>  
                    <label><input
                    type = "radio"
                    name= "temporada"
                    value= "Otoño"
                    onChange={(el)=>handleCheck(el)}
                    />Fall</label> 
                    <label><input
                    type = "radio"
                    name= "temporada"
                    value= "Invierno"
                    onChange={(el)=>handleCheck(el)}
                    />Winter</label>
                    {errors.temporada && (
                        <p className="error">{errors.temporada}</p>
                        )} 
                </div>
                <select onChange={(el)=>handleSelec(el)}required>
                <option value = '' > Destiny...</option>
                    {countries.map((count)=>(
                        
                        <option value={count.id}>{count.name}</option>
                    ))}
                </select>
                
                <button >Create activity</button>        

            </form>
            <div className="caja-de-paises">
                {input.countriesId.map(el=> 
                    <div className = "divOcc">
                        <p>{el.name}</p>
                        <img src={el.img} alt="" />
                        <button className="botonX" onClick={() => handleDelete(el)}>X</button>
                        </div>
                    )}

            </div>
            <Link to= '/home' class><button class="goback">Go back</button></Link>
        </div>
    )
    
    

}