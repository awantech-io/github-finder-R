import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Search from './components/users/Search';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    users:[],
    loading: false
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

  // clear user from state when submit clear button
  clearUsers = () => this.setState({ users:[], loading:false});

  render(){
    const { users, loading } = this.state;
    return (
      <div>
        <Navbar />
        <div className='container'>
        <Search searchUsers={this.searchUsers} 
        clearUsers={this.clearUsers} 
        showClear={users.length > 0 ? true : false}
        />
        <User loading={loading} users={users} />
        </div>
        
      </div>
      );
  }
  
}

export default App;
