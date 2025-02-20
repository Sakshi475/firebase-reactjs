// src/components/StudentDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebaseConfig";
import { ref, get, update } from "firebase/database";

function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      const studentRef = ref(database, `students/${id}`);
      const snapshot = await get(studentRef);
      if (snapshot.exists()) {
        setStudent(snapshot.val());
      } else {
        setStudent(null);
      }
      setLoading(false);
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await update(ref(database, `students/${id}`), student);
      alert("Student updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>Student not found.</p>;

  return (
    <div>
      <h2>Student Details</h2>
      {isEditing ? (
        <div>
          <input type="text" name="name" value={student.name} onChange={handleChange} />
          <input type="number" name="age" value={student.age} onChange={handleChange} />
          <input type="email" name="email" value={student.email} onChange={handleChange} />
          <input type="text" name="className" value={student.className} onChange={handleChange} />
          <button onClick={handleUpdate}>✅ Save</button>
          <button onClick={() => setIsEditing(false)}>❌ Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Age:</strong> {student.age} years old</p>
          <p><strong>Class:</strong> {student.className}</p>
          <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
        </div>
      )}
    </div>
  );
}

export default StudentDetail;
