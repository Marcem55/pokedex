import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPokemonDetail } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import './PokemonDetail.css';

export default function PokemonDetail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemonDetail(props.match.params.id));
    }, [dispatch]);

    const detailPoke = useSelector(state => state.pokemonDetail);
    // console.log(detailPoke, "EL ESTADO DETAIL");
    return (
        <div className='detailContainer'>
            {
                <div className='divdetailS'>
                    <h2>{detailPoke.name}</h2>
                    <img classname='imgDetail' src={detailPoke.image} alt="pokemon" width="200px" height="250px" />
                </div>
            }

            {
                <div className='divDet'>
                    <h2>Detail:</h2>
                    <p>Type: {detailPoke.types?.map(t => t.name + " ")}</p>
                    <p>Attack: {detailPoke.attack}</p>
                    <p>Defense: {detailPoke.defense}</p>
                    <p>Speed: {detailPoke.speed}</p>
                    <p>Heigth: {detailPoke.height}</p>
                    <p>Weight: {detailPoke.weight}</p>
                </div>

            }
            <div className='divBoton'>
                <Link to="/home"> HOME </Link>
            </div>
        </div>
    );
};