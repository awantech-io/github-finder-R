import React from 'react';
import Navbar from './components/layout/Navbar';
import UserItem from './components/users/UserItem';
import User from './components/users/User';
import './App.css';

function App() {
  return (
  <div>
    <Navbar />
    <div className='container'>
    <User />
    </div>
    
  </div>
  );
}

export default App;
