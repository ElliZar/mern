import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Search extends Component {
  state = {
    label: ""
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    clearBtn: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label === "") {
      this.props.setAlert("Please, enter something", "light")
    } else {
      this.props.searchUsers(this.state.label);
      this.setState({label: ""});
    }
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const {clearBtn, clearUsers} = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input type="text"
          name="label"
          placeholder="Search users"
          value={this.state.label}
          onChange={this.onChange}/>
          <input type="submit" value="Search" className="btn btn-dark btn-block"/>
        </form>
        {clearBtn &&  <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
      </div>
    )
  }
}
