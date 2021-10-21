// import './App.css';
import { Route, Switch, Redirect } from 'react-router';
import Navbar from './components/NavBar/NavBar';
import Landing from './pages/Landing/Landing';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = "/" component={Landing}/>
        <Route exact path = "/landing" component={Landing}/>
        <Route exact path = "/home" component={Home}/>
        <Route exact path = "/detail/:id" component={PokemonDetail}/>
        <Route exact path = "/create" component={PokemonCreate}/>
        <Route exact path = "/notFound" component={NotFound}/>
        <Redirect from='*' to='/notFound'/>
      </Switch>
      
    </div>
  );
}