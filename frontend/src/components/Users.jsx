import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaIdBadge } from "react-icons/fa";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/auth/users/get`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full h-full md:px-8 sm:px-6 px-3 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">User List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-center mb-4">
              <FaUser className="text-indigo-600 text-2xl mr-3" />
              <h2 className="text-lg font-semibold">{user.username}</h2>
            </div>
            <div className="flex items-center mb-2">
              <FaIdBadge className="text-blue-500 text-xl mr-3" />
              <p className="text-gray-700">ID: {user._id}</p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-green-500 text-xl mr-3" />
              <p className="text-gray-700">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
