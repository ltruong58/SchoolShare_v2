import React, { Component } from 'react';
//import './App.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import OAuth from "./components/auth/OAuth";
import PrivateRoute from "./components/private-route/PrivateRoute";
import ChatDetail from "./components/ChatDetail";
import Dashboard from "./components/dashboard/Dashboard";

import axios from 'axios';

// import io from 'socket.io-client'
// const keys = require("../package.json");
// const socket=io("https://localhost:5050")
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        chatLists: []
    };
  }
  componentDidMount() {
    axios.get(`/chats/list`)
        .then(res => {
            const chatLists = res.data;
            this.setState({ chatLists });
        });
  }
  sendChatId(i) {
      return <ChatDetail chatId={i} />;
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Dashboard/>
            <hr/>
            <h3>Chat Room List</h3>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/oauth" component={OAuth} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <ListGroup>
                  { this.state.chatLists.map(chatList =>
                      <ListGroupItem tag="a" key={chatList._id}>
                          <Link to={`/chatDetail`}>
                              {chatList.roomTitle}
                              {this.sendChatId(chatList._id)}
                          </Link>
                          <Route path={`/chatDetail`} component={ChatDetail}/>
                    </ListGroupItem>
                  )}
                </ListGroup>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
