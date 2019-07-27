import React, {Fragment, Component} from 'react';
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";

export default class App extends Component {
  state = {
    users: [],
    loading: false
  };
  async componentDidMount() {
    this.setState({loading: true});

    const res = await axios.get("https://api.github.com/users");
    this.setState({users: res.data, loading: false});
  }
  render() {
    const {users, loading} = this.state;
    return (
      <div className="App">
        <Navbar />
        <Users loading={loading} users={users}/>
      </div>
    );
  }
}


