import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterType, orderByName, orderByForce, isCreated } from "../../actions";
import { Link } from "react-router-dom";
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import SearchByName from '../SearchByName/SearchByName';
import './Home.css';

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemonsFilter);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(9);
    const indexLastPoke = currentPage * pokemonsPerPage;
    const indexFirstPoke = indexLastPoke - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexFirstPoke, indexLastPoke);

    const pagination = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch]);

    const handleOnClick = e => {
        e.preventDefault();
        dispatch(getPokemons());
    }

    const handleFilterType = e => {
        e.preventDefault();
        dispatch(filterType(e.target.value));
    }

    const handleNameOrder = e => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
    }

    const handleForceOrder = e => {
        e.preventDefault();
        dispatch(orderByForce(e.target.value));
    }

    const handleCreate = e => {
        e.preventDefault();
        dispatch(isCreated(e.target.value));
    }

    return(
        <div> 
        
            <div className="divsearch">
            <SearchByName />
            </div> 
    <a href="/addpokemon" class="myButton">Crear Pokemon</a>
            <button className='cargar' onClick={e => {handleOnClick(e)}}>
                Volver a cargar todos los personajes
            </button>
                {/* <Link to= '/pokemon'>
                    <button class="crear" >Crear Personaje</button>
                    </Link>  */}
   
    
        <h1 className="h1pokemon">-POKEMON-</h1>
        
            <select className="az" onChange={e=>handleNameOrder(e)}>
                <option value='az'>AZ</option>
                <option value='za'>ZA</option>
            </select>
        
            <select className="created" onChange={e=>handleCreate(e)}>
                <option value='all'>All</option>
                <option value='created'>Created</option>
                <option value='existent'>Existent</option>
            </select>


            <select className="fuerza" onChange= {e=>{handleForceOrder(e)}} >
                <option value='All'>All</option>
                <option value='strong'>Ascendente fuerza</option>
                <option value='weak'>Descendente fuerza</option>
            </select>
        

            <select className="all" onChange={e=> {handleFilterType(e)}}>
            <option value='All'>All</option>
                <option value='Normal'>Normal</option>
                <option value='Fighting'>Fighting</option>
                <option value='Flying'>Flying</option>
                <option value='Poison'>Poison</option>
                <option value='Ground'>Ground</option>
                <option value='Bug'>Bug</option>
                <option value='Rock'>Rock</option>
                <option value='Ghost'>Ghost</option>
                <option value='Steele'>Steele</option>
                <option value='Fire'>Fire</option>
                <option value='Water'>Water</option>
                <option value='Grass'>Grass</option>
                <option value='Electric'>Electric</option>
                <option value='Psychic'>Psychic</option>
                <option value='Ice'>Ice</option>
                <option value='Dragon'>Dragon</option>
                <option value='Dark'>Dark</option>
                <option value='Fairy'>Fairy</option>
                <option value='Unknown'>Unknown</option>
                <option value='Shadow'>Shadow</option>
            </select>

            
            
            <Pagination //renderizamos
            pokemonsPerPage = {pokemonsPerPage}
            allPokemons = {allPokemons.length} //porque necesito un estado numerico.
            pagination = {pagination}
            />
            {
                currentPokemons?.map((p)=>{ 
                    // console.log(p, "HOME----------------")//currentPokemons
                    // console.log(allpokemon,"allP")
                    return(
                        <fragment>
                   <Link to={`pokemon/${p.id}`}>
                   <Card name={p.name} image={p.image} types={p.types?.map(t=> t+ " - ")} key={p.id} />
                   </Link>
                        </fragment>
                   )
               })
            }
        </div>
    )
}
