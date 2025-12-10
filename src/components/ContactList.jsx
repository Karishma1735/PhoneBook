import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ContactItem from "./ContactItem";
import { Box, Button, Typography } from "@mui/material";
import { useMemo } from 'react';
import { fetchContacts } from '../redux/actions';

function ContactList({ contacts, search, filtering, fetchContacts }) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const contactPerPage = 5;

  const validContacts = Array.isArray(contacts) ? contacts : [];
  const labelFiltered = filtering
    ? validContacts.filter((c) => c.label === filtering)
    : validContacts;

  const filteredContacts = labelFiltered.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortedContacts = useMemo(() => {

    const sorted = [...filteredContacts].sort((a, b) => {
      if (a.bookmarked !== b.bookmarked) {
        return a.bookmarked ? -1 : 1;
      }
      const nameComparison = a.name.localeCompare(b.name);
      if (nameComparison !== 0) return nameComparison;
      const updatedAtComparison = new Date(b.updatedAt) - new Date(a.updatedAt); 
      if (updatedAtComparison !== 0) return updatedAtComparison;

      return 0;
    });
    return sorted;
  }, [filteredContacts]);

  const lastIndex = contactPerPage * currentPage;
  const firstIndex = lastIndex - contactPerPage;
  const currentContacts = sortedContacts.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(sortedContacts.length / contactPerPage);
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);
  useEffect(() => {
  console.log("Redux contacts =>", contacts);
}, [contacts]);


  return (
    <Box>
      <Typography sx={{ mt: 2, color: "grey", ml: 2 }}>
        Contacts ({validContacts.length})
      </Typography>
      
      {currentContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        currentContacts.map((c) => <ContactItem key={c._id} contact={c} />)
      )}

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 2 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <Button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                variant={pageNumber === currentPage ? "contained" : "outlined"}
                sx={{
                  fontWeight: "bold",
                  color: pageNumber === currentPage ? "white" : "black",
                }}
              >
                {pageNumber}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  contacts: state.contactsData.contacts,
  search: state.contactsData.search,
  filtering: state.contactsData.filtering,
});

const mapDispatchToProps = {
  fetchContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
