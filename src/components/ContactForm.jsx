import { Box, TextField, Select, MenuItem, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { addcontacts, updateContact } from '../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import {baseUrl} from "../../config"

function ContactForm({ addcontacts ,editingcontact, updateContact, handleClose }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    adress: "",
    label: "",
    image:"",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Phonebook_images');
    formData.append('cloud_name', 'dtvwypwen'); 

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dtvwypwen/image/upload`, formData);
      setForm({ ...form, image: response.data.secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async() => {
    try {
       const formdata = {
      name:form.name,
      contact:form.contact,
      adress:form.adress,
      label:form.label,
      image:form.image

    }
    const response = await axios.post(`${baseUrl}/user`,formdata)
    console.log(response.data);
    addcontacts(response.data);
    handleClose();
    
    } catch (error) {
      console.log("Error fetching api")
    }

    setForm({ name: "", contact: "", adress: "", label: "", image: "" });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <Typography>Add Contact</Typography>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        value={form.name}
        onChange={handleChange}
        sx={{ margin: 1 }}
      />
      <TextField
        name="contact"
        label="Contact"
        variant="outlined"
        value={form.contact}
        onChange={handleChange}
        sx={{ margin: 1 }}
      />
      <TextField
        name="adress"
        label="Address"
        variant="outlined"
        value={form.adress}
        onChange={handleChange}
        sx={{ margin: 1 }}
      />
      <Select
        name="label"
        value={form.label}
        onChange={handleChange}
        displayEmpty
        sx={{
            width: "250px"
        }}
      >
        <MenuItem value=""><em>Select Label</em></MenuItem>
        <MenuItem value="Work">Work</MenuItem>
        <MenuItem value="Friend">Friend</MenuItem>
        <MenuItem value="Family">Family</MenuItem>
      </Select>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ margin: '10px' }}
      />
  
      <Button onClick={handleSubmit}>
        {editingcontact ? "Update Contact" : "Add Contact"}
      </Button>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  editingcontact: state.contactsData.editingcontact,
});

const mapDispatchToProps = {
  addcontacts, 
  updateContact
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
