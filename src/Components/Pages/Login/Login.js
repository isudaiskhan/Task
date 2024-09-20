import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (authToken) {
      navigate('/profile');
    }
  }, [authToken, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'password') {
      localStorage.setItem('authToken', 'your-token-here');

      Swal.fire({
        title: 'Login Successfully!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate('/profile');
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid email or password',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  if (authToken) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
