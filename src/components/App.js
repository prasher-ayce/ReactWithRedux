import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Aboutpage from "./about/Aboutpage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header></Header>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/about" component={Aboutpage}></Route>
          <Route path="/courses" component={CoursesPage}></Route>
          <Route path="/course/:slug" component={ManageCoursePage}></Route>
          <Route path="/course" component={ManageCoursePage}></Route>
          <Route component={PageNotFound}></Route>
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
    );
  }
}
