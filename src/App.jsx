// import Header from './Components/Header/Header';
// import React, { useState } from 'react';
// // import AssignmentTable from './Components/student/AssignmentTable';
// import AssignmentTableTeacher from './Components/teacher/AssignmentTableTeacher';
// import Login from './Components/Login';
// import StudentTable from './Components/teacher/StudentTable';
// function App() {
//   const [activeTab, setActiveTab] = useState('Overdue');
//   return (
//     <div className="min-h-screen bg-gray-100">
//     <Header activeTab={activeTab} setActiveTab={setActiveTab} />
//     <div className="container mx-auto">
//       {/* <AssignmentTable activeTab={activeTab} /> */}
//       {/* <Login/> */}
//       <AssignmentTableTeacher />
     
//     </div>
//   </div>
//   // 
//   )
// }

// export default App


import Header from './Components/Header/Header';
import React, { useState } from 'react';
import AssignmentTableTeacher from './Components/TeacherDashBoard/AssignmentTableTeacher.jsx';
import Login from './Components/Login';
import StudentTable from './Components/teacher/StudentTable';
import AssignmentTable from './Components/student/AssignmentTable';
function App() {  
  const [activeTab, setActiveTab] = useState('Overdue');

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto">
        {/* Conditional rendering based on the active tab */}
        {/* <AssignmentTableTeacher /> */}
     
          {/* <AssignmentTable /> */}
          <AssignmentTableTeacher />
      </div>
    </div>
  );
}

export default App;
