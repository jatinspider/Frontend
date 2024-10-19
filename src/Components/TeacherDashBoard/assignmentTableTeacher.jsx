import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AssignmentDialog from "./AssignmentDialog";
import AssignmentViewDialog from "./AssignmentViewDialog";
import Filter from "./Filter";
import TableRowComponent from "./TableRowComponent";

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
  marginRight: "px",
});

function createData(
  srNo,
  course,
  subjectName,
  assignmentDescription,
  createDate,
  dueDate
) {
  return {
    srNo,
    course,
    subjectName,
    assignmentDescription,
    createDate,
    dueDate,
  };
}

const initialRows = [
  createData(
    1,
    "BE",
    "Mathematics",
    "Algebra Assignment",
    "01/01/2024",
    "15/01/2024"
  ),
  createData(2, "MCA", "Science", "Biology Report", "05/02/2024", "19/02/2024"),
  createData(
    3,
    "BE",
    "History",
    "World War II Essay",
    "10/03/2024",
    "24/03/2024"
  ),
  createData(
    4,
    "MCA",
    "English",
    "Shakespeare Analysis",
    "15/04/2024",
    "29/04/2024"
  ),
  createData(5, "BE", "Geography", "Map Project", "20/05/2024", "03/06/2024"),
];

export default function AssignmentTableTeacher() {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [formData, setFormData] = useState({
    course: "",
    subjectName: "",
    assignmentDescription: "",
    createDate: "",
    dueDate: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("");

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
  };

  const handleViewClose = () => setViewOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedRows = rows.map((row, index) =>
        index === editIndex
          ? createData(
              row.srNo,
              formData.course,
              formData.subjectName,
              formData.assignmentDescription,
              formData.createDate,
              formData.dueDate
            )
          : row
      );
      setRows(updatedRows);
      setEditIndex(null);
    } else {
      const newSrNo = rows.length + 1;
      const newRow = createData(
        newSrNo,
        formData.course,
        formData.subjectName,
        formData.assignmentDescription,
        formData.createDate,
        formData.dueDate
      );
      setRows((prev) => [...prev, newRow]);
    }
    setOpen(false);
    setFormData({
      course: "",
      subjectName: "",
      assignmentDescription: "",
      createDate: "",
      dueDate: "",
    });
  };

  const handleEdit = (index) => {
    const row = rows[index];
    setFormData({
      course: row.course,
      subjectName: row.subjectName,
      assignmentDescription: row.assignmentDescription,
      createDate: row.createDate,
      dueDate: row.dueDate,
    });
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    // Create a confirmation dialog before deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );
    if (confirmDelete) {
      // Filter out the row based on the index
      const updatedRows = rows.filter((_, i) => i !== index);

      // Remap Sr. No after deletion
      const remappedRows = updatedRows.map((row, i) =>
        createData(
          i + 1, // Reset Sr. No to be in ascending order
          row.course,
          row.subjectName,
          row.assignmentDescription,
          row.createDate,
          row.dueDate
        )
      );

      // Update the rows with remapped Sr. No
      setRows(remappedRows);
    }
  };

  const handleView = (index) => {
    const row = rows[index];
    setFormData({
      course: row.course,
      subjectName: row.subjectName,
      assignmentDescription: row.assignmentDescription,
      createDate: row.createDate,
      dueDate: row.dueDate,
    });
    setViewOpen(true);
  };

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredRows = filter
    ? rows.filter((row) => row.course === filter)
    : rows;

  return (
    <>
      <Container>
        <Button variant="outlined" onClick={handleClickOpen}>
          Create New Assignment
        </Button>
        <FilterContainer>
          <Filter filter={filter} onFilterChange={handleFilterChange} />
        </FilterContainer>
      </Container>
      <AssignmentDialog
        open={open}
        onClose={handleClose}
        onChange={handleChange}
        onSubmit={handleSubmit}
        formData={formData}
        editIndex={editIndex}
      />
      <AssignmentViewDialog
        open={viewOpen}
        onClose={handleViewClose}
        formData={formData}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CustomTableCell>Sr. No</CustomTableCell>
              <CustomTableCell>Course</CustomTableCell>
              <CustomTableCell>Subject Name</CustomTableCell>
              <CustomTableCell>Assignment Description</CustomTableCell>
              <CustomTableCell>Create Date</CustomTableCell>
              <CustomTableCell>Due Date</CustomTableCell>
              <CustomTableCell>Actions</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRowComponent
                key={row.srNo}
                row={row}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
