import axios from 'axios'
import mockAdapter from 'axios-mock-adapter';


const api = axios.create();


const mock = new mockAdapter(api, {delayResponse: 1000});


let students = [
  {
    id:1,
    name:"Haman",
    email:"haman@gamil.com",
    course:"React.js"
  },
  {
    id:2,
    name:"Thapa",
    email:"thapa@gamil.com",
    course:"Node.js"
  }
];


mock.onPost('/students').reply(config => {
  const nweStudent = JSON.parse(config.data);

  nweStudent.id = Date.now();

  students.push(nweStudent);

  return [200, nweStudent]
})


export default api