import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";

export default function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route exact path= '/home' component={Home}/>
      </Switch>
    </div>
  )
};