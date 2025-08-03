"use client";
import { useState } from "react";
import "./AddStudent.css";
export default function AddStudent() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    domainMail: "",
    personalMail: "",
    department: "",
    rollNumber: "",
    phone: "",
    photo: null, // store file here
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // ✅ store file object if uploaded
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Convert to FormData for file upload
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:5000/api/students/add", {
        method: "POST",
        body: data, // ✅ send FormData (no headers needed)
      });

      if (response.ok) {
        alert("✅ Student Added!");
      } else {
        alert("❌ Failed to add student");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Error adding student");
    }
  };

  return (
    <div className="add-student-container">
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>

        {/* ✅ Input fields */}
        {[
          { name: "name", label: "Name" },
          { name: "fatherName", label: "Father Name" },
          { name: "domainMail", label: "Domain Mail" },
          { name: "personalMail", label: "Personal Mail" },
          { name: "department", label: "Department" },
          { name: "rollNumber", label: "Roll Number" },
          { name: "phone", label: "Phone Number" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label>{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {/* ✅ File upload */}
        <label>Photo</label>
        <input type="file" name="photo" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
