'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(res => setStudents(res.data.slice(0, 5)));
  }, []);

  return (
    <div>
      <h1>Recently Added Students</h1>
      <ul>
        {students.map(s => (
          <li key={s._id}>
            {s.name} ({s.rollNo})
          </li>
        ))}
      </ul>
    </div>
  );
}
