import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";

const User = ({ match}) => {
  const githubContext = useContext(GithubContext);
  const {getUser, loading, user, getUserRepos, repos} = githubContext;
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);


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
    company} = user;

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
};
export default User;

