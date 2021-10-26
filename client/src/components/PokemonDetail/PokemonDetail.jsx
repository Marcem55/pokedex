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
    
    const foundPoke = useSelector((state) => state.pokemonLoaded);
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
                        <img src={foundPoke.image} alt={foundPoke.name} className='imgDetail'/>
                        <div className='nameType'>
                            <h1>{foundPoke.name}</h1>
                            <h3>Type</h3>
                            <h4>{foundPoke.types}</h4>
                        </div>
                    </div>
                    <div className='detStats'>
                        <span>ID</span>
                        <span>LIFE</span>
                        <span>ATTACK</span>
                        <span>DEFENSE</span>
                        <span>SPEED</span>
                        <span>HEIGHT</span>
                        <span>WEIGHT</span>
                        <span>{foundPoke.id}</span>
                        <span>{foundPoke.hp}</span>
                        <span>{foundPoke.attack}</span>
                        <span>{foundPoke.defense}</span>
                        <span>{foundPoke.speed}</span>
                        <span>{foundPoke.height}</span>
                        <span>{foundPoke.weight}</span>
                    </div>
                </div>
            </div>
        }
        </div>
        </div>
    )
};