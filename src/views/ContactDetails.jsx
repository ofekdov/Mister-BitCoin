import { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TransferFunds } from '../cmps/TransferFunds'
import { useDispatch, useSelector } from 'react-redux'
import { spendBalance, addMove } from '../store/actions/user.actions'
import MoveList from '../cmps/MoveList'
import { removeContact } from '../store/actions/contact.actions'
import {getBitcoinSvg} from '../services/SVG.service'

export function ContactDetails(props) {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const [contact, setContact] = useState(null)

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    if(!user) {
      navigate('/signup')
    }
    loadContact()

  }, [params.id])

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.match.params.id !== props.match.params.id) {
  //     loadContact()
  //   }
  // }

  function onBack() {
    navigate(`/contact`)
  }

  // loadContact = async () => {
  //   try {
  //     const contact = await contactService.getContactById(props.match.params.id)
  //     setState({ contact })
  //   } catch (error) {
  //     console.log('error:', error)
  //   }
  // }
  async function loadContact() {
    try {
      const contact = await contactService.getContactById(params.id)
      setContact(contact)
    } catch (error) {
      console.log('error:', error)
    }
  }

  function onTransferCoins(amount, contact) {
    dispatch(spendBalance(amount))
    dispatch(addMove(contact, amount))
  }

  function onRemoveContact(contactId) {
    try {
      dispatch(removeContact(contactId))
      onBack()
    } catch (error) {
      console.log('error:', error)
    }
  }

  if (!contact || !user) return <div>Loading...</div>
  const moves = user.moves.filter(move => move.toId === contact._id) || []
  const movesTitle = 'Your Transfers'
  return (
    <div className='contact-details-container'>
      <div class="contact-details">
        <div class="images flex">
          <img src={`https://robohash.org/${contact._id}?set=set5`} />
          <TransferFunds contact={contact} maxCoins={user.coins} onTransferCoins={onTransferCoins} />
        </div>
        <MoveList title={movesTitle} moves={moves} />
        <div class="product">
          <p>Contact Details</p>
          <h1>{contact.name}</h1>
          <h2>Age {contact.age}</h2>
          <p class="desc">{contact.email}</p>
          <p class="desc">{contact.phone}</p>
          <button onClick={() => onRemoveContact(contact._id)} className='remove-contact flex auto-center'>Remove Contact</button>
          <div class="buttons">
            <Link to={`/contact/edit/${contact._id}`}><button class="add">
              Edit
              <span
            dangerouslySetInnerHTML={{
              __html: getBitcoinSvg('edit'),
            }}
          />
              </button></Link>
            <button onClick={onBack} class="back">Back to list</button>
          </div>
        </div>
      </div>
    </div>
  )
}
