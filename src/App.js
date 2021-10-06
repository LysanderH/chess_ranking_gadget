import Home from "./components/Home";
import Ranking from "./components/Ranking";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Freitag Abend</h1>
      <Router>
        <Link to="/">Home</Link>
        <Link to="/ranking">Rangliste</Link>
        <Switch>
          <Route path="/ranking">
            <Ranking />
          </Route>
          <Route strict path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
