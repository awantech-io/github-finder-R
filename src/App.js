import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import User from './components/users/User';
import './App.css';
import axios from 'axios';
import Alert from './components/layout/Alert';

class App extends Component {
  state = {
    users:[],
    user:{},
    loading: false,
    alert: null,
    repos: []
  }

  // async componentDidMount(){
  //   // for spinner
  //   this.setState({ loading: true });
    
  //   const res = await axios.get(`https://api.github.com/users?client_id=$
  //   {process.env.REACT_APP_GITHUB_ID}&client_secret=$
  //   {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users: res.data, loading:false });    
  // }
  
  

  // Search Github users
  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(
    `https://api.github.com/search/users?q=${text}&client_id=$
    {process.env.REACT_APP_GITHUB_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading:false });
  };

  // get single github user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(
    `https://api.github.com/users/${username}?client_id=$
    {process.env.REACT_APP_GITHUB_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading:false });
  }

  // get user repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
    {process.env.REACT_APP_GITHUB_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading:false });
  }

  // clear user from state when submit clear button
  clearUsers = () => this.setState({ users:[], loading:false});

  // set alert message 
  setAlert = (msg, type) => {
    this.setState({ alert:{ msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 5000)
  };

  render(){
    const { users, user, loading, repos } = this.state;
    return (
      <Router>
      <div>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                  searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={users.length > 0 ? true : false}
                  setAlert={this.setAlert}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />

            <Route exact path='/about' component={About} />

            <Route exact path='/user/:login' render={ props => ( 
            <User { ...props } 
            getUser={this.getUser} 
            user={user} 
            loading={loading} 
            getUserRepos={this.getUserRepos}
            repos={repos}
            />
            )}/>

          </Switch>
        
        </div>
      </div>
      </Router>
      );
  }
  
}

export default App;
