import React, { useEffect, useState } from "react";

const formatDate = (isoString) => {
  if (!isoString) return "N/A"; // Return a default value if isoString is undefined or empty

  // Create a new Date object from the ISO string
  const date = new Date(isoString);

  // Return a formatted date string
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const AssignmentTable = ({ activeTab }) => {
  const [assignments, setAssignments] = useState([]);
  const [subjects, setSubjects] = useState([]); // State to store subjects
  const [submittedAssignment, setSubmittedAssignment] = useState(null);
  const [code, setCode] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch assignments from the API
    const fetchAssignments = async () => {
      try {
        const response = await fetch("http://localhost:5164/api/Assignments"); // Update with your API endpoint
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    // Fetch subjects from the API
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:5164/api/Subjects"); // Update with your API endpoint
        const data = await response.json();
        setSubjects(data); // Store subjects in state
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchAssignments();
    fetchSubjects();
  }, []);

  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmitClick = (assignmentId) => {
    if (submittedAssignment === assignmentId) {
      setSubmittedAssignment(null);
    } else {
      setSubmittedAssignment(assignmentId);
    }
  };

  const handleFormSubmit = () => {
    if (code && file) {
      console.log("Submitting code and file for assignment ID:", submittedAssignment);
      console.log("Code:", code);
      console.log("File:", file);

      // Reset after submission
      setSubmittedAssignment(null);
      setCode("");
      setFile(null);
    } else {
      alert("Please enter the code and upload a file.");
    }
  };

  return (
    <div className="p-4">
      <table className="min-w-full border-collapse border border-gray-300  mt-20">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-6 py-2">Index</th>
            <th className="border border-gray-300 px-6 py-2">Assignment Name</th>
            <th className="border border-gray-300 px-6 py-2">Assignment Description</th>
            <th className="border border-gray-300 px-6 py-2">Subject</th>
            <th className="border border-gray-300 px-6 py-2">Created Date</th>
            <th className="border border-gray-300 px-6 py-2">Due Date</th>
            <th className="border border-gray-300 px-6 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <React.Fragment key={assignment.id}>
              <tr>
                <td className="border border-gray-300 px-6 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-6 py-2">{assignment.name}</td>
                <td className="border border-gray-300 px-6 py-2">{assignment.description}</td>
                <td className="border border-gray-300 px-6 py-2">
                  {subjects.find(subject => subject.id === assignment.subjectId)?.name || "N/A"} {/* Find subject name */}
                </td>
                <td className="border border-gray-300 px-6 py-2">{formatDate(assignment.createdDate)}</td>
                <td className="border border-gray-300 px-6 py-2">{formatDate(assignment.dueDate)}</td>
                <td className="border border-gray-300 px-6 py-2 text-center">
                  {activeTab !== "Completed" ? (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleSubmitClick(assignment.id)}
                    >
                      Submit Assignment
                    </button>
                  ) : (
                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                      View Score
                    </button>
                  )}
                </td>
              </tr>

              {submittedAssignment === assignment.id && (
                <tr>
                  <td colSpan="7" className="border border-gray-300 p-4 bg-gray-100">
                    <h3 className="text-xl font-semibold mb-4">
                      Submit Code and File for Assignment {assignment.name}
                    </h3>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Enter Code:
                      </label>
                      <textarea
                        value={code}
                        onChange={handleCodeChange}
                        rows="4"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your code here"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Upload File:
                      </label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                    <button
                      onClick={handleFormSubmit}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;





// for future 
// import React, { useEffect, useState } from "react";

// const formatDate = (isoString) => {
//   if (!isoString) return "N/A"; // Return a default value if isoString is undefined or empty

//   // Create a new Date object from the ISO string
//   const date = new Date(isoString);

//   // Return a formatted date string
//   return date.toLocaleString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     hour12: true,
//   });
// };




// const AssignmentTable = ({ activeTab }) => {
//   const [assignments, setAssignments] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [submittedAssignment, setSubmittedAssignment] = useState(null);
//   const [code, setCode] = useState("");
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await fetch("http://localhost:5164/api/Assignments");
//         const data = await response.json();
//         setAssignments(data);
//       } catch (error) {
//         console.error("Error fetching assignments:", error);
//       }
//     };

//     const fetchSubjects = async () => {
//       try {
//         const response = await fetch("http://localhost:5164/api/Subjects");
//         const data = await response.json();
//         setSubjects(data);
//       } catch (error) {
//         console.error("Error fetching subjects:", error);
//       }
//     };

//     fetchAssignments();
//     fetchSubjects();
//   }, []);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleCodeChange = (e) => {
//     setCode(e.target.value);
//   };

//   const handleSubmitClick = (assignmentId) => {
//     if (submittedAssignment === assignmentId) {
//       setSubmittedAssignment(null);
//     } else {
//       setSubmittedAssignment(assignmentId);
//     }
//   };

//   const handleFormSubmit = async () => {
//     if (code && file) {
//       const formData = new FormData();
//       formData.append("assignmentId", submittedAssignment);
//       formData.append("code", code);
//       formData.append("file", file);

//       try {
//         const response = await fetch("http://localhost:5164/api/Assignments/Submit", {
//           method: "POST",
//           body: formData,
//         });

//         if (response.ok) {
//           console.log("Submission successful!");
//           alert("Submission successful!");
//           // Reset after submission
//           setSubmittedAssignment(null);
//           setCode("");
//           setFile(null);
//         } else {
//           const errorData = await response.json();
//           console.error("Submission failed:", errorData);
//           alert("Submission failed. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error submitting assignment:", error);
//         alert("Error submitting assignment. Please try again.");
//       }
//     } else {
//       alert("Please enter the code and upload a file.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <table className="min-w-full border-collapse border border-gray-300 mt-20">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border border-gray-300 px-6 py-2">Index</th>
//             <th className="border border-gray-300 px-6 py-2">Assignment Name</th>
//             <th className="border border-gray-300 px-6 py-2">Assignment Description</th>
//             <th className="border border-gray-300 px-6 py-2">Subject</th>
//             <th className="border border-gray-300 px-6 py-2">Created Date</th>
//             <th className="border border-gray-300 px-6 py-2">Due Date</th>
//             <th className="border border-gray-300 px-6 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {assignments.map((assignment, index) => (
//             <React.Fragment key={assignment.id}>
//               <tr>
//                 <td className="border border-gray-300 px-6 py-2 text-center">{index + 1}</td>
//                 <td className="border border-gray-300 px-6 py-2">{assignment.name}</td>
//                 <td className="border border-gray-300 px-6 py-2">{assignment.description}</td>
//                 <td className="border border-gray-300 px-6 py-2">
//                   {subjects.find(subject => subject.id === assignment.subjectId)?.name || "N/A"}
//                 </td>
//                 <td className="border border-gray-300 px-6 py-2">{formatDate(assignment.createdDate)}</td>
//                 <td className="border border-gray-300 px-6 py-2">{formatDate(assignment.dueDate)}</td>
//                 <td className="border border-gray-300 px-6 py-2 text-center">
//                   {activeTab !== "Completed" ? (
//                     <button
//                       className="bg-blue-500 text-white px-4 py-2 rounded"
//                       onClick={() => handleSubmitClick(assignment.id)}
//                     >
//                       Submit Assignment
//                     </button>
//                   ) : (
//                     <button className="bg-green-500 text-white px-4 py-2 rounded">
//                       View Score
//                     </button>
//                   )}
//                 </td>
//               </tr>

//               {submittedAssignment === assignment.id && (
//                 <tr>
//                   <td colSpan="7" className="border border-gray-300 p-4 bg-gray-100">
//                     <h3 className="text-xl font-semibold mb-4">
//                       Submit Code and File for Assignment {assignment.name}
//                     </h3>
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Enter Code:
//                       </label>
//                       <textarea
//                         value={code}
//                         onChange={handleCodeChange}
//                         rows="4"
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                         placeholder="Enter your code here"
//                       ></textarea>
//                     </div>
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Upload File:
//                       </label>
//                       <input
//                         type="file"
//                         onChange={handleFileChange}
//                         className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                       />
//                     </div>
//                     <button
//                       onClick={handleFormSubmit}
//                       className="bg-green-500 text-white px-4 py-2 rounded"
//                     >
//                       Submit
//                     </button>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AssignmentTable;
