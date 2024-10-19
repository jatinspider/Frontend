import React from "react";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Styled component for Filter
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: "0 10px",
  minWidth: 180,
  backgroundColor: "#f0f0f0",
  borderRadius: "4px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.dark,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.dark,
  },
}));

const Filter = ({ filter, onFilterChange }) => {
  return (
    <StyledFormControl variant="outlined">
      <InputLabel>Filter by Course</InputLabel>
      <Select value={filter} onChange={onFilterChange} label="Filter by Course">
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        <MenuItem value="BE">BE</MenuItem>
        <MenuItem value="MCA">MCA</MenuItem>
      </Select>
    </StyledFormControl>
  );
};

export default Filter;
