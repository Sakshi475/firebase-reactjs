// src/components/Dashboard.jsx
import { useState } from "react";
import AddStudent from "./AddStudent";
import StudentList from "./StudentList";

function Dashboard() {
  const [selectedPage, setSelectedPage] = useState("add");

  return (
    <div className="dashboard">
      <div className="sidebar">
        <button onClick={() => setSelectedPage("add")}>Add Student</button>
        <button onClick={() => setSelectedPage("list")}>Student List</button>
      </div>
      <div className="content">
        {selectedPage === "add" ? <AddStudent /> : <StudentList />}
      </div>
    </div>
  );
}

export default Dashboard;
