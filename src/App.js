import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
//import UserItem from './components/users/UserItem';
import User from './components/users/User';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    users:[],
    loading: false
  }

  async componentDidMount(){
    // for spinner
    this.setState({ loading: true });

    const res = await axios.get('https://api.github.com/users');

    this.setState({ users: res.data, loading:false });
    
  }
  
  render(){
    return (
      <div>
        <Navbar />
        <div className='container'>
        <User loading={this.state.loading} users={this.state.users} />
        </div>
        
      </div>
      );
  }
  
}

export default App;
