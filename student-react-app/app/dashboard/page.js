'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // ✅ to hold clicked student

  useEffect(() => {
    axios.get('http://localhost:5000/api/students/recent')
      .then(res => setStudents(res.data))
      .catch(err => console.error("❌ Error fetching students:", err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
        🎓 Recently Added Students
      </h1>
      <div className="dashboard-grid">
  <div className="card">📊 Total Students: 50</div>
  <div className="card">🎓 CSE Students: 20</div>
</div>

      {/* ✅ Student Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {students.map(student => (
          <div
            key={student._id}
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {/* ✅ Student Photo */}
            <img
              src={student.photo || '/default-avatar.png'}
              alt={student.name}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '50%',
                marginBottom: '10px'
              }}
            />

            {/* ✅ Student Info */}
            <h3 style={{ fontSize: '1.2rem', margin: '5px 0' }}>{student.name}</h3>
            <p style={{ margin: '2px 0', color: '#555' }}>📘 {student.department}</p>
            <p style={{ margin: '2px 0', fontWeight: 'bold' }}>🎟 Roll No: {student.rollNumber}</p>

            {/* ✅ View Button */}
            <button
              onClick={() => setSelectedStudent(student)} // 🔥 Open modal with this student’s info
              style={{
                marginTop: '10px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>

      {/* ✅ MODAL (only visible when selectedStudent is set) */}
      {selectedStudent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onClick={() => setSelectedStudent(null)} // close modal if background is clicked
        >
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '12px',
              width: '400px',
              textAlign: 'center',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()} // ✅ prevent closing when clicking inside the modal
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                border: 'none',
                background: 'transparent',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ❌
            </button>

            {/* Student Info in Modal */}
            <img
              src={selectedStudent.photo || '/default-avatar.png'}
              alt={selectedStudent.name}
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '50%',
                marginBottom: '10px'
              }}
            />
            <h2>{selectedStudent.name}</h2>
            <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
            <p><strong>Department:</strong> {selectedStudent.department}</p>
            {selectedStudent.fatherName && <p><strong>Father’s Name:</strong> {selectedStudent.fatherName}</p>}
            {selectedStudent.domainMail && <p><strong>Domain Mail:</strong> {selectedStudent.domainMail}</p>}
            {selectedStudent.personalMail && <p><strong>Personal Mail:</strong> {selectedStudent.personalMail}</p>}
            {selectedStudent.phone && <p><strong>Phone:</strong> {selectedStudent.phone}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
