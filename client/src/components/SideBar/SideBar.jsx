import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterPokemonsByOrigin, getTypes, setPage, filterPokemonsByType } from '../../actions/index';
import './Sidebar.css';

export default function Sidebar() {
    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.pokemonsTypes);

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    function handleFilterTypes(e) {
        //reset pages!!!!
        dispatch(setPage(1));
        dispatch(filterPokemonsByType(e.target.value));
    }

    function handleFilterOrigin(e) {
        dispatch(setPage(1));
        dispatch(filterPokemonsByOrigin(e.target.value));
    }

    return (
        <div className='SidebarDiv'>
            <div>
                {
                    allTypes && allTypes.map(t => {
                        let typeF = t.name[0].toUpperCase() + t.name.slice(1);
                        return (
                            <div className='Filter'>
                                <div>
                                    <button id={typeF} name="filters" value={t.name} className='ButtonFilterTypes' onClick={e => handleFilterTypes(e)} />
                                </div>
                                <label  id={typeF.toLowerCase()} for={typeF} className='Label'>{typeF}</label>
                            </div>
                        )
                    })
                }
                <div className='Filter2'>
                    <div className='line'>_________________________________</div>
                    <div className='OriginalsNCreated'>
                        <div >
                            <button id='all' name="filters" value='all' onClick={e => handleFilterTypes(e)} className='ButtonFilterOther' />
                        </div>
                        <label for='all' className='Label'>All</label>
                    </div>
                    <div className='OriginalsNCreated'>
                        <div >
                            <button id='originals' name="filters" value='types' className='ButtonFilterOther' onClick={e => handleFilterOrigin(e)} />
                        </div>
                        <label for='originals' className='Label'>Originals</label>
                    </div>
                    <div className='OriginalsNCreated' id='CreatedDiv'>
                        <div >
                            <button id='created' name="filters" value='tipos' className='ButtonFilterOther' onClick={e => handleFilterOrigin(e)} />
                        </div>
                        <label for='created' className='Label' >Created</label>
                    </div>
                </div>
            </div>
        </div>
    )
};