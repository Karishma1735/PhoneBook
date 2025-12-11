import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import ContactItem from "./ContactItem";
import { Box, Button, Typography } from "@mui/material";
import { fetchContactsPage } from "../redux/actions";

function ContactList({ contacts, search, filtering, totalPages, fetchContactsPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchContactsPage(currentPage, 5); 
  }, [fetchContactsPage, currentPage]);

  
  const filteredContacts = useMemo(() => {
    let validContacts = Array.isArray(contacts) ? contacts : [];
    if (filtering) validContacts = validContacts.filter(c => c.label === filtering);
    if (search) validContacts = validContacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    return validContacts;
  }, [contacts, search, filtering]);

const sortedContacts = useMemo(() => {
  return [...filteredContacts].sort((a, b) => {
    const aBookmarked = a.bookmarked || false;
    const bBookmarked = b.bookmarked || false;
    if (aBookmarked !== bBookmarked) return aBookmarked ? -1 : 1;
    const nameComparison = a.name.localeCompare(b.name);
    if (nameComparison !== 0) return nameComparison;

    const aUpdatedAt = a.updatedAt || new Date().toISOString();
    const bUpdatedAt = b.updatedAt || new Date().toISOString();
    return new Date(bUpdatedAt) - new Date(aUpdatedAt);
  });
}, [filteredContacts]);


  const handlePageClick = page => setCurrentPage(page);

  return (
    <Box>
      <Typography sx={{ mt: 2, color: "grey", ml: 2 }}>
        Contacts ({contacts.length})
      </Typography>

      {sortedContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        sortedContacts.map(c => <ContactItem key={c._id} contact={c} />)
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <Button
              key={page}
              onClick={() => handlePageClick(page)}
              variant={page === currentPage ? "contained" : "outlined"}
            >
              {page}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}

const mapStateToProps = state => ({
  contacts: state.contactsData.contacts,
  totalPages: state.contactsData.totalPages,
  search: state.contactsData.search,
  filtering: state.contactsData.filtering,
});

const mapDispatchToProps = { fetchContactsPage };

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
