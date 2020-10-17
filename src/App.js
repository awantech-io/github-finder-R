import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import User from './components/users/User';
import './App.css';
import axios from 'axios';
import Alert from './components/layout/Alert';
import GithubState from './context/github/GithubState';


const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);
  
    // Search Github users
  const searchUsers = async text => {
    setLoading(true);

    const res = await axios.get(
    `https://api.github.com/search/users?q=${text}&client_id=$
    {process.env.REACT_APP_GITHUB_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);
  };

  // get single github user
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(
    `https://api.github.com/users/${username}?client_id=$
    {process.env.REACT_APP_GITHUB_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
  }

  // get user repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
    {process.env.REACT_APP_GITHUB_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
  }

  // clear user from state when submit clear button
  const clearUsers = () => { 
    setUsers([]); 
    setLoading(false);
  }

  // set alert message 
 const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout( () => setAlert(null), 5000);
  };

    return (
      <GithubState>
      <Router>
      <div>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                  searchUsers={searchUsers} 
                  clearUsers={clearUsers} 
                  showClear={users.length > 0 ? true : false}
                  setAlert={showAlert}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />

            <Route exact path='/about' component={About} />

            <Route exact path='/user/:login' render={ props => ( 
            <User { ...props } 
            getUser={getUser} 
            user={user} 
            loading={loading} 
            getUserRepos={getUserRepos}
            repos={repos}
            />
            )}/>

          </Switch>
        
        </div>
      </div>
      </Router>
      </GithubState>
      );
  
  
}

export default App;
