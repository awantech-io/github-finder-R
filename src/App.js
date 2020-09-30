import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Search from './components/users/Search';
import './App.css';
import axios from 'axios';
import Alert from './components/layout/Alert';

class App extends Component {
  state = {
    users:[],
    loading: false,
    alert: null
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

  // set alert message 
  setAlert = (msg, type) => {
    this.setState({ alert:{ msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 5000)
  };

  render(){
    const { users, loading } = this.state;
    return (
      <div>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
        <Search 
        searchUsers={this.searchUsers} 
        clearUsers={this.clearUsers} 
        showClear={users.length > 0 ? true : false}
        setAlert={this.setAlert}
        />
        <User loading={loading} users={users} />
        </div>
        
      </div>
      );
  }
  
}

export default App;
