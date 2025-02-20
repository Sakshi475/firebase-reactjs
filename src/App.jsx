// src/App.jsx
import { Routes, Route } from "react-router-dom"; // ❌ Remove BrowserRouter import
import Dashboard from "./components/Dashboard";
import StudentList from "./components/StudentList";
import StudentDetail from "./components/StudentDetail";

function App() {
  return (
    <div>
      <h1>Student Management Dashboard</h1>
      <Routes> {/* ✅ No need for <Router> here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/student/:id" element={<StudentDetail />} />
      </Routes>
    </div>
  );
}

export default App;
