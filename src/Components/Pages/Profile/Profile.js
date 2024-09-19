import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../../Navbar/Navbar';

function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    Swal.fire({
      title: 'Logged out!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate('/login');
    });
  };

  return (
    <>
      <Navbar />
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Profile</h2>
        <div className="text-center mb-6">
          <p className="text-lg font-medium text-gray-700">Welcome to your profile!</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
    </>
  );
}

export default Profile;
