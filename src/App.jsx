import Header from './Components/Header/Header';
import React, { useState ,useEffect} from 'react';
import AssignmentTableTeacher from './Components/TeacherDashBoard/AssignmentTableTeacher.jsx';
import Login from './Components/authentication/Login';
import AssignmentTable from './Components/student/AssignmentTable';
import { useAuth } from './Components/authentication/AuthContext';

function App() {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState('Overdue');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      login(storedUser);
    }
  }, [login]);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
    login(userData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto">
        {!user ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) :  user.role.trim() === "Teacher" ? (
          <AssignmentTableTeacher />
        ) : (
          <AssignmentTable /> 
        )}
      </div>
    </div>
  );
}

export default App;
