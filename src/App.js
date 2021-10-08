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
    <div className="App">
      <h1>Freitag Abend</h1>
      <Router>
        <div className="links">
          <Link to="/">Ergebnisse</Link>
          <Link to="/ranking">Rangliste</Link>
        </div>
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
