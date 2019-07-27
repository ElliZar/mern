import React, {Component,Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from './components/users/Search';
import Alert from "./components/layout/Alert";
import About from './components/Pages/About';
import "./App.css";

export default class App extends Component {
  state = {
    users: [],
    loading: false,
    clearBtn: false,
    alert: null
  };
  componentDidMount() {
    this.setState({loading: true});
    this.getUsers();
    // this.interval = setInterval(this.getUsers, 1500);
  };
  
  getUsers = async () =>  {
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data, loading: false});
  };

  // Search GitHub Users
  searchUsers = async  (label) => {
    const res = await axios.get(`https://api.github.com/search/users?q=${label}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data.items, loading: false, clearBtn: true});
    clearInterval(this.interval);
  };

  clearUsers = () => {
    this.setState({loading: true, clearBtn: false});
    this.getUsers();
    // this.interval = setInterval(this.getUsers, 1500);
  }

  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => this.setState({alert: null}), 2000);
  }
  render() {
    const {users, loading, clearBtn} = this.state;
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
              <Route exatc path="/about" component={About}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  };
}




