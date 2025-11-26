import { Box, TextField, Select, MenuItem, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { addcontacts, updateContact } from '../redux/actions';
import { connect } from 'react-redux';
function ContactForm({ addcontacts ,editingcontact,updateContact}) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: "",
    label: "",
    image:"",
  });

  useEffect(() => {
    if (editingcontact) {
      setForm({
        name: editingcontact.name,
        contact: editingcontact.contact,
        address:editingcontact.address,
        label:editingcontact.label
      });
    }
  }, [editingcontact]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    if (editingcontact) {
      updateContact({
        id: editingcontact.id,
        ...form
      });
    } else {
      addcontacts({
        id: Date.now(),
        ...form
      });
    }
    setForm({ name: "", contact: "",address:"",label:"" });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",marginTop:5 }}>
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
        name="address"
        label="Address"
        variant="outlined"
        value={form.address}
        onChange={handleChange}
        sx={{ margin: 1 }}
      />
      <Select
        name="label"
        value={form.label}
        onChange={handleChange}
        displayEmpty
        sx={{
            width:"250px"
        }}
      >


        <MenuItem value=""><em>Select Label</em></MenuItem>
        <MenuItem value="Work">Work</MenuItem>
        <MenuItem value="Friend">Friend</MenuItem>
        <MenuItem value="Family">Family</MenuItem>
      </Select>
      <Button onClick={handleSubmit}>{editingcontact?"Update Contact":"Add contact"}</Button>
    </Box>
  );
}

const mapStateToProps = (state)=>({
    editingcontact:state.contactsData.editingcontact
})
const mapDispatchToProps = {
  addcontacts, 
  updateContact
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);










