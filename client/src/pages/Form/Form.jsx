import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar } from '../components/NavBar/NavBar';
import { addPokemon, getPokemonsTypes } from '../../actions';
import './Form.css';
import swal from 'sweetalert';

export const PokemonCreate = () => {
    const dispatch = useDispatch();
    const pokemonTypes = useSelector(state => state.pokemonsTypes);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        life: '',
        attack: '',
        defense: '',
        speed: '',
        weight: '',
        height: '',
        type1: '',
        type2: '',
    });

    useEffect(() => {
        dispatch(getPokemonsTypes())
    }, [dispatch])

    const handleOnChange = e => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if([e.target.name] === 'name') {
            !e.target.value ? setErrors(errors.name = 'This field is required') : {...input, [e.target.name]: e.target.value};
        }
        if([e.target.name] === 'life') {
            !e.target.value ? setErrors(errors.life = 'This field is required and less than 255') : {...input, [e.target.name]: e.target.value};
        }
        if([e.target.name] === 'attack') {
            !e.target.value ? setErrors(errors.attack = 'This field is required and less than 255') : {...input, [e.target.name]: e.target.value};
        }
        if([e.target.name] === 'defense') {
            !e.target.value ? setErrors(errors.defense = 'This field is required and less than 255') : {...input, [e.target.name]: e.target.value};
        }
        if([e.target.name] === 'speed') {
            !e.target.value ? setErrors(errors.speed = 'This field is required and less than 255') : {...input, [e.target.name]: e.target.value};
        }
        if([e.target.name] === 'height') {
            !e.target.value ? setErrors(errors.height = 'This field is required') : {...input, [e.target.name]: e.target.value};
        }
        if([e.target.name] === 'weight') {
            !e.target.value ? setErrors(errors.weight = 'This field is required') : {...input, [e.target.name]: e.target.value};
        }
    };

    const handleSubmit = e => {
        swal("Excellent!", "You created a new pokemon!", "success");
        e.preventDefault();
        dispatch(addPokemon(input));
        setInput({
            name: '',
            life: '',
            attack: '',
            defense: '',
            speed: '',
            weight: '',
            height: '',
            type1: '',
            type2: ''
        })
    }
    return (
        <div>
            <NavBar />
            <main className="form-container">
                <div className="detailCard">
                    <h2 className="title">Create your favorite Pokemon</h2>
                </div>
                <div className="pokemonData">
                    <form onSubmit={e => handleSubmit(e)} className='divCreate'>
                        <div className='divInputCreate'>
                            <input
                                type='text' name='name' onChange={handleOnChange} placeholder="Pokemon name" value={input.name} required autoComplete='off' className='inputCreate' />
                        </div>
                        {errors.name && (
                            <p className='error-input'>{errors.name}</p>
                        )}

                        <div className='divInputCreate'>
                            <input
                                type='number' name='life' onChange={handleOnChange} value={input.life} placeholder='Life' min="0" max="255" required className='inputCreate' />
                        </div>
                        {errors.life && (
                            <p className='error-input'>{errors.life}</p>
                        )}

                        <div className='divInputCreate'>
                            <input
                                type='number' name='attack' onChange={handleOnChange} value={input.attack} placeholder='Attack' min="0" max="255" required className='inputCreate' />
                        </div>
                        {errors.attack && (
                            <p className='error-input'>{errors.attack}</p>
                        )}

                        <div className='divInputCreate'>
                            <input
                                type='number' name='defense' onChange={handleOnChange} value={input.defense} placeholder='Defense' min="0" max="255" required className='inputCreate' />
                        </div>
                        {errors.defense && (
                            <p className='error-input'>{errors.defense}</p>
                        )}

                        <div className='divInputCreate'>
                            <input
                                type='number' name='speed' onChange={handleOnChange} value={input.speed} placeholder='Speed' min="0" max="255" required className='inputCreate' />
                        </div>
                        {errors.speed && (
                            <p className='error-input'>{errors.speed}</p>
                        )}

                        <div className='divInputCreate'>
                            <input
                                type='number' name='height' onChange={handleOnChange} value={input.height} placeholder='Height' min="0" max="255" required className='inputCreate' />
                        </div>
                        {errors.height && (
                            <p className='error-input'>{errors.height}</p>
                        )}

                        <div className='divInputCreate'>
                            <input
                                type='number' name='weight' onChange={handleOnChange} value={input.weight} placeholder='Weight' min="0" max="255" required className='inputCreate' />
                        </div>
                        {errors.weight && (
                            <p className='error-input'>{errors.weight}</p>
                        )}

                        <div className="dropdown">
                            <select name='type1' onChange={handleOnChange} className='capitalizeText'>
                                <option value="Type One">Type One</option>
                                {pokemonTypes.map(type =>
                                    <option value={type} key={type} className='capitalizeText'>{type}</option>
                                )}
                            </select>
                        </div>
                        <div className="dropdown">
                            <select name='type2' onChange={handleOnChange} className='capitalizeText'>
                                <option value="Type Two">Type Two</option>
                                {pokemonTypes.map(type =>
                                    <option value={type} key={type} className='capitalizeText'>{type}</option>
                                )}
                            </select>
                        </div>

                        <div>
                            <button type='submit' className='action-button'> Create Pokemon! </button>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    )
};