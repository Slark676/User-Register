import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TaskProvider } from "./context/TasksContext.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import TaskFormPage from "./pages/TaskFormPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProtectedRouter from "./ProtectedRouter.jsx";
import Navbar from "./components/Navbar";
function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRouter />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/task-new" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
