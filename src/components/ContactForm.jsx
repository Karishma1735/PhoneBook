import { Box, TextField, Select, MenuItem, Button, Typography, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import { addcontacts } from '../redux/actions';
import { connect } from 'react-redux';
import ImageUploader from '../utils/Imageuploader';
import CloseIcon from '@mui/icons-material/Close';

function ContactForm({ addcontacts, editingcontact, handleClose,contacts }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: "",
    label: "",
    image: "",
  });

  const [showAlert, setShowAlert] = useState(false);

const [error, setError] = useState("");
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = () => {
    if (!form.name || !form.contact) {
      setShowAlert(true);
      return;
    }
     if (!/^\d{10}$/.test(form.contact)) {
    setError("Phone number must be 10 digits");
    setShowAlert(true);
    return;
  }

    const contactExists = contacts.find(
    (c) => c.contact === form.contact
  );

  if (contactExists) {
    setError("Contact already exists");
    setShowAlert(true);
    return;
  }

    addcontacts({
      id: Date.now(),
      bookmarked: false,
      ...form,
    });
    handleClose();
    setForm({ name: "", contact: "", address: "", label: "", image: "" });
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
        name="address"
        label="Address"
        variant="outlined"
        value={form.address}
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
      <ImageUploader
        onUpload={(imgData) => setForm({ ...form, image: imgData.imageUrl, imagePublicId: imgData.imagePublicId })}
        sx={{ marginBottom: 2 }}
      />
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
