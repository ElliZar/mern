import React, { useState, useContext } from 'react';
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";
const Search = () => {
  const [label, setLabel] = useState("");
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const onSubmit = (e) => {
    e.preventDefault();
    if (label === "") {
      alertContext.setAlert("Please, enter something", "light")
    } else {
      githubContext.searchUsers(label);
      setLabel("");
    }
  };
  const onChange = (e) => {
    setLabel(e.target.value);
  };
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input type="text"
        name="label"
        placeholder="Search users"
        value={label}
        onChange={onChange}/>
        <input type="submit" value="Search" className="btn btn-dark btn-block"/>
      </form>
      {githubContext.users.length > 0 &&  <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}
    </div>
  )
};

export default Search;