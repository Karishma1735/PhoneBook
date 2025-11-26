import React from "react";
import { connect } from "react-redux";
import ContactItem from "./ContactItem";
function ContactList({ contacts }) {
  return (
    <div>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        contacts.map((c) => <ContactItem key={c.id} contact={c} />)
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  contacts: state.contactsData.contacts
});
export default connect(mapStateToProps)(ContactList);