import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { auth } from "./firebase";

const api = axios.create();
const mock = new MockAdapter(api, { delayResponse: 1000 });

// Initialize students from localStorage or use default data
const getInitialStudents = () => {
  const savedStudents = localStorage.getItem('students');
  if (savedStudents) {
    try {
      return JSON.parse(savedStudents);
    } catch (e) {
      console.error('Error parsing students from localStorage:', e);
    }
  }
  return [
    { id: 1, name: "Alice", email: "alice@example.com", course: "React" },
    { id: 2, name: "Bob", email: "bob@example.com", course: "Node.js" },
  ];
};

// Function to save students to localStorage
const saveStudentsToStorage = (students) => {
  localStorage.setItem('students', JSON.stringify(students));
};

// Get initial students
const students = getInitialStudents();

// Mock the GET request to /students
mock.onGet("/students").reply(() => {
  // Always return the latest data from our students array
  return [200, students];
});

// Mock POST request to add a student
mock.onPost("/students").reply(config => {
  const user = auth.currentUser;
  if(!user) {
    return [401, {message:"Unauthorized"}];
  }

  const newStudent = JSON.parse(config.data);
  newStudent.id = Date.now();
  students.push(newStudent);

  // Save to localStorage
  saveStudentsToStorage(students);

  return [200, newStudent];
});

// Mock DELETE request to delete a student
mock.onDelete(/\/students\/\d+/).reply(config => {
  const user = auth.currentUser;
  if(!user) {
    return [401, {message:"Unauthorized"}];
  }

  const id = parseInt(config.url.split('/').pop());
  const index = students.findIndex(student => student.id === id);

  if (index === -1) {
    return [404, { message: "Student not found" }];
  }

  students.splice(index, 1);

  // Save to localStorage
  saveStudentsToStorage(students);

  return [200, { message: "Student deleted successfully" }];
});

export default api;
