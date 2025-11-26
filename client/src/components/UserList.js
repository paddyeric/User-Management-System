import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiServices';

const UserList = () => {
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users. Please try again.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await apiService.deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
      console.error('Error deleting user:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>Users List</h2>
      {users.length === 0 ? (
        <p>No users found. Add some users to get started.</p>
      ) : (
        <div className="users-container">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <div className="user-name">{user.name}</div>
              <div className="user-title">{user.title}</div>
              <button 
                onClick={() => handleDeleteUser(user._id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;