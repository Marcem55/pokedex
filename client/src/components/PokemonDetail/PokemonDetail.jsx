import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonById, changePopup, resetDetail } from "../../actions/index";
import './PokemonDetail.css';

export default function PokemonDetail() {
    const dispatch = useDispatch();
    const pokeDetails = useSelector((state) => state.pokemonDetail);
    const idDetail = useSelector((state) => state.id);

    useEffect(() => {
        dispatch(resetDetail());
    }, [])

    useEffect(() => {
        dispatch(getPokemonById(idDetail));
    }, [dispatch]);

    function handleClickPopup(bool) {
        dispatch(changePopup(bool))
    }

    return (
        <div className='allDet'>
            <div className='darken'></div>
            {pokeDetails.length !== 0 ? (
                <div>
                    <div id='mainDetail' className='mainDetail'>
                        <div id='bigCard' className='bigCard'>
                            <button onClick={() => handleClickPopup(false)} className='closeBut'>X</button>
                            {
                                pokeDetails.name ?
                                    <h1 className='pokeNameDet'>{pokeDetails.name[0].toUpperCase() + pokeDetails.name.slice(1)}</h1> :
                                    <h1 className='pokeNameDet'>{pokeDetails[0].name[0].toUpperCase() + pokeDetails[0].name.slice(1)}</h1>
                            }
                            <div className='imgDetailDiv'>
                                <div className='specImg' id={pokeDetails.types ? pokeDetails.types[0].name : pokeDetails[0].types[0]}>
                                    {
                                        pokeDetails.image ?
                                            <img className='imgDetail' src={pokeDetails.image} alt="" height='263px' /> :
                                            <img className='imgDetail' src={pokeDetails[0].img} alt="" />
                                    }

                                </div>
                                <div className='detailedInfo'>
                                    {
                                        pokeDetails.types ?
                                            <h3 className='stats' id='pokeTypeDet2'>{pokeDetails.types[0].name[0].toUpperCase() + pokeDetails.types[0].name.slice(1) + " " + pokeDetails.types[1].name[0].toUpperCase() + pokeDetails.types[1].name.slice(1)}</h3> :
                                            (pokeDetails[0].types.length === 2 ? <h3 className='stats' id='pokeTypeDet2'>{pokeDetails[0].types[0][0].toUpperCase() + pokeDetails[0].types[0].slice(1) + " " + pokeDetails[0].types[1][0].toUpperCase() + pokeDetails[0].types[1].slice(1)}</h3> :
                                                <h3 className='stats' id='pokeTypeDet1'>{pokeDetails[0].types[0][0].toUpperCase() + pokeDetails[0].types[0].slice(1)}</h3>)
                                    }
                                    {
                                        pokeDetails.life ?
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails.life }}>HP:</h3> <h3 className='statHP'>{pokeDetails.life}</h3></div>
                                            :
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails[0].hp }}>HP:</h3> <h3 className='statHP'>  {pokeDetails[0].hp}</h3></div>
                                    }
                                    {
                                        pokeDetails.attack ?
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails.attack }}>FORCE:</h3> <h3 className='statForce'> {pokeDetails.attack}</h3></div>
                                            :
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails[0].force }}>FORCE:</h3> <h3 className='statForce'> {pokeDetails[0].force}</h3></div>
                                    }
                                    {
                                        pokeDetails.defense ?
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails.defense }}>DEFENSE:</h3> <h3 className='statDefense'>{pokeDetails.defense}</h3></div>
                                            :
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails[0].defense }}>DEFENSE:</h3> <h3 className='statDefense'> {pokeDetails[0].defense}</h3></div>
                                    }
                                    {
                                        pokeDetails.speed ?
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails.speed }}>SPEED: </h3> <h3 className='statSpeed'>{pokeDetails.speed} </h3></div>
                                            :
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails[0].speed }}>SPEED: </h3> <h3 className='statSpeed'>{pokeDetails[0].speed} </h3></div>
                                    }
                                    {
                                        pokeDetails.height ?
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails.height }}>HEIGHT: </h3> <h3 className='statHeight'>{pokeDetails.height} </h3></div>
                                            :
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails[0].height }}>HEIGHT: </h3> <h3 className='statHeight'>{pokeDetails[0].height} </h3></div>
                                    }
                                    {
                                        pokeDetails.weight ?
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails.weight }}>WEIGHT: </h3> <h3 className='statWeight'>{pokeDetails.weight} </h3></div>
                                            :
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails[0].weight }}>WEIGHT: </h3> <h3 className='statWeight'>{pokeDetails[0].weight} </h3></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <img src="https://media3.giphy.com/media/IQebREsGFRXmo/200.gif" alt="" />
                </div>
            )}
        </div>
    )
};