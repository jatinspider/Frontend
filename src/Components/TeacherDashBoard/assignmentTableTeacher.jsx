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
import Filter from "./Filter";

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
          params: { teacherId: userId }
        });
        console.log(response);
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