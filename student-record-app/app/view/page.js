"use client";
import { useEffect, useState } from "react";

export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [newPhoto, setNewPhoto] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      alert("❌ Failed to fetch students!");
    }
  };

  // ✅ Delete student
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await fetch(`http://localhost:5000/api/students/${id}`, {
          method: "DELETE",
        });
        alert("✅ Student deleted successfully");
        setSelectedStudent(null);
        setStudents(students.filter((s) => s._id !== id)); // ✅ instant update
      } catch (err) {
        alert("❌ Failed to delete student");
      }
    }
  };

  // ✅ Enable edit mode
  const handleEditClick = (student) => {
    setEditMode(true);
    setEditData(student);
  };

  // ✅ Handle edit input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // ✅ Handle photo change
  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  // ✅ Save edited student
  const handleSaveEdit = async () => {
    const formData = new FormData();
    Object.keys(editData).forEach((key) => {
      formData.append(key, editData[key]);
    });

    if (newPhoto) {
      formData.append("photo", newPhoto);
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/students/${selectedStudent._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const updatedStudent = await res.json();

      alert("✅ Student updated successfully");
      setEditMode(false);
      setSelectedStudent(null);
      setNewPhoto(null);

      // ✅ Update UI instantly
      setStudents((prev) =>
        prev.map((s) => (s._id === updatedStudent._id ? updatedStudent : s))
      );
    } catch (err) {
      alert("❌ Failed to update student");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "15px" }}>
        📚 All Students
      </h2>

      {/* ✅ Student Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "15px",
        }}
      >
        {students.map((student) => (
          <div
            key={student._id}
            onClick={() => setSelectedStudent(student)}
            style={{
              cursor: "pointer",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
              background: "#fff",
              boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={student.photo || "/default-avatar.png"}
              alt="Student"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                borderRadius: "50%",
                marginBottom: "8px",
              }}
            />
            <h3 style={{ fontSize: "1rem", margin: "5px 0" }}>{student.name}</h3>
            <p style={{ fontSize: "0.85rem", color: "#555", margin: "3px 0" }}>
              🎟 {student.rollNumber}
            </p>
            <p style={{ fontSize: "0.8rem", color: "#777" }}>{student.department}</p>
          </div>
        ))}
      </div>

      {/* ✅ MODAL */}
      {selectedStudent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            setSelectedStudent(null);
            setEditMode(false);
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "420px",
              textAlign: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedStudent(null);
                setEditMode(false);
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              X
            </button>

            {/* ✅ Display OR Edit Mode */}
            {!editMode ? (
              <>
                <img
                  src={selectedStudent.photo || "/default-avatar.png"}
                  alt={selectedStudent.name}
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                />
                <h2>{selectedStudent.name}</h2>
                <p>
                  <strong>Roll No:</strong> {selectedStudent.rollNumber}
                </p>
                <p>
                  <strong>Department:</strong> {selectedStudent.department}
                </p>
                <p>
                  <strong>Father:</strong> {selectedStudent.fatherName}
                </p>
                <p>
                  <strong>Domain Mail:</strong> {selectedStudent.domainMail}
                </p>
                <p>
                  <strong>Personal Mail:</strong> {selectedStudent.personalMail}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedStudent.phone}
                </p>

                {/* ✅ Edit & Delete Buttons */}
                <button
                  style={{
                    background: "blue",
                    color: "white",
                    padding: "8px 15px",
                    marginRight: "10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEditClick(selectedStudent)}
                >
                  ✏️ Edit
                </button>

                <button
                  style={{
                    background: "darkred",
                    color: "white",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(selectedStudent._id)}
                >
                  🗑 Delete
                </button>
              </>
            ) : (
              <>
                <h2>Edit Student</h2>
                {[
                  { name: "name", label: "Name" },
                  { name: "fatherName", label: "Father Name" },
                  { name: "domainMail", label: "Domain Mail" },
                  { name: "personalMail", label: "Personal Mail" },
                  { name: "department", label: "Department" },
                  { name: "rollNumber", label: "Roll Number" },
                  { name: "phone", label: "Phone" },
                ].map(({ name, label }) => (
                  <input
                    key={name}
                    type="text"
                    name={name}
                    value={editData[name] || ""}
                    onChange={handleEditChange}
                    placeholder={label}
                    style={{
                      width: "100%",
                      margin: "5px 0",
                      padding: "8px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                ))}

                <label style={{ display: "block", margin: "10px 0 5px" }}>
                  Upload New Photo
                </label>
                <input type="file" onChange={handlePhotoChange} />

                <button
                  style={{
                    background: "green",
                    color: "white",
                    padding: "8px 15px",
                    marginTop: "10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleSaveEdit}
                >
                  ✅ Save
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
