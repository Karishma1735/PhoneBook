
import React, { useState } from 'react';
import { Typography, Box, Button, Modal, TextField, Select, MenuItem, Avatar, Tooltip } from '@mui/material';
import { connect } from 'react-redux';
import { deleteContact, toggleBookmark, updateContact } from '../redux/actions';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from 'axios';

function ContactItem({ contact, deleteContact, updateContact, toggleBookmark }) {
  console.log(contact, 'contact');

  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false); 
  const [editForm, setEditForm] = useState({
    name: contact.name,
    contact: contact.contact,
    address: contact.address,
    label: contact.label,
    image: contact.image || '',
  });

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateContact({ ...editForm, id: contact.id, image: contact.image });
    setOpen(false);
  };

  const handleBookmark = (e) => {
    e.stopPropagation()
    toggleBookmark(contact.id);
  };

  const handleOpen = (e) => {
    e.stopPropagation(); 
    setOpen(true);
  };

  const handleViewOpen = () => setViewOpen(true); 
  const handleViewClose = () => setViewOpen(false);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };


const handleDelete = async (e) => {
  e.stopPropagation();

  try {
    if (contact.imagePublicId) {
      const cloudinaryDeleteUrl = `https://api.cloudinary.com/v1_1/dtvwypwen/image/destroy`;
      const data = {
        public_id: contact.imagePublicId,
        api_key: "874245128391472",
        timestamp: Math.floor(Date.now() / 1000),
      };

      console.log(contact.imagePublicId, "public id coming");
      console.log("Request Data:", data);

      const response = await axios.post(cloudinaryDeleteUrl, data, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      console.log(response.data, "response from Cloudinary");
      console.log('Image deleted from Cloudinary');
    }
    deleteContact(contact.id);
  } catch (error) {
    console.error('Error deleting contact or image:', error);
  }
};


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        boxShadow: 1,
        margin: 2,
        padding: 3,
        fontFamily: 'sans-serif',
        fontSize: '20px',
      }}
      onClick={handleViewOpen}
    >
      <Avatar src={contact.image} alt={contact.name} sx={{ width: 56, height: 56 }} />
      <Typography sx={{ margin: 3 }}>{contact.name}</Typography>
      <Typography sx={{ margin: 3 }}>{contact.contact}</Typography>
      <Typography sx={{ margin: 3 }}>{contact.address}</Typography>
      <Typography sx={{ margin: 3 }}>{contact.label}</Typography>

      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
        <Button onClick={handleOpen}>
          <Tooltip
            title='Edit'
            componentsProps={{
              tooltip: {
                sx: {
                  padding: 2,
                  fontSize: '20px',
                  font: 'bold',
                },
              },
            }}
          >
            <ModeEditIcon color='#000000' />
          </Tooltip>
        </Button>
        <Button
          color='error'
          onClick={(e) => {
            e.stopPropagation(); 
            deleteContact(contact.id);
          }}
          // onClick={handleDelete}
        >
          <Tooltip
            title='Delete'
            componentsProps={{
              tooltip: {
                sx: {
                  padding: 2,
                  fontSize: '20px',
                  font: 'bold',
                },
              },
            }}
          >
            <DeleteOutlineIcon color='error' />
          </Tooltip>
        </Button>
        <Button onClick={handleBookmark}>
          <Tooltip
            title='Bookmark'
            componentsProps={{
              tooltip: {
                sx: {
                  padding: 2,
                  fontSize: '20px',
                  font: 'bold',
                },
              },
            }}
          >
            {contact.bookmarked ? (
              <BookmarkIcon sx={{ color: '#FFDB58' }} />
            ) : (
              <BookmarkBorderIcon sx={{ color: '#000000' }} />
            )}
          </Tooltip>
        </Button>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 400,
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          onClick={handleModalClick}
        >
          <Typography variant='h6' sx={{ mb: 2 }}>
            Edit Contact
          </Typography>
          <TextField
            fullWidth
            label='Name'
            name='name'
            value={editForm.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label='Contact'
            name='contact'
            value={editForm.contact}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label='Address'
            name='address'
            value={editForm.address}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Select
            fullWidth
            name='label'
            value={editForm.label}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value='Work'>Work</MenuItem>
            <MenuItem value='Friend'>Friend</MenuItem>
            <MenuItem value='Family'>Family</MenuItem>
          </Select>
          <Button variant='contained' fullWidth onClick={handleSave}>
            Update Contact
          </Button>
        </Box>
      </Modal>

      <Modal open={viewOpen} onClose={handleViewClose}>
        <Box
          sx={{
            width: 400,
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          onClick={handleModalClick}
        >
          <Typography variant='h6' sx={{ mb: 2 }}>
            Contact Details
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <strong>Name:</strong> {contact.name}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <strong>Contact:</strong> {contact.contact}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <strong>Address:</strong> {contact.address}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <strong>Label:</strong> {contact.label}
          </Typography>
          <Avatar
            src={contact.image}
            alt={contact.name}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Button variant='contained' fullWidth onClick={handleViewClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

const mapDispatchToProps = {
  deleteContact,
  updateContact,
  toggleBookmark,
};

export default connect(null, mapDispatchToProps)(ContactItem);

