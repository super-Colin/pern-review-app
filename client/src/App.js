import logo from './logo.svg';
// import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/restuarant/:id/update" component={UpdatePage}/>
            <Route exact path="/restuarant/:id" component={RestuarantsDetailPage}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
