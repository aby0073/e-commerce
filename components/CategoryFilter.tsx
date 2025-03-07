import React from "react";
import { FormControl, InputLabel, Select, MenuItem, styled, SelectChangeEvent } from "@mui/material";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 240,
  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -9px) scale(0.75)",
    transformOrigin: "top left",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.grey[400],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

interface CategoryFilterProps {
  category: string;
  setCategory: (value: string) => void;
}

export default function CategoryFilter({ category, setCategory }: CategoryFilterProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  return (
    <StyledFormControl variant="outlined">
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        value={category || ""}
        onChange={handleChange}
        displayEmpty
        label="Category"
        renderValue={(selected) => (selected ? selected : "All Categories")}
        MenuProps={{
          anchorOrigin: { vertical: "bottom", horizontal: "left" },
          transformOrigin: { vertical: "top", horizontal: "left" },
        }}
      >
        <MenuItem value="">
          <em>All Categories</em>
        </MenuItem>
        <MenuItem value="electronics">Electronics</MenuItem>
        <MenuItem value="jewelry">Jewelry</MenuItem>
        <MenuItem value="men's clothing">Men's Clothing</MenuItem>
        <MenuItem value="women's clothing">Women's Clothing</MenuItem>
      </Select>
    </StyledFormControl>
  );
}
