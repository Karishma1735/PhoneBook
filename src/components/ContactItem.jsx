import React, { useState } from 'react';
import { Typography, Box, Button, Modal, TextField, Select, MenuItem, Avatar, Tooltip, Snackbar, Alert } from '@mui/material';
import { connect } from 'react-redux';
import { deleteContact, toggleBookmark, updateContact } from '../redux/actions';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from 'axios';
import ImageUploader from '../utils/Imageuploader';

const phoneRegex = /^[+]?[0-9]{10,15}$/;

function ContactItem({ contact, deleteContact, updateContact, toggleBookmark }) {
  const [open, setOpen] = useState(false);
  
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: contact.name,
    contact: contact.contact,
    adress: contact.adress,
    label: contact.label,
    image: contact.image || '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');

   const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
   const handleImageUpload = ({ imageUrl, imagePublicId }) => {
    setEditForm({ ...editForm, image: imageUrl });
  };
 

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
   if (!phoneRegex.test(editForm.contact)) {
    setSnackbarMessage('Please enter a valid phone number');
    setSnackbarOpen(true);
    return;
  }
        setConfirmationModalOpen(true);
  };
const handleConfirmSave = (e) => {
  e.stopPropagation()
    updateContact({ ...editForm, _id: contact._id });
    setOpen(false);
    setConfirmationModalOpen(false); 
  };

  const handleCancelSave = (e) => {
    e.stopPropagation()
    setConfirmationModalOpen(false);
    setOpen(false)
  };
  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(contact.id);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
      setEditForm({ ...contact });
    setOpen(true);
  };

  const handleViewOpen = () => setViewOpen(true);
  const handleViewClose = () => setViewOpen(false);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleDeleteOpen = (e) => {
    e.stopPropagation();
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteContact(contact._id);
    setDeleteOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        // gap:10,
        boxShadow: 1,
        justifyContent: 'space-between',
        padding: 3,
        fontFamily: 'sans-serif',
        fontSize: '20px',
      }}
      onClick={handleViewOpen}
    >


      <Avatar src={contact.image} alt={contact.name} sx={{margin:3, width: 56, height: 56 }} />
      <Typography sx={{ margin: 3,marginLeft:10,width:90}}>{contact.name||"NA"}</Typography>
      <Typography sx={{ margin: 3 ,width:90}}>{contact.contact||"NA"}</Typography>
      <Typography sx={{ margin: 3 ,width:90}}>{contact.adress||"NA"}</Typography>
      <Typography sx={{ margin: 3,width:90 }}>{contact.label||"NA"}</Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
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
          onClick={handleDeleteOpen}
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
                      <Snackbar
  open={snackbarOpen}
  autoHideDuration={6000}
  onClose={(e) => {
    e.stopPropagation(),
    setSnackbarOpen(false)}}
         sx={{
        position: 'absolute',
        top:"-25rem",
        left: '10rem',
        transform: 'translateX(-50%)',

      }}
>
  <Alert onClose={(e) => {
    e.stopPropagation()
    setSnackbarOpen(false)}} severity="error" sx={{ width: '100%' }}>
    {snackbarMessage}
  </Alert>
  </Snackbar>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Edit Contact
          </Typography>

         <Box sx={{ position: 'relative', display: 'inline-block' }}>
  {editForm.image && (
    <Avatar 
      src={editForm.image} 
      alt="Preview" 
      sx={{ width: 80, height: 80, mb: 2 }}
    />
  )}

  <Button 
    variant="outlined" 
    component="label" 
    sx={{
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '50%',
      color: 'white',
      padding: '3px',
      zIndex: 1,
      minWidth: 'unset',
      height: 'auto',
      width: 'auto', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ModeEditIcon sx={{ fontSize: 24 }} />
    <Box sx={{ display: 'none' }}>
  <ImageUploader onUpload={handleImageUpload} />
</Box>
  </Button>
</Box>



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
            name='adress'
            value={editForm.adress}
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


<Modal open={confirmationModalOpen} onClose={handleCancelSave}>
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
  >

    <Typography variant="h6" sx={{ mb: 2 }}>
      Are you sure you want to update this contact?
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="outlined"
        color="error"
        onClick={handleCancelSave} 
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirmSave} 
      >
        Confirm
      </Button>
    </Box>
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
          <Avatar
            src={contact.image}
            alt={contact.name}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography sx={{ mb: 2 }}>
            <strong>Name:</strong> {contact.name}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <strong>Contact:</strong> {contact.contact}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <strong>Address:</strong> {contact.adress}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <strong>Label:</strong> {contact.label}
          </Typography>
          <Button variant='contained' fullWidth onClick={handleViewClose}>
            Close
          </Button>
        </Box>
      </Modal>

      <Modal open={deleteOpen} onClose={handleDeleteClose}>
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
        >
          <Typography variant='h6' sx={{ mb: 2 }}>
            Are you sure you want to delete {contact.name} contact?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='outlined' color='error' onClick={(e) => {
              e.stopPropagation();
              handleDeleteClose();
            }}>
              Cancel
            </Button>
            <Button variant='contained' color='error' onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </Box>
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
