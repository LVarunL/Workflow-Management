import React, { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, SetStateAction } from "react";
interface SearchBarProps {
  placeholder?: string;
  width?: number;
  onSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export function Searchbar({
  placeholder = "Search...",
  width = 250,
  searchQuery,
  setSearchQuery,
  onSearch,
}: SearchBarProps) {
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const searchBar = (
    <Box sx={{ position: "relative", width: width }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSearch();
        }}
        sx={{ pr: 5 }}
      />
      <IconButton
        onClick={handleSearch}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );

  return { searchBar, searchQuery };
}
