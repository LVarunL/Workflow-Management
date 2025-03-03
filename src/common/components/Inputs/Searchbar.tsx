import React, { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  placeholder?: string;
  width?: number;
  onSearch: (query: string) => void;
}

export function useSearchBar({
  placeholder = "Search...",
  width = 250,
  onSearch,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

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
