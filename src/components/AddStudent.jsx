// src/components/AddStudent.jsx
import { useState } from "react";
import { database } from "../firebaseConfig";
import { ref, push } from "firebase/database";

function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    email: "",
    className: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student.name || !student.age || !student.email || !student.className) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await push(ref(database, "students"), student);
      alert("Student added successfully!");
      setStudent({ name: "", age: "", email: "", className: "" });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={student.age} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
        <input type="text" name="className" placeholder="Class" value={student.className} onChange={handleChange} required />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
