import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import alumno from './views/alumno';
import alumnoAdd from './views/alumnoAdd';
import alumnoEdit from './views/alumnoEdit';

function App() {
  return (

    <div>
      <div className="container-fluid title">
        <h5>PRUEBA UNIVERSIDAD</h5>
      </div>
      <Router>
        <Route path="/alumno" exact component={alumno} />
        <Route path="/alumno/add" exact component={alumnoAdd}/>
        <Route path ="/alumno/edit" exact component={alumnoEdit} />
      </Router>
    </div>
  );
}

export default App;
