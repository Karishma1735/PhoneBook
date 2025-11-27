import React from "react";
import { connect } from "react-redux";
import ContactItem from "./ContactItem";

function ContactList({ contacts, search ,filtering}) {
   console.log('Current filtering value:', filtering);
    const labelFiltered = filtering
    ? contacts.filter((c) => c.label === filtering)
    : contacts
  const filteredContacts = labelFiltered.filter((c) => c.name.includes(search));

  const sortedContacts = filteredContacts.sort((a, b) => b.bookmarked - a.bookmarked);

  return (
    <div>
      {sortedContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        sortedContacts.map((c) => <ContactItem key={c.id} contact={c} />)
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  contacts: state.contactsData.contacts,
  search: state.contactsData.search,
  filtering:state.contactsData.filtering
});

export default connect(mapStateToProps)(ContactList);
