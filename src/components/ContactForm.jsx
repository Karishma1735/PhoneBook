import { Box, TextField, Select, MenuItem, Button, Typography, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import { addcontacts } from '../redux/actions';
import { connect } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

function ContactForm({ addcontacts, editingcontact, handleClose,contacts }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    adress: "",
    label: "",
    image: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
const [error, setError] = useState("");
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async() => {
  if (!form.name || !form.contact) {
    setShowAlert(true);
    setError("Name and Contact are required!");
    return;
  }

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("contact", form.contact);
  formData.append("adress", form.adress);
  formData.append("label", form.label || "");
  if (selectedFile) {
    formData.append("image", selectedFile);
  }
  try {
    await addcontacts(formData); 
    handleClose();
    setForm({ name: "", contact: "", adress: "", label: "", image: "" });
    setSelectedFile(null);

  } catch (err) {
  const msgs = err?.response?.data?.messages;
  console.log(err?.response?.data);
  
  setError(msgs ? msgs.join("\n") : "Something went wrong!");
  setShowAlert(true);
}
};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        p: 3,
        maxWidth: 400,
        borderRadius: 2,
      }}
    >
      <CloseIcon
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          cursor: 'pointer',
          color: 'gray',
        }}
      />
      <Typography variant="h6" sx={{ mb: 2 }}>Add Contact</Typography>

      {showAlert && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          Name and Contact are required fields!
        </Alert>
      )}

      <TextField
        name="name"
        label="Name"
        variant="outlined"
        value={form.name}
        onChange={handleChange}
        sx={{ marginBottom: 2, width: '100%' }}
      />

      <TextField
        name="contact"
        label="Contact"
        variant="outlined"
        value={form.contact}
        onChange={handleChange}
        sx={{ marginBottom: 2, width: '100%' }}
      />

      <TextField
        name="adress"
        label="Address"
        variant="outlined"
        value={form.adress}
        onChange={handleChange}
        sx={{ marginBottom: 2, width: '100%' }}
      />

      <Select
        name="label"
        value={form.label}
        onChange={handleChange}
        displayEmpty
        sx={{
          marginBottom: 2,
          width: '100%',
        }}
      >
        <MenuItem value="">
          <em>Select Label</em>
        </MenuItem>
        <MenuItem value="Work">Work</MenuItem>
        <MenuItem value="Friend">Friend</MenuItem>
        <MenuItem value="Family">Family</MenuItem>
      </Select>
      <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
  <Button
    variant="outlined"
    component="label"
    sx={{ width: "100%" }}
  >
    Upload Image
    <input
      type="file"
      accept="image/*"
      hidden
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
      }}
    />
  </Button>
  {selectedFile && (
    <Typography sx={{ mt: 1 }}>{selectedFile.name}</Typography>
  )}
</Box>

 <Snackbar
  open={showAlert}
  autoHideDuration={3000}
  onClose={() => setShowAlert(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert severity="error" variant="filled" onClose={() => setShowAlert(false)}>
    {error}
  </Alert>
</Snackbar>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
        }}
      >
        {editingcontact ? 'Update Contact' : 'Add Contact'}
      </Button>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  editingcontact: state.contactsData.editingcontact,
  contacts:state.contactsData.contacts
});

const mapDispatchToProps = {
  addcontacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
