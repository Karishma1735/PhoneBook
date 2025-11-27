import React from "react";
import { connect } from "react-redux";
import ContactItem from "./ContactItem";
function ContactList({ contacts }) {
  const sortedContacts = contacts.sort((a, b) => b.bookmarked - a.bookmarked);
  return (
    <div>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        sortedContacts.map((c) => <ContactItem key={c.id} contact={c} />)
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  contacts: state.contactsData.contacts,
});
export default connect(mapStateToProps)(ContactList)









