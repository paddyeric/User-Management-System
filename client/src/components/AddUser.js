import { useState } from 'react';
import { apiService } from '../services/apiServices';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await apiService.createUser(formData);
      setFormData({ name: '', title: '' });
      setMessage('User added successfully!');
      setTimeout(() => setMessage(''), 3000);
      window.location.reload();
    } catch (error) {
      setMessage('Failed to add user. Please try again.');
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-form">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter user name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter user title"
          />
        </div>
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Adding User...' : 'Add User'}
        </button>
        {message && (
          <div style={{ 
            marginTop: '10px', 
            color: message.includes('successfully') ? '#28a745' : '#dc3545' 
          }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddUser;