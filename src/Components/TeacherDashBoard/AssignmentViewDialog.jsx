import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function AssignmentViewDialog({ open, onClose, formData }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>View Assignment</DialogTitle>
      <DialogContent>
        <p>
          <strong>Course:</strong> {formData.course}
        </p>
        <p>
          <strong>Subject Name:</strong> {formData.subjectName}
        </p>
        <p>
          <strong>Assignment Description:</strong>{" "}
          {formData.assignmentDescription}
        </p>
        <p>
          <strong>Created Date:</strong> {formData.createDate}
        </p>
        <p>
          <strong>Due Date:</strong> {formData.dueDate}
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}