import React from "react";
import { Route, Switch } from "react-router";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateForm from './components/CreateForm/CreateForm';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import './App.css'

export default function App() {

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'><LandingPage/></Route>
        <Route path='/home'><Home/></Route>
        <Route exact path='/create'> <CreateForm/></Route>
        <Route path='/:id' render={({match}) => <PokemonDetail id={match.params.id}/>}/>
      </Switch>
    </div>
  )
};