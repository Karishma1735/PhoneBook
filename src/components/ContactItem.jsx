import React, { useState } from 'react'
import { Typography, Box, Button, Modal, TextField, Select, MenuItem } from '@mui/material'
import { connect } from 'react-redux'
import { deleteContact, editcontact } from '../redux/actions'

function ContactItem({contact,deleteContact,editcontact}) {

const [open , setOpen] = useState(false)
const handleclick = () => {
  if (!open) {
    setOpen(true);
    console.log("open");
  } else {
    setOpen(false);
    console.log("close");
  }
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  return (
    <Box sx={{ display:"flex",justifyContent:"space-around",boxShadow: 1,margin:2,padding:3,fontFamily:"sans-serif",fontSize:"20px"}}>
      <Typography>{contact.name}</Typography>
      <Typography>{contact.contact}</Typography>
      <Typography>{contact.label}</Typography>
       <Typography>{contact.address}</Typography>
<Button onClick={()=>editcontact(contact)} sx={{border:2}}>Edit</Button>
      <Button onClick={()=>deleteContact(contact.id)} sx={{border:2 , color:"red"}}>Delete</Button>
    </Box>
  )
}

const mapDispatchToProps ={
    deleteContact,
   editcontact
}
export default connect(null,mapDispatchToProps)(ContactItem)

