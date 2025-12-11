import React, { useState, useCallback } from "react";
import { AppBar, Toolbar, Typography, Button, Modal, Box, TextField, InputAdornment, IconButton, Select, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ContactForm from "../components/ContactForm";
import { filterByLabel, searchuser } from "../redux/actions";
import { connect } from "react-redux";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function Navbar({ searchuser, filterByLabel }) {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    debounce((value) => {
      searchuser(value);
    }, 1000),
    []
  );
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedLabel(value);
    filterByLabel(value);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
          <Typography variant="h6">Phonebook</Typography>
          <TextField
            label="Search"
            value={searchQuery}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              overflow: "hidden",
              bgcolor: "white",
              outline: "none",
            }}
          />
          <Select
            label="Label"
            value={selectedLabel}
            displayEmpty
            onChange={handleSelectChange}
            renderValue={(selected) => {
              if (selected === "") return "All";
              return selected;
            }}
            sx={{
              backgroundColor: '#FFF',
              borderRadius: '8px',
              fontSize: '16px',
              width: "100px",
              padding: '0',
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
            <MenuItem value="Friend">Friend</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
          </Select>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen(true)}
          >
            Create Contact
          </Button>
        </Toolbar>
      </AppBar>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <ContactForm handleClose={() => setOpen(false)} />
        </Box>
      </Modal>
    </>
  );
}

const mapDispatchToProps = {
  searchuser,
  filterByLabel,
};

export default connect(null, mapDispatchToProps)(Navbar);

