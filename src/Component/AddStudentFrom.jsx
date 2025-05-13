import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';

const AddStudent = () => {
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  // Load form data from localStorage if it exists
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Function to fetch students
  const fetchStudents = () => {
    if (user) {
      api.get('/students')
        .then(res => setStudents(res.data))
        .catch(err => console.error('Error fetching students:', err));
    }
  };

  // Fetch students when component mounts or user changes
  useEffect(() => {
    fetchStudents();
  }, [user]);

  // Save form data to localStorage
  useEffect(() => {
    if (formData.name || formData.email || formData.course) {
      localStorage.setItem('formData', JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to add a student!");
      return;
    }

    try {
      // Add student via API
      await api.post('/students', formData);
      alert("Student added!");
      setFormData({ name: "", email: "", course: "" });
      localStorage.removeItem('formData');
      // Clear localStorage on successful submit

      // Refresh the student list
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
      alert("Failed to add student. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete student from API
      await api.delete(`/students/${id}`);
      // Refresh the student list instead of filtering locally
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      alert("Failed to delete student. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return (
    <div className="p-4 text-center">
      <p className="text-red-500">You must be logged in to access this page.</p>
      <button
        onClick={() => navigate('/login')}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to Login
      </button>
    </div>
  );

  return (
    <div>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Add New Student</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-2">
        <input
          name="name"
          required
          onChange={handleChange}
          value={formData.name}
          placeholder="Name"
          className="border p-2 w-full"
        />
        <input
          name="email"
          type="email"
          required
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <select
          name="course"
          onChange={handleChange}
          value={formData.course}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Course</option>
          <option value="Node.js">Node.js</option>
          <option value="Vue.js">Vue.js</option>
          <option value="Angular">Angular</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="Django">Django</option>
          <option value="Flask">Flask</option>
          <option value="MongoDB">MongoDB</option>
          <option value="Express.js">Express.js</option>
        </select>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1">
            Add Student
          </button>
        </div>
      </form>

      <div className="mt-10">
        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map(student => (
              <div key={student.id} className="bg-white shadow-md border rounded-xl p-4">
                <p className="text-lg font-semibold">Name: <span>{student.name}</span></p>
                <p>Email: <span className="text-gray-700">{student.email}</span></p>
                <p>Course: <span className="text-indigo-600 font-medium">{student.course}</span></p>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
