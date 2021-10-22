import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import CreateForm from "./components/CreateForm/CreateForm";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";

export default function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route path= '/home' component={Home}/>
        <Route exact path= '/addpokemon' component={CreateForm}/>
        <Route exact path= '/pokemon/:id' component={PokemonDetail}/>
      </Switch>
    </div>
  )
};