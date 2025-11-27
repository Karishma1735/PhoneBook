import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
  import SearchIcon from '@mui/icons-material/Search';
import ContactForm from "../components/ContactForm";
import { filterByLabel, searchuser } from "../redux/actions";
import { connect } from "react-redux";
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
function Navbar({searchuser,filterByLabel}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
        >
          <Typography variant="h6">Phonebook</Typography>
            <TextField
             label="Search"
             onChange={(e)=>searchuser(e.target.value)}
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
              overflow:"hidden",
              bgcolor:"white",
              outline:"none"
              
            }}
            />
      <Select
        label="Label"
        onChange={(e) => filterByLabel(e.target.value)}
        defaultValue=""
        color="white"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Family">Family</MenuItem>
        <MenuItem value="Friends">Friends</MenuItem>
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
  filterByLabel
}
export default connect(null,mapDispatchToProps)(Navbar);






