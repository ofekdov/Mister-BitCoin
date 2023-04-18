import { ContactPreview } from "./ContantPreview"

export function ContactList({ contacts}) {
    return (
        <section className="Contact-list simple-cards-grid">
            {contacts.map(contact =>
                <ContactPreview key={contact._id} contact={contact} />
            )}
        </section>
    )
}
