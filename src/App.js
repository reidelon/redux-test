import React from 'react';
import { Route, Switch} from "react-router-dom";
import HomePage from "./components/home/HomePage";
import About from "./components/about/AboutPage";
import Header from "./components/common/Header";
import CoursesPage from "./components/courses/CoursesPage";
import PageNotFound from "./components/PageNotFound";
import ManageCoursePage from "./components/courses/ManageCoursePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container"> 
      <Header/>
      <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/courses/:category" component={CoursesPage}/>
          <Route path="/courses" component={CoursesPage}/>
          <Route path="/about" component={About}/>
          <Route path="/course/:slug" component={ManageCoursePage}/>
          <Route path="/course" component={ManageCoursePage}/>
          <Route component={PageNotFound}/>
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar/>
    </div>
  );
}

export default App;
