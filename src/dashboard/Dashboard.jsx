import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from '../services/authService';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [courseFilter, setCourseFilter] = useState('');

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  // Custom logout function
  const handleLogout = async () => {
    try {
      const { success, error } = await signOut();

      if (success) {
        // Navigate to login page
        navigate('/login');
      } else {
        console.error("Error signing out:", error);
        alert("Failed to log out: " + error);
      }
    } catch (error) {
      console.error("Unexpected error signing out:", error);
      alert("Failed to log out. Please try again.");
    }
  };
  // Function to fetch students
  const fetchStudents = () => {
    api.get('/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Error fetching students:', err));
  };

  // Fetch students when component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  // Add event listener to refresh data when window gains focus
  useEffect(() => {
    const handleFocus = () => {
      fetchStudents();
    };

    window.addEventListener('focus', handleFocus);

    // Clean up event listener
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Filter students by course
  const filtered = courseFilter
    ? students.filter(std => std.course === courseFilter)
    : students;

  return (
    <div className='p-4'>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className='border p-2 rounded-md w-full md:w-64'
        >
          <option value="">All Courses</option>
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

        <button className='bg-green-900 px-6 py-2 rounded-2xl text-white hover:bg-green-950' onClick={() => navigate("/add-student")}>Add Student</button>

        {
          user ? (
            <button
              className='bg-red-600 px-6 py-2 rounded-xl text-white hover:bg-red-700 transition'
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : <button className='bg-blue-700 px-6 py-2 rounded-xl text-white hover:bg-blue-800 transition' onClick={() => navigate('/login')}>
            Login
          </button>

        }

      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No students found for the selected course.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {filtered.map((stu) => (
            <div
              className="bg-white shadow-md border rounded-xl p-4 transition hover:shadow-lg cursor-pointer"
              key={stu.id}
              onClick={() => navigate(`/student/${stu.id}`)}
            >
              <p className="text-lg font-semibold">Name: <span className='font-normal'>{stu.name}</span></p>
              <p>Email: <span className='text-gray-700'>{stu.email}</span></p>
              <p>Course: <span className='text-indigo-600 font-medium'>{stu.course}</span></p>
              <div className="mt-2 text-blue-500 text-sm">Click for details</div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default Dashboard;
