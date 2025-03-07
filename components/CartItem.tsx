import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface CategoryFilterProps {
  category: string;
  setCategory: (value: string) => void;
}

export default function CategoryFilter({ category, setCategory }: CategoryFilterProps) {
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        value={category}
        label="Category"
        onChange={(e) => setCategory(e.target.value as string)} // Type assertion for clarity
        displayEmpty
        renderValue={(selected) => (selected === "" ? "All Categories" : selected)}
      >
        <MenuItem value="">
          <em>All Categories</em>
        </MenuItem>
        <MenuItem value="electronics">Electronics</MenuItem>
        <MenuItem value="jewelery">Jewelry</MenuItem>
        <MenuItem value="men's clothing">Men's Clothing</MenuItem>
        <MenuItem value="women's clothing">Women's Clothing</MenuItem>
      </Select>
    </FormControl>
  );
}