import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import MasterLayout from "./pages/Master/MasterLayout";
import PrivateRoute from "./routes/PrivateRoute";
import StudentList from "./pages/Students/StudentList";
import ClassList from "./pages/Courses/CourseList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/master"
          element={
            <PrivateRoute>
              <MasterLayout />
            </PrivateRoute>
          }
        >
          <Route path="students" element={<StudentList />} />
          <Route path="classes" element={<ClassList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
