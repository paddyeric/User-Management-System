import React from 'react';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>User Management System</h1>
        <AddUser />
        <UserList />
      </div>
    </div>
  );
}

export default App;