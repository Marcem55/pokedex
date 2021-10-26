import React, { useEffect } from "react";
import { getName } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { imageLoading } from "../../helpers/index";
import "./PokemonDetail.css"; 
import NavBar from "../NavBar/NavBar";

export default function PokemonDetail ({id}) {

    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getName(id))
        dispatch({type: "CLEAN_RESULT"})
    }, [dispatch, id]);
    
    const found = useSelector((state) => state.pokemonLoaded);
    const loading = useSelector((state) => state.loading);

    return(
        <div>
            <NavBar />
        <div className='detailContainer'>
            <div className='linkCont'>
                <Link className='goHome' to='/home'><span className='detailBtn'> Back Home </span></Link>
            </div>
            <>
                <h1 className='pokeDetailsTitle'>Pokemon Details</h1>
            </>
        {
            loading ? <><img src={imageLoading} alt="loading" width='300'/></> 
            :
            <div className='detailCard'>
                <div>
                    <div className='detImgNameType'>
                        <img src={found.image} alt={found.name} className='imgDetail'/>
                        <div className='nameType'>
                            <h1>{found.name}</h1>
                            Type/s<h3>{found.types}</h3>
                        </div>
                    </div>
                    <div className='detStats'>
                        <span>ID</span>
                        <span>{found.id}</span>
                        <span>HP</span>
                        <span>{found.hp}</span>
                        <span>SPEED</span>
                        <span>{found.speed}</span>
                        <span>ATTACK</span>
                        <span>{found.attack}</span>
                        <span>DEFENSE</span>
                        <span>{found.defense}</span>
                        <span>HEIGHT</span>
                        <span>{found.height}</span>
                        <span>WEIGHT</span>
                        <span>{found.weight}</span>
                    </div>
                </div>
            </div>
        }
        </div>
        </div>
    )
};