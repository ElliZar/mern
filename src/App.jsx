import React, {Component,Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from './components/users/Search';
import Alert from "./components/layout/Alert";
import About from './components/Pages/About';
import "./App.css";
import User from './components/users/User';

export default class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    clearBtn: false,
    alert: null,
  };
  componentDidMount() {
    this.setState({loading: true});
    this.getUsers();
  };
  
  getUsers = async () =>  {
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data, loading: false});
  };

  // Get a single Github User
  getUser = async (username) => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({user: res.data, loading: false,});
  }

  // Search GitHub Users
  searchUsers = async  (label) => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${label}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data.items, loading: false, clearBtn: true});
  };

  getUserRepos = async (username) => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=creaated:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({repos: res.data, loading: false,});
  }

  clearUsers = () => {
    this.setState({loading: true, clearBtn: false});
    this.getUsers();
  }

  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => this.setState({alert: null}), 2000);
  }

  render() {
    const {users, loading, user, clearBtn, repos} = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert}/>
            <Switch>
              <Route exact path = "/" render={props => 
                <Fragment>
                  <Search 
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    clearBtn={clearBtn}
                    setAlert={this.setAlert}/>
                  <Users loading={loading} users={users}/>
                </Fragment>
              }/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/user/:login" render={props => (
                  <User {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    repos={repos}
                    user={user}
                    loading = {loading}/>
              )}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  };
}




