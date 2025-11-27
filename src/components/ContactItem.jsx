import React, { useState } from 'react'
import { Typography, Box, Button, Modal, TextField, Select, MenuItem } from '@mui/material'
import { connect } from 'react-redux'
import { deleteContact, editcontact } from '../redux/actions'

function ContactItem({contact,deleteContact,editcontact}) {

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

