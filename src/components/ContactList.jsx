import React, { useState } from "react";
import { connect } from "react-redux";
import ContactItem from "./ContactItem";
import { Box, Button, Typography } from "@mui/material";

function ContactList({ contacts, search ,filtering}) {
   console.log('Current filtering value:', contacts.length);
   const [currentPage , setCurrentpage] = useState(1)
   const contactPerPage = 5
    const labelFiltered = filtering
    ? contacts.filter((c) => c.label === filtering)
    : contacts
  const filteredContacts = labelFiltered.filter((c) => c.name.includes(search));

  const sortedContacts = filteredContacts.sort((a, b) => {
    if(b.bookmarked!==a.bookmarked){
      return b.bookmarked - a.bookmarked
    }
    // if (a.name < b.name) return -1; 
    // if (a.name > b.name) return 1;   
    //  return 0

    return a.name.localeCompare(b.name)
  });


  const lastIndex = contactPerPage * currentPage
  const firstIndex = lastIndex- contactPerPage
  const currentContacts = sortedContacts.slice(firstIndex,lastIndex)
  const totalPages = Math.ceil(sortedContacts.length/contactPerPage)

  const handleNext = ()=>{
    if(currentPage<totalPages){
      setCurrentpage(currentPage+1)
    }
  }
const handlePrev = () => {
  if (currentPage > 1) {
    setCurrentpage(currentPage - 1);
    console.log("prev clicked");
  }
};  

  return (
   
    <Box>
       <Typography sx={{mt:2 ,color:"grey", ml:2}}>Contacts ({contacts.length})</Typography>
      {currentContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        currentContacts.map((c) => <ContactItem key={c.id} contact={c} />)
      )}


      <Box sx={{display:"flex",
        justifyContent:"space-between",
        margin:2
      }}>
       

        <Button onClick={handlePrev}
          disabled={currentPage === 1}
          sx={{font:"bold"}}
        >Previous</Button>
         <Box component="span" sx={{marginTop:1}}>
         Page {currentPage} of {totalPages}
        </Box>

        <Button onClick={handleNext} disabled={currentPage === totalPages}

        >Next</Button>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  contacts: state.contactsData.contacts,
  search: state.contactsData.search,
  filtering:state.contactsData.filtering
});

export default connect(mapStateToProps)(ContactList);
