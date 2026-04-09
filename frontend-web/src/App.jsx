// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Login from './components/Login';
import SettingsPage from './pages/SettingsPage';
import SubjectManagement from './pages/SubjectManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        {/* Simple Navigation Bar */}
        <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="font-bold text-xl text-blue-600">School ERP</div>
          <div className="space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-600"}
            >
              Academic Settings
            </NavLink>
            <Link to="/subjects" className="text-gray-600 hover:text-blue-600 font-medium">Subjects</Link>
          </div>
        </nav>

        {/* Page Content */}
        <main className="container mx-auto">
          <Routes>
            {/* Login is the default landing page */}
            <Route path="/" element={<Login />} />
            
            {/* Settings Page Route */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/subjects" element={<SubjectManagement />} />
            
            {/* Fallback for 404 */}
            <Route path="*" element={<div className="p-10 text-center text-gray-500">Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;