import React from 'react'; 
import './Paginado.css';

export default function Paginado ({countriesPerPage, allCountries, paginado}) {
    const pageNumbers = [];

    for ( let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++){  
        pageNumbers.push(i)        
    }
    return(
        <nav className='pag'>
             <ul className='pagination'>
                 { pageNumbers && pageNumbers.map(number =>(           
                 <li className='pagination' key={number}> 
                    <a onClick={()=> paginado(number)}>{number}</a>
                 </li>
            ))}
            </ul>
        </nav>
    )
}