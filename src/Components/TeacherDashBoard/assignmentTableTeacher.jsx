/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
// import AssignmentDialog from "./AssignmentDialog"; // Add your AssignmentDialog component
// import AssignmentViewDialog from "./AssignmentViewDialog"; // Add your AssignmentViewDialog component
import Filter from "./Filter"; // Add your Filter component

// Custom style for table header
const CustomTableCell = styled(TableCell)({
  backgroundColor: "#3f51b5",
  color: "#fff",
});

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  marginTop: "20px",
});

const FilterContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

function formatDate(isoString) {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export default function AssignmentTableTeacher({ userId }) {
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("http://localhost:5067/api/Assignment/teacher", {
          params: { teacherId: "67272c5de260251d82d9c991" }
        });
        console.log(response.data)
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, [userId]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleViewOpen = () => setViewOpen(true);
  const handleViewClose = () => setViewOpen(false);

  return (
    <>
      <Container>
        <Button variant="outlined" onClick={handleClickOpen}>
          Create New Assignment
        </Button>
        <FilterContainer>
          <Filter filter={""} onFilterChange={() => { }} />
        </FilterContainer>
      </Container>

      {/* <AssignmentDialog
        open={open}
        onClose={handleClose}
        // Pass necessary props for creation or editing logic
      />
      <AssignmentViewDialog
        open={viewOpen}
        onClose={handleViewClose}
        // Pass necessary props for viewing an assignment
      /> */}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>Index</CustomTableCell>
              <CustomTableCell>Course</CustomTableCell>
              <CustomTableCell>Subject Name</CustomTableCell>
              <CustomTableCell>Assignment Description</CustomTableCell>
              <CustomTableCell>Created Date</CustomTableCell>
              <CustomTableCell>Due Date</CustomTableCell>
              <CustomTableCell>Actions</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                
                <TableRow key={assignment.id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{assignment.course}</TableCell>
                  <TableCell>{assignment.subjectName}</TableCell>
                  <TableCell>{assignment.assignmentDescription}</TableCell>
                  <TableCell>{formatDate(assignment.createDate)}</TableCell>
                  <TableCell>{formatDate(assignment.dueDate)}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => console.log('View clicked')}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Assignments Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </>
  );
}



// 2nd code:
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import AssignmentDialog from "./AssignmentDialog";  // Dialog for creating/editing assignments
// import AssignmentViewDialog from "./AssignmentViewDialog";  // Dialog for viewing assignments
// import Filter from "./Filter";  // Filter component to apply filters on the table

// // Custom style for table header
// const CustomTableCell = styled(TableCell)({
//   backgroundColor: "#3f51b5",
//   color: "#fff",
// });

// const Container = styled("div")({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: "20px",
//   marginTop: "20px",
// });

// const FilterContainer = styled("div")({
//   display: "flex",
//   alignItems: "center",
//   marginRight: "px",
// });

// function AssignmentTableTeacher({ userId }) {
//   const [assignments, setAssignments] = useState([]);
//   const [open, setOpen] = useState(false);  // For the assignment creation dialog
//   const [viewOpen, setViewOpen] = useState(false);  // For viewing assignment details
//   const [selectedAssignment, setSelectedAssignment] = useState(null); // To store selected assignment for viewing/editing
//   const [filter, setFilter] = useState(""); // Filter value for filtering assignments

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get("http://localhost:5067/api/Assignment/teacher", {
//           params: { teacherId: userId },
//         });
//         setAssignments(response.data);
//       } catch (error) {
//         console.error("Error fetching assignments:", error);
//       }
//     };
//     fetchAssignments();
//   }, [userId]);

//   const handleCreateAssignment = () => {
//     setOpen(true);
//   };

//   const handleViewAssignment = (assignment) => {
//     setSelectedAssignment(assignment);
//     setViewOpen(true);
//   };

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setViewOpen(false);
//   };

//   return (
//     <>
//       <Container>
//         <Button variant="outlined" onClick={handleCreateAssignment}>
//           Create New Assignment
//         </Button>
//         <FilterContainer>
//           <Filter filter={filter} onFilterChange={handleFilterChange} />
//         </FilterContainer>
//       </Container>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="Assignments table">
//           <TableHead>
//             <TableRow>
//               <CustomTableCell>Sr No</CustomTableCell>
//               <CustomTableCell>Course</CustomTableCell>
//               <CustomTableCell>Subject</CustomTableCell>
//               <CustomTableCell>Assignment Description</CustomTableCell>
//               <CustomTableCell>Created Date</CustomTableCell>
//               <CustomTableCell>Due Date</CustomTableCell>
//               <CustomTableCell>Actions</CustomTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {assignments
//               .filter((assignment) => assignment.assignmentDescription.toLowerCase().includes(filter.toLowerCase()))
//               .map((assignment, index) => (
//                 <TableRow key={assignment.id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{assignment.course}</TableCell>
//                   <TableCell>{assignment.subjectName}</TableCell>
//                   <TableCell>{assignment.assignmentDescription}</TableCell>
//                   <TableCell>{new Date(assignment.createDate).toLocaleDateString()}</TableCell>
//                   <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
//                   <TableCell>
//                     <Button onClick={() => handleViewAssignment(assignment)} variant="contained" color="primary">
//                       View
//                     </Button>
//                     {/* Add buttons for other actions like Edit, Delete if needed */}
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <AssignmentDialog open={open} onClose={handleClose} />
//       <AssignmentViewDialog
//         open={viewOpen}
//         onClose={handleClose}
//         assignment={selectedAssignment}
//       />
//     </>
//   );
// }

// export default AssignmentTableTeacher;


// import * as React from "react";
// import { useState } from "react";
// import React, { useEffect, useState } from 'react';
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import AssignmentDialog from "./AssignmentDialog";
// import AssignmentViewDialog from "./AssignmentViewDialog";
// import Filter from "./Filter";
// import TableRowComponent from "./TableRowComponent";
// import axios from "axios";

// // Custom style for table header
// const CustomTableCell = styled(TableCell)({
//   backgroundColor: "#3f51b5",
//   color: "#fff",
// });

// const Container = styled("div")({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: "20px",
//   marginTop: "20px",
// });

// const FilterContainer = styled("div")({
//   display: "flex",
//   alignItems: "center",
//   marginRight: "px",
// });

// function createData(
//   srNo,
//   course,
//   subjectName,
//   assignmentDescription,
//   createDate,
//   dueDate
// ) {
//   return {
//     srNo,
//     course,
//     subjectName,
//     assignmentDescription,
//     createDate,
//     dueDate,
//   };
// }

// const initialRows = [
//   createData(
//     1,
//     "BE",
//     "Mathematics",
//     "Algebra Assignment",
//     "01/01/2024",
//     "15/01/2024"
//   ),
//   createData(2, "MCA", "Science", "Biology Report", "05/02/2024", "19/02/2024"),
//   createData(
//     3,
//     "BE",
//     "History",
//     "World War II Essay",
//     "10/03/2024",
//     "24/03/2024"
//   ),
//   createData(
//     4,
//     "MCA",
//     "English",
//     "Shakespeare Analysis",
//     "15/04/2024",
//     "29/04/2024"
//   ),
//   createData(5, "BE", "Geography", "Map Project", "20/05/2024", "03/06/2024"),
// ];

// export default function AssignmentTableTeacher({ userId }) {
//   const [assignments, setAssignments] = useState([]);

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get("http://localhost:5067/api/Assignment/teacher", {
//           params: {teacherId: userId}
//         }); 
//         setAssignments(response.data);
//       } catch (error) {
//         console.error("Error fetching assignments:", error);
//       }
//     }
//   })

//   return (
//     <>
//       <Container>
//         <Button variant="outlined" onClick={handleClickOpen}>
//           Create New Assignment
//         </Button>
//         <FilterContainer>
//           <Filter filter={filter} onFilterChange={handleFilterChange} />
//         </FilterContainer>
//       </Container>
//       <AssignmentDialog
//         open={open}
//         onClose={handleClose}
//         onChange={handleChange}
//         onSubmit={handleSubmit}
//         formData={formData}
//         editIndex={editIndex}
//       />
//       <AssignmentViewDialog
//         open={viewOpen}
//         onClose={handleViewClose}
//         formData={formData}
//       />
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <CustomTableCell>Sr. No</CustomTableCell>
//               <CustomTableCell>Course</CustomTableCell>
//               <CustomTableCell>Subject Name</CustomTableCell>
//               <CustomTableCell>Assignment Description</CustomTableCell>
//               <CustomTableCell>Create Date</CustomTableCell>
//               <CustomTableCell>Due Date</CustomTableCell>
//               <CustomTableCell>Actions</CustomTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredRows.map((row, index) => (
//               <TableRowComponent
//                 key={row.srNo}
//                 row={row}
//                 index={index}
//                 onEdit={handleEdit}
//                 onDelete={handleDelete}
//                 onView={handleView}
//               />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }
