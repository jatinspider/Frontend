import Header from './Components/Header/Header';
import React, { useState } from 'react';
import AssignmentTable from './Components/student/AssignmentTable';
import Login from './Components/Login';

function App() {
  const [activeTab, setActiveTab] = useState('Overdue');
  return (
    <div className="min-h-screen bg-gray-100">
    <Header activeTab={activeTab} setActiveTab={setActiveTab} />
    <div className="container mx-auto">
      {/* <AssignmentTable activeTab={activeTab} /> */}
      {/* <Login/> */}
      <AssignmentTable/>
    </div>
  </div>
  // 
  )
}

export default App