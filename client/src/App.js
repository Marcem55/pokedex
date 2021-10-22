// import './App.css';
import { Route, Switch, Redirect } from 'react-router';
import { Landing } from './pages/Landing/Landing';
import { Home } from './pages/Home/Home';
import { PokemonDetail } from './pages/PokemonDetail/PokemonDetail';
import { Form } from './pages/Form/Form';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = "/" component={Landing}/>
        <Route exact path = "/landing" component={Landing}/>
        <Route exact path = "/home" component={Home}/>
        <Route exact path = "/detail/:id" component={PokemonDetail}/>
        <Route exact path = "/create" component={Form}/>
        <Route exact path = "/notFound" component={NotFound}/>
        <Redirect from='*' to='/notFound'/>
      </Switch>
    </div>
  );
}