import { Typography } from '@mui/material'
import React from 'react'
import ContactForm from '../components/ContactForm'
import Navbar from '../components/Navbar'
import ContactItem from '../components/ContactItem'
import ContactList from '../components/ContactList'

function MainPage() {
  return (
    <div>
        <Navbar/>
        <ContactList/>
        
        </div>
  )
}

export default MainPage