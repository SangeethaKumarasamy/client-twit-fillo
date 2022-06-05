import React, { Component } from "react";
import { Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import store from "./store";

import Main from "./Components/Layout/Main";

import Home from "./Components/Home";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Profile from "./Components/Profile/Profile";
import NotFound from "./Components/NotFound";
import Search from "./Components/Search/NotFound";

import setAuthHeader from "./Utils/SetAuthHeader";
import { logoutUser, getCurrentUser } from "./Actions/AuthActions";

if (localStorage.getItem("jwtToken")) {
  const currentTime = Date.now() / 1000;
  const decode = jwt_decode(localStorage.getItem("jwtToken"));

  if (currentTime > decode.exp) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  } else {
    setAuthHeader(localStorage.getItem("jwtToken"));
    store.dispatch(getCurrentUser());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router>
            <Main>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route element={<NotFound />} />
              </Routes>
            </Main>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
