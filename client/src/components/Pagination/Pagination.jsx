import React from "react";
import "./Pagination.css";

export default function Pagination({itemsPerPage, totalPokemons, changePage}) {
    
    const pages = [];

    for (let i=1; i <= Math.ceil(totalPokemons / itemsPerPage); i++) {
        pages.push(i);
    };

    return (
        <div className='pagination'>
                {pages.map(page => (
                    <button 
                    key={page} 
                    className="pages"
                    onClick={() => changePage(page)}
                    >{page}</button>
                ))}
        </div>
    )
};