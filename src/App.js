import React from 'react';
import { Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import About from "./components/about/AboutPage";

function App() {
  return (
    <div className="Container-fluid">
      <Route exact path="/" component={HomePage}/>
      <Route path="about" component={About}/>
    </div>
  );
}

export default App;
