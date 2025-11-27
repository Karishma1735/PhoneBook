import React, { useState } from 'react'
import { Typography, Box, Button, Modal, TextField, Select, MenuItem, Avatar } from '@mui/material'
import { connect } from 'react-redux'
import { deleteContact, toggleBookmark, updateContact } from '../redux/actions'
import BookmarkIcon from '@mui/icons-material/Bookmark';



function ContactItem({ contact, deleteContact, updateContact,toggleBookmark }) {
  console.log("contact", contact)
  const [open, setOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: contact.name,
    contact: contact.contact,
    address: contact.address,
    label: contact.label,
  });
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    updateContact({ ...editForm, id: contact.id });
    setOpen(false);
  };
  const handleBookmark = ()=>{
    toggleBookmark(contact.id)
  }
  const handleOPen = ()=>setOpen(true)
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", boxShadow: 1, margin: 2, padding: 3, fontFamily: "sans-serif", fontSize: "20px" }}>
      <Avatar
        src={contact.image}
        alt={contact.name}
        sx={{ width: 56, height: 56 }}
      />
      <Typography>{contact.name}</Typography>
      <Typography>{contact.contact}</Typography>
      <Typography>{contact.label}</Typography>
      <Typography>{contact.address}</Typography>
       <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
        <Button variant="contained" onClick={handleOPen}>
        Edit
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => deleteContact(contact.id)}
        >
          Delete
        </Button>
         <Button
          onClick={handleBookmark}
        >
          <BookmarkIcon   

          color={contact.bookmarked ? "secondary" : "primary"}
         />
        
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
            Edit
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
            name="address"
            value={editForm.address}  
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
  )
}

const mapDispatchToProps = {
  deleteContact,
  updateContact,
  toggleBookmark
}
export default connect(null, mapDispatchToProps)(ContactItem)



