import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

export default function TableRowComponent({
  row,
  index,
  onEdit,
  onDelete,
  onView,
}) {
  return (
    <TableRow
      key={row.srNo}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.srNo}
      </TableCell>
      <TableCell>{row.course}</TableCell>
      <TableCell>{row.subjectName}</TableCell>
      <TableCell>{row.assignmentDescription}</TableCell>
      <TableCell>{row.createDate}</TableCell>
      <TableCell>{row.dueDate}</TableCell>
      <TableCell>
        <Button onClick={() => onEdit(index)}>Edit</Button>
        <Button onClick={() => onView(index)}>View</Button>
        <Button onClick={() => onDelete(index)}>Delete</Button>
      </TableCell>
    </TableRow>
  );
}
