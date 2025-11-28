import React, { useEffect, useState } from 'react'
import { Typography, Box, Button, Modal, TextField, Select, MenuItem, Avatar } from '@mui/material'
import { connect } from 'react-redux'
import { deleteContact, toggleBookmark, updateContact } from '../redux/actions'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { baseUrl } from '../../config';
import axios from 'axios';

function ContactItem({ contact, deleteContact, updateContact, toggleBookmark }) {
  const [open, setOpen] = useState(false); 
  const [editForm, setEditForm] = useState({
    name: contact.name,
    contact: contact.contact,
    adress: contact.adress,
    label: contact.label,
    image:contact.image||""
  });

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

 const handleSave = async () => {
  try {

    const response = await axios.put(`${baseUrl}/edituser/${contact._id}`, editForm);
      updateContact({
        _id:contact._id,
        ...editForm});
      setOpen(false); 
      console.log('updated contacts',response);
 
  } catch (error) {
    console.error('Error updating contact:', error);
  }
};


  const handleBookmark = () => {
    toggleBookmark(contact._id);
  };


   const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/deleteusers/${contact._id}`);
   
      deleteContact(contact._id);
      console.log('Contact deleted');
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleOpen = () => setOpen(true); 
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", boxShadow: 1, margin: 2, padding: 3, fontFamily: "sans-serif", fontSize: "20px" }}>
      <Avatar
        src={contact.image}
        alt={contact.name}
        sx={{ width: 56, height: 56 }}
      />
      <Typography sx={{margin:3}}>{contact.name}</Typography>
      <Typography sx={{margin:3}}>{contact.contact}</Typography>
      <Typography sx={{margin:3}}>{contact.adress||"NA"}</Typography>
      <Typography sx={{margin:3}}>{contact.label}</Typography>

      <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
        <Button onClick={handleOpen}>
          <ModeEditIcon color="#000000" />
        </Button>
        <Button color="error" onClick={handleDelete}>
          <DeleteOutlineIcon color="error" />
        </Button>
        <Button onClick={handleBookmark}>
          <BookmarkIcon color={contact.bookmarked ? "secondary" : "primary"} />
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit Contact
          </Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={editForm.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Contact"
            name="contact"
            value={editForm.contact}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Address"
            name="adress"
            value={editForm.adress}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Select
            fullWidth
            name="label"
            value={editForm.label}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Friend">Friend</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
          </Select>
          <Button variant="contained" fullWidth onClick={handleSave}>
            Update Contact
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

const mapDispatchToProps = {
  deleteContact,
  updateContact,
  toggleBookmark
};

export default connect(null, mapDispatchToProps)(ContactItem);

