import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { success, error } = await signIn(formData.email, formData.password);

      if (success) {
        alert("Logged in successfully");
        navigate('/');
      } else {
        alert("Error: " + (error || "Failed to login"));
        console.error("Login error:", error);
      }
    } catch (err) {
      alert("Unexpected error: " + err.message);
      console.error("Unexpected login error:", err);
    }
  };

  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit} className='space-y-2 mb-4'>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleLogin}
          className='border p-2 rounded-2xl w-full'
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleLogin}
          className='border p-2 rounded-2xl w-full'
          placeholder="Password"
          required
        />
        <button
          className='bg-green-500 px-4 py-2 text-white rounded-2xl w-full'
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
