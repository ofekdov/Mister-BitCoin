import React from 'react'
import { Link } from 'react-router-dom'


export function ContactPreview({
  contact,
}) {
  const contactStyle = {
    backgroundImage: `url(https://robohash.org/${contact._id}?set=set5)`,
  }
  return (
    <Link to={`/contact/${contact._id}`} style={contactStyle} className="contact-preview">
      <section className="info">
      <h2>{contact.name}</h2>
      <small>{contact.email}</small>
      </section>
    </Link>
  )
}
