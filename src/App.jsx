import { useState } from 'react'
import './App.css'

function App() {
  const [filter, setFilter] = useState("")

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className='text-xl font-bold mb-4'>Student Dashboard</h1>
      {/* login */}
      <select onChange={(e) => setFilter(e.target.value)} className='mb-4'>
        <option>All Courses</option>
        <option value="">React</option>
        <option value="">Node.js</option>

      </select>
    </div>
  )
}

export default App
