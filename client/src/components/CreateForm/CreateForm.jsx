import React, { useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getTypes, sendData } from "../../actions/index";
import { createJson, fromAtoZ, newPokemon, nums, attributes, cleanCheckbox, validURL } from "../../helpers/index";
import NavBar from "../NavBar/NavBar";
import "./CreateForm.css";

export default function CreateForm () {

    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getTypes())
    }, [dispatch]);
    
    const totalNames = useSelector((state) => state.pokemons.map(e => e.name));
    const types = useSelector((state) => state.types)
    const createdOK = useSelector((state) => state.pokemonCreated.result)
    const id = useSelector((state) => state.pokemonCreated.id)

    const [input, setInput] = useState(newPokemon);
    const [_types, setTypes] = useState([]);
    const [error, setError] = useState('');
    const [errortype, setErrortype] = useState('');
    const [errorurl, setErrorurl] = useState('');
    const [available, setAvailable] = useState('');


    function validateName(e) {
        if(!/^[A-Za-z0-9_-]*$/.test(e)) {
            setError('Only alphanumeric characters, no specials or spaces')
        } else if(e.length < 4){
            setError('Minimum 4 characters')
        } else if(e.length > 12){
            setError('Maximum 12 characters')
        } else if (totalNames.includes(e)){
            setError('The name is not available')
        } else {
            setError('')
            setAvailable('Name available')
        }
        setInput({...input, name: e})
    };

    function validateUrl(e) {
        if(!validURL.test(e)) {setErrorurl('Enter a valid image URL')}
        else {setErrorurl('')}
        setInput({...input, img: e})
    }

    function inputChange (e) {
        setInput({...input, [e.target.name]: parseInt(e.target.value)});
    };

    function selectType(e) {
        setErrortype('');
        let valueNum = parseInt(e);

        _types.includes(valueNum) ?
        setTypes(_types.filter(e => e !== valueNum))
        :
        setTypes([..._types, valueNum])
    };

    function onSubmit (e) {
        e.preventDefault()
        if(error || errorurl) return alert('Please fix the form');
        if(_types.length === 0) return setErrortype('You must choose a type');
        dispatch(sendData(createJson(input, _types)));
        setInput(newPokemon)
        setAvailable('')
        cleanCheckbox();
    };

    return (
        <div>
            <NavBar />
        <div className='background'>
            <h1>Create your own Pokemon!</h1>
            <div className='formContainer' >
            <form className='form' onSubmit={onSubmit} name='create_form'>
                    <label>Name</label>
                    <input
                        className='formInput'
                        name='name'
                        type='text'
                        placeholder='Enter name...'
                        autoComplete='off'
                        value={input.name}
                        onChange={e => validateName(e.target.value)}
                        required />
                    {error ? <span id='danger'>{error}</span> :
                    available ? <span id='created'>{available}</span> : null}
                    <div id='attributes'> 
                    {
                        attributes.map(e =>(
                            <div className='statsInputs' key={e}>
                                <label>{e}</label>
                                <input name={e.toLowerCase()} 
                                        type='number'
                                        key={e}
                                        id={e}
                                        onChange={e=>inputChange(e)}>
                                </input>
                            </div>
                            
                        ))
                    }
                    </div>

                    <label>Image (optional) </label>
                    <input
                        className='formInput'
                        name='img'
                        type='url'
                        placeholder='Enter image link...'
                        autoComplete='off'
                        value={input.img}
                        onChange={e => validateUrl(e.target.value)} />
                    {errorurl ? <span id='danger'>{errorurl}</span> : null}

                    <div id='container_types'>
                        <b>Select type/s</b>
                        <div id='types'>
                        {
                            types.map(e => (
                                <div key={e.id} 
                                    id='form_unit'>
                                    <input
                                    className='typeCheckbox'
                                    type="checkbox"
                                    value={e.id}
                                    onClick={e => selectType(e.target.value)}
                                    />
                                    <span id='names'>{e.name}</span>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    {errortype ? <span id='danger'>{errortype}</span>:null}
                    {
                        createdOK ? null :
                        <button 
                        className='btn'
                        type='submit'
                        >Create!</button>
                    }
            </form>
            {
                createdOK ? 
                <>
                    <span id='created'>Pokemon created! </span>
                    <Link to={`/${id}`}>
                    <button
                    className='btn'
                    >See it!</button>
                    </Link>
                </>
                : null
            }
            </div>
    </div>
    </div>
    )
};