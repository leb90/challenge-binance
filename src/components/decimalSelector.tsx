import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React from "react";

interface Props {
  onSelect: (decimalValue: number) => void;
  decimalValue: number;
}

const DecimalSelector: React.FC<Props> = ({ onSelect, decimalValue }) => {

  const handleChange = (event: SelectChangeEvent<number>) => {
    onSelect(event.target.value as number);
  };

  return (
    <Select value={decimalValue} onChange={handleChange}>
      <MenuItem value={0.01}>0.01</MenuItem>
      <MenuItem value={0.1}>0.1</MenuItem>
      <MenuItem value={1}>1</MenuItem>
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={50}>50</MenuItem>
      <MenuItem value={100}>100</MenuItem>
    </Select>
  );
};

export default DecimalSelector;
