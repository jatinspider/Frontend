// import Header from './Components/Header/Header';
// import React, { useState ,useEffect} from 'react';
// import AssignmentTableTeacher from './Components/TeacherDashBoard/AssignmentTableTeacher.jsx';
// import Login from './Components/authentication/Login';
// import AssignmentTable from './Components/student/AssignmentTable';
// import { useAuth } from './Components/authentication/AuthContext';

// function App() {
//   const { user, login } = useAuth();
//   const [activeTab, setActiveTab] = useState('Overdue');

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       login(storedUser);
//     }
//   }, [login]);

//   const handleLoginSuccess = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
//     login(userData);
//   };
//     localStorage.setItem("userId", data.userId); // Store userId in localStorage
//     localStorage.setItem("role", data.role); // Store role if needed
 

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header activeTab={activeTab} setActiveTab={setActiveTab} />
//       <div className="container mx-auto">
//         {!user ? (
//           <Login onLoginSuccess={handleLoginSuccess} />
//         ) :  role.trim() === "Teacher" ? (
//           <AssignmentTableTeacher />
//         ) : (
//           <AssignmentTable /> 
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;



import Header from './Components/Header/Header';
import React, { useState, useEffect } from 'react';
import AssignmentTableTeacher from './Components/TeacherDashBoard/AssignmentTableTeacher';
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
    localStorage.setItem('userId', userData.userId); // Store userId in local storage
    localStorage.setItem('role', userData.role); // Store role in local storage if needed
    login(userData); // Update the auth context
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto">
        {!user ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : user.role.trim() === "Teacher" ? (
          <AssignmentTableTeacher />
        ) : (
          <AssignmentTable userId={user.userId} />
        )}
      </div>
    </div>
  );
}

export default App;
