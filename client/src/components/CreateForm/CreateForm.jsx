import React from "react";
import Nav from '../NavBar/NavBar';
import './CreateForm.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTypes, postPokemon } from "../../actions/index";
import { useHistory } from "react-router";

export default function Detail() {

    const history = useHistory();
    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.pokemonsTypes);
    const [errors, setErrors] = useState({
        name: '!',
        types: '!',
        image: '!',
        life: '!',
        attack: '!',
        defense: '!',
        speed: '!',
        height: '!',
        weight: '!'
    });

    console.log(allTypes);
    const [input, setInput] = React.useState({
        name: '',
        types: [],
        image: '',
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0
    });

    function handleOnChange(e) {
        e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        let id = e.target.id;


        if (name === 'types' && id === '0') {
            value = [...input.types, value];
            console.log(value);
            value = [e.target.value, value[1]]
            setInput({
                ...input,
                [name]: value
            })
        }
        if (name === 'types' && id === '1') {
            value = [...input.types, value];
            console.log(value);
            value = [value[0], e.target.value]
            setInput({
                ...input,
                [name]: value
            })
        }
        setInput({
            ...input,
            [name]: value
        })

        switch (name) {
            case 'name':
                value.length < 1 ? setErrors({ ...errors, [name]: 'A name is required!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'image':
                value.slice(0, 4) !== 'http' ? setErrors({ ...errors, [name]: 'A valid url is required!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'types':
                input.Tipos.length !== 2 ? setErrors({ ...errors, [name]: 'Both types are required!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'life':
                value < 1 ? setErrors({ ...errors, [name]: 'HP must be higher than 0!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'attack':
                value < 1 ? setErrors({ ...errors, [name]: 'Force must be higher than 0!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'defense':
                value < 1 ? setErrors({ ...errors, [name]: 'Defense must be higher than 0!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'speed':
                value < 1 ? setErrors({ ...errors, [name]: 'Speed must be higher than 0!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'height':
                value < 1 ? setErrors({ ...errors, [name]: 'Height must be higher than 0!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'weight':
                value < 1 ? setErrors({ ...errors, [name]: 'Weight must be higher than 0!' }) : setErrors({ ...errors, [name]: '' });
                break;
            default:
                break;
        }
    };

    console.log(input);
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(input));
        alert("Pokemon succesfully created");
        history.push('/home');
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    let type1;
    if (input.types[0]) {
        type1 = allTypes.find(t => t.id == input.types[0]).name
    }
    let type2;
    if (input.types[1]) {
        type2 = allTypes.find(t => t.id == input.types[1]).name
    }
    let bothTypes;
    if (type1 && type2) {
        bothTypes = type1[0].toUpperCase() + type1.slice(1) + " " + type2[0].toUpperCase() + type2.slice(1);
    }
    console.log(type1, type2);
    return (
        <div id='mainCreate' className='mainCreate'>
            <Nav />
            <div className='FormDiv'>
                <h1>Create your own Pokemon!</h1>
                <div className='formPrincipal'>
                    <form className='Form'>
                        <div className='InputsCreate'>
                            {!errors.name ? null : <div className='ErrorCreate'>{errors.name}</div>}
                            <label className=''>Name:</label>
                            <input type="text" name="name" onChange={(e => handleOnChange(e))} value={input.name} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.types ? null : <div className='ErrorCreate'>{errors.types}</div>}
                            <label>Types:</label>
                            <div className='typeInputs'>
                                <select id='0' name="types" className='Options' onChange={(e => handleOnChange(e))}>
                                    <option value="">Fst Type</option>
                                    {
                                        allTypes && allTypes.map(t => {
                                            let typeF = t.name[0].toUpperCase() + t.name.slice(1);
                                            return (
                                                <option name="types" value={t.id}>{typeF}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select id='1' name="types" className='Options' onChange={(e => handleOnChange(e))}>
                                    <option value="">Sec Type</option>
                                    {
                                        allTypes && allTypes.map(t => {
                                            let typeF = t.name[0].toUpperCase() + t.name.slice(1);
                                            return (
                                                <option name="types" value={t.id} >{typeF}</option>
                                            )
                                        })
                                    }
                                </select>

                            </div>
                        </div>
                        <div className='InputsCreate'>
                            {!errors.image ? null : <div className='ErrorCreate'>{errors.image}</div>}
                            <label>Image:</label>
                            <input type="url" name="image" onChange={(e => handleOnChange(e))} value={input.image} placeholder='Insert a valid url' />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.life ? null : <div className='ErrorCreate'>{errors.life}</div>}
                            <label>Life:</label>
                            <input type="number" name="life" onChange={(e => handleOnChange(e))} value={input.life} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.attack ? null : <div className='ErrorCreate'>{errors.attack}</div>}
                            <label>Attack:</label>
                            <input type="number" name="attack" onChange={(e => handleOnChange(e))} value={input.attack} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.defense ? null : <div className='ErrorCreate'>{errors.defense}</div>}
                            <label>Defense:</label>
                            <input type="number" name="defense" onChange={(e => handleOnChange(e))} value={input.defense} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.speed ? null : <div className='ErrorCreate'>{errors.speed}</div>}
                            <label>Speed:</label>
                            <input type="number" name="speed" onChange={(e => handleOnChange(e))} value={input.speed} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.weight ? null : <div className='ErrorCreate'>{errors.weight}</div>}
                            <label>Weight:</label>
                            <input type="number" name="weight" onChange={(e => handleOnChange(e))} value={input.weight} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.height ? null : <div className='ErrorCreate'>{errors.height}</div>}
                            <label>Height:</label>
                            <input type="number" name="height" onChange={(e => handleOnChange(e))} value={input.height} />
                        </div>
                        <div >
                            <button className='buttonCreate' disabled={errors.name || errors.image || errors.types || errors.life || errors.attack || errors.defense || errors.speed || errors.height || errors.weight} type="submit" onClick={(e => handleSubmit(e))}>Create</button>
                        </div>
                    </form>
                    <div className='statsForm'>
                        {!input.name ?
                            <h1 className='noName'>-</h1> :
                            <h1>{input.name && input.name[0].toUpperCase() + input.name.slice(1)}</h1>
                        }
                        {!input.image ?
                            <img src="https://loadslammer.com/wp-content/uploads/2021/01/photo-placeholder-icon-17.jpg" alt="" width='300px' /> :
                            <div className='formStatsImg'>
                                <img src={input.image} alt="" width='300px' />
                            </div>
                        }
                        {!input.types[0] || !input.types[1] ?
                            <h1 className='noName'>notypes</h1> :
                            <h1>{bothTypes}</h1>
                        }

                        <h1>HP: {input.life}</h1>
                        <h1>Force: {input.attack}</h1>
                        <h1>Defense: {input.defense}</h1>
                        <h1>Speed: {input.speed}</h1>
                        <h1>Weight: {input.weight}</h1>
                        <h1>Height: {input.height}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}