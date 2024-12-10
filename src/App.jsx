import Header from './Components/Header/Header';
import React, { useState, useEffect } from 'react';
import AssignmentTableTeacher from './Components/TeacherDashBoard/AssignmentTableTeacher';
import Login from './Components/authentication/Login';
import AssignmentTable from './Components/student/AssignmentTable';
import { useAuth } from './Components/authentication/AuthContext';

function App() {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState('Ongoing');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      login(storedUser);
    }
  }, [login]);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('role', userData.role);
    login(userData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto">
        {!user ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : user.role.trim() === "Teacher" ? (
          <AssignmentTableTeacher userId={user.userId}
          
          
          />
        ) : (
          <AssignmentTable userId={user.userId} />
        )}
      </div>
    </div>
  );
}

export default App;
