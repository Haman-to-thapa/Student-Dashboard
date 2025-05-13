import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    setLoading(true);
    api.get('/students')
      .then(res => {
        const found = res.data.find(s => String(s.id) === id);
        if (found) {
          setStudent(found);
        } else {
          setError("Student not found");
        }
      })
      .catch(err => {
        console.error("Error fetching student:", err);
        setError("Failed to load student details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-4 text-center">Loading student details...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!student) return <div className="p-4 text-center">Student not found</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Student Details</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <div className="mb-4 pb-4 border-b">
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg font-medium">{student.name}</p>
        </div>

        <div className="mb-4 pb-4 border-b">
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg">{student.email}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Course</p>
          <p className="text-lg font-medium text-indigo-600">{student.course}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
