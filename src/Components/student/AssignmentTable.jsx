
import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";  // Import uuid to generate unique ID

const formatDate = (isoString) => {
  if (!isoString) return "N/A"; // Return a default value if isoString is undefined or empty
  const date = new Date(isoString);
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
  const [submittedAssignment, setSubmittedAssignment] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("http://localhost:5067/api/Assignment");
        const data = response.data;
        console.log("Assignments fetched:", data);
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, []);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmitClick = (assignmentId) => {
    setSubmittedAssignment(submittedAssignment === assignmentId ? null : assignmentId);
    
  };
 
 

const handleFormSubmit = async () => {
  const studentId = localStorage.getItem("userId");
  if (!studentId) {
    alert("User ID not found. Please log in again.");
    return;
  }

  if (code) {
    const generatedId = uuidv4(); // Generate a unique ID

    const submissionData = {
      id: generatedId,
      studentId: studentId,
      submittedCode: code,
      assignmentId: submittedAssignment ,
    };

    try {
      const response = await axios.post(
        "http://localhost:5067/api/AssignmentSubmission",
        submissionData,  // Send the data as JSON
        { headers: { "Content-Type": "application/json" } } // Ensure Content-Type is set to JSON
      );

      if (response.status === 200 || response.status === 201) {
        alert("Submission successful!");
      } else {
        alert(`Submission failed: ${response.data?.message || "Please try again."}`);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.error("Validation Errors:", error.response.data.errors);
        alert("Validation failed: " + JSON.stringify(error.response.data.errors));
      } else {
        console.error("Error submitting assignment:", error.message);
        alert("Error: already Submitted");
      }
    }
  } else {
    alert("Please enter the code before submitting.");
  }
};

const checkSubmissionStatus = async (studentId, assignmentId) => {
  try {
    const response = await axios.get(
      `http://localhost:5067/api/AssignmentSubmission/check-submission/${studentId}/${assignmentId}`
    );
    return response.data === "true"; 
  } catch (error) {
    console.error("Error checking submission status:", error);
    return false;
  }
};
useEffect(() => {
  const studentId = localStorage.getItem("userId"); // Replace with actual student ID
  assignments.forEach(async (assignment) => {
    const isSubmitted = await checkSubmissionStatus(studentId, assignment.assignment.id);
    setSubmittedAssignments((prev) => ({
      ...prev,
      [assignment.assignment.id]: isSubmitted,
    }));
  });
}, [assignments]);

  return (
    <div className="p-4">
      <table className="min-w-full border-collapse border border-gray-300 mt-20">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-6 py-2">Index</th>
            <th className="border border-gray-300 px-6 py-2">Assignment Description</th>
            <th className="border border-gray-300 px-6 py-2">Subject</th>
            <th className="border border-gray-300 px-6 py-2">Created Date</th>
            <th className="border border-gray-300 px-6 py-2">Due Date</th>
            <th className="border border-gray-300 px-6 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
       
          {assignments.map((assignmentData, index) => {
            const assignment = assignmentData.assignment;

            if (!assignment) {
              return (
                <tr key={index}>
                  <td colSpan="6" className="border border-gray-300 px-6 py-2">
                    Invalid assignment data
                  </td>
                </tr>
              );
            }
            return (
              <React.Fragment key={assignment.id}>
                <tr>
                  <td className="border border-gray-300 px-6 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-6 py-2">{assignment.description}</td>
                  <td className="border border-gray-300 px-6 py-2">{assignmentData.subjectName}</td>
                  <td className="border border-gray-300 px-6 py-2">{formatDate(assignment.createdDate)}</td>
                  <td className="border border-gray-300 px-6 py-2">{formatDate(assignment.dueDate)}</td>
                  <td className="border border-gray-300 px-6 py-2 text-center">
                    {assignmentData.isSubmitted ? (
                      <span className="text-green-500 font-bold">Submitted</span>
                    ) : activeTab !== "Completed" ? (
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
                    <td colSpan="6" className="border border-gray-300 p-4 bg-gray-100">
                      <h3 className="text-xl font-semibold mb-4">
                        Submit Code for Assignment {assignment.name}
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;



