import React from "react";
import { connect } from "react-redux";
import ContactItem from "./ContactItem";
import { Box, Typography } from "@mui/material";

function ContactList({ contacts, search ,filtering}) {
   console.log('Current filtering value:', contacts.length);
    const labelFiltered = filtering
    ? contacts.filter((c) => c.label === filtering)
    : contacts
  const filteredContacts = labelFiltered.filter((c) => c.name.includes(search));

  const sortedContacts = filteredContacts.sort((a, b) => {
    if(b.bookmarked!==a.bookmarked){
      return b.bookmarked - a.bookmarked
    }
    if (a.name < b.name) return -1; 
    if (a.name > b.name) return 1;   
     return 0
  });

  return (
   
    <Box>
       <Typography sx={{mt:2 ,color:"grey", ml:2}}>Contacts ({contacts.length})</Typography>
      {sortedContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        sortedContacts.map((c) => <ContactItem key={c.id} contact={c} />)
      )}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  contacts: state.contactsData.contacts,
  search: state.contactsData.search,
  filtering:state.contactsData.filtering
});

export default connect(mapStateToProps)(ContactList);
