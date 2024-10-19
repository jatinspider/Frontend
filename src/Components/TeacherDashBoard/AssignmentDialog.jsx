import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function AssignmentDialog({
  open,
  onClose,
  onChange,
  onSubmit,
  formData,
  editIndex,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {editIndex !== null ? "Edit Assignment" : "Create New Assignment"}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="standard" margin="dense">
          <InputLabel>Course</InputLabel>
          <Select
            name="course"
            value={formData.course}
            onChange={onChange}
            label="Course"
          >
            <MenuItem value="BE">BE</MenuItem>
            <MenuItem value="MCA">MCA</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          name="subjectName"
          label="Subject Name"
          type="text"
          fullWidth
          variant="standard"
          value={formData.subjectName}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="assignmentDescription"
          label="Assignment Description"
          type="text"
          fullWidth
          variant="standard"
          value={formData.assignmentDescription}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="createDate"
          label="Create Date"
          type="date"
          fullWidth
          variant="standard"
          value={formData.createDate}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          name="dueDate"
          label="Due Date"
          type="date"
          fullWidth
          variant="standard"
          value={formData.dueDate}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>
          {editIndex !== null ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
