import { useEffect, useState } from 'react';
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const response = await axios.post('/api/users/signup', {email, password});
    console.log(response.data);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="text" id="email" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" className="form-control" />
        </div>
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}