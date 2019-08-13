import React, {useContext, useEffect, Fragment} from 'react'
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from "../../context/github/githubContext";
const Users = () => {
  const githubContext = useContext(GithubContext);
  const {getUsers, loading, users} = githubContext;

  useEffect(() => {
    getUsers();
    return () => console.log("clean")
  }, []);

  if (loading) {
    return <Spinner/>
  } else {
    return (
      <Fragment>
        <div style={userStyle}>
          {users.map((user)=>{
            return <UserItem key={user.id} user={user}/>
          })}
        </div>
      </Fragment>
    )
  }
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem" 
};

export default Users
