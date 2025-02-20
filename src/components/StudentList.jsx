// src/components/StudentList.jsx
import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { ref, onValue, remove } from "firebase/database";
import { Link } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const studentRef = ref(database, "students");
    const unsubscribe = onValue(studentRef, (snapshot) => {
      if (snapshot.exists()) {
        const studentData = snapshot.val();
        const studentArray = Object.keys(studentData).map((key) => ({
          id: key,
          ...studentData[key],
        }));
        setStudents(studentArray);
      } else {
        setStudents([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      await remove(ref(database, `students/${id}`));
      alert("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <Link to={`/student/${student.id}`} style={{ textDecoration: "none", color: "blue" }}>
                <strong>{student.name}</strong>
              </Link>
              <button onClick={() => handleDelete(student.id)}>❌ Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;
