// import React from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";

// export default function AssignmentDialog({
//   open,
//   onClose,
//   onChange,
//   onSubmit,
//   formData,
//   editIndex,
// }) {
//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>
//         {editIndex !== null ? "Edit Assignment" : "Create New Assignment"}
//       </DialogTitle>
//       <DialogContent>
//         <FormControl fullWidth variant="standard" margin="dense">
//           <InputLabel>Course</InputLabel>
//           <Select
//             name="course"
//             value={formData.course}
//             onChange={onChange}
//             label="Course"
//           >
//             <MenuItem value="BE">BE</MenuItem>
//             <MenuItem value="MCA">MCA</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           autoFocus
//           margin="dense"
//           name="subjectName"
//           label="Subject Name"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={formData.subjectName}
//           onChange={onChange}
//         />
//         <TextField
//           margin="dense"
//           name="assignmentDescription"
//           label="Assignment Description"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={formData.assignmentDescription}
//           onChange={onChange}
//         />
//         <TextField
//           margin="dense"
//           name="createDate"
//           label="Create Date"
//           type="date"
//           fullWidth
//           variant="standard"
//           value={formData.createDate}
//           onChange={onChange}
//           InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//           margin="dense"
//           name="dueDate"
//           label="Due Date"
//           type="date"
//           fullWidth
//           variant="standard"
//           value={formData.dueDate}
//           onChange={onChange}
//           InputLabelProps={{ shrink: true }}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={onSubmit}>
//           {editIndex !== null ? "Update" : "Create"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }


import React, { useEffect } from "react";
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
import PropTypes from "prop-types";

export default function AssignmentDialog({
  open,
  onClose,
  onChange,
  onSubmit,
  formData,
  editIndex,
}) {
  // Reset form data on close
  useEffect(() => {
    if (!open) {
      // Reset form data if needed
      onChange({ target: { name: "course", value: "" } });
      onChange({ target: { name: "subjectName", value: "" } });
      onChange({ target: { name: "assignmentDescription", value: "" } });
      onChange({ target: { name: "createDate", value: "" } });
      onChange({ target: { name: "dueDate", value: "" } });
    }
  }, [open, onChange]);

  // Function to check if any fields are empty
  const isFormValid = () => {
    return (
      formData.course &&
      formData.subjectName &&
      formData.assignmentDescription &&
      formData.createDate &&
      formData.dueDate
    );
  };

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
        <Button onClick={onSubmit} disabled={!isFormValid()}>
          {editIndex !== null ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// PropTypes validation for the props
AssignmentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    course: PropTypes.string.isRequired,
    subjectName: PropTypes.string.isRequired,
    assignmentDescription: PropTypes.string.isRequired,
    createDate: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
  editIndex: PropTypes.number,
};