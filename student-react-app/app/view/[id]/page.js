"use client";
import { useEffect, useState } from "react";

export default function StudentDetails({ params }) {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/students/${params.id}`)
      .then(res => res.json())
      .then(data => setStudent(data));
  }, []);

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl mb-4">{student.name}'s Profile</h2>
      <p><strong>Father Name:</strong> {student.fatherName}</p>
      <p><strong>Domain Mail:</strong> {student.domainMail}</p>
      <p><strong>Personal Mail:</strong> {student.personalMail}</p>
      <p><strong>Department:</strong> {student.department}</p>
      <p><strong>Roll No:</strong> {student.rollNo}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      {student.photo && <img src={student.photo} alt="Student" className="w-40 mt-2" />}
    </div>
  );
}
