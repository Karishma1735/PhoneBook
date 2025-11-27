import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
import ContactForm from "../components/ContactForm";
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
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
        >
          <Typography variant="h6">Phonebook</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen(true)}
            sx={{ textTransform: "none" }}
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
export default Navbar;






