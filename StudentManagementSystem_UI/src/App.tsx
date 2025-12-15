import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import MasterLayout from "./pages/Master/MasterLayout";
import PrivateRoute from "./routes/PrivateRoute";
import StudentList from "./pages/Students/StudentList";
import ClassList from "./pages/Courses/CourseList";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/master"
            element={
              <PrivateRoute>
                <MasterLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="students" replace />} />
            <Route path="students" element={<StudentList />} />
            <Route path="classes" element={<ClassList />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
