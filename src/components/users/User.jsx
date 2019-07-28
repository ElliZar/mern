import React, { Component, Fragment } from 'react';
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Repos from "../repos/Repos";

export default class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  };

  render() {
    const {
      name, 
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      company} = this.props.user;


      const {loading, repos} = this.props;
      if (loading) return <Spinner/>;

    return (
      <Fragment>
        <Link to="/" className="btn btn-light">Back to search</Link>
        Hireable: {" "}
        {hireable ? <i className="fas fa-check text-success"/> : <i className="fas fa-times-circle text-danger"/>};
        <div className="card grid-2">
          <div className="all-center">
            <img src={avatar_url} className="round-img" alt="" style = {{width: "150px"}}/>
            <h1 className="my-1">{name ? name : login}</h1>
            <p>Location: {location ? location : "No information about location"}</p>
          </div>
          <div>
            {bio ? <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment> : <p>This user has no biography on GitHub</p>}
            <a href={html_url} className="btn btn-dark my-1">Visit GitHub Profile</a>
            <ul>
              <li>
                {login && <Fragment><strong>Username: {login}</strong></Fragment>}
              </li>
              <li>
                {company ? <Fragment><strong>Company: {company}</strong></Fragment> : <Fragment><strong>I don't have information about the user's company</strong></Fragment>}
              </li>
              <li>
                {blog ? <Fragment><a href={blog}>Website: {blog}</a></Fragment> : <Fragment><strong>Blog is missing</strong></Fragment>}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gist: {public_gists}</div>
        </div>
        <Repos repos={repos}/>
      </Fragment>
    )
  }
}

