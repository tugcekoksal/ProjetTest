import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess, authError } from '@/reducers/usersReducer';

function Signup({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      dispatch(authError("Passwords do not match"));
      setErrors({ password: "Passwords do not match" });
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        username,
        password
      });

      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      dispatch(loginSuccess({ accessToken: access, refreshToken: refresh ,username:username}));

    } catch (error) {
      if (error.response) {
        setErrors({
          username: error.response.data.username?.join(" "), 
          password: error.response.data.password?.join(" ")
        });
        dispatch(authError(error.response.data.detail || "Failed to sign up"));
        console.log(error.response.data);
      } else {
        dispatch(authError("Network error or server is down"));
      }
    }
  };

  return (
    <div className="flex flex-col mx-auto my-20 max-w-lg">
      <div style={{ display: "none" }}>
        <input type="text" autoComplete="username" />
        <input type="password" autoComplete="new-password" />
      </div>
      <form onSubmit={handleSignup} className="space-y-6"     autoComplete='off'>
        <label className="block">
          <span className="text-gray-700">Username:</span>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoComplete="new-username"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
                    {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}

        </label>
        <label className="block">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}

        </label>
        <label className="block">
          <span className="text-gray-700">Confirm Password:</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dark-slate hover:bg-[#597a7b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#597a7b]">
          Sign Up
        </button>
        <button onClick={onSwitchToLogin} className="w-full mt-4 text-center text-sm text-blue-500 hover:text-blue-700">
          Already have an account? Log in
        </button>
      </form>
    </div>
  );
}

export default Signup;
