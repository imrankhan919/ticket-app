import {useSelector , useDispatch} from 'react-redux'
import {getTicket} from "../features/ticket/ticketSlice"
import {createNote , getNotes , reset as noteReset} from "../features/notes/noteSlice"
import { useParams } from 'react-router-dom'
import { useEffect , useState } from 'react'
import {toast} from 'react-toastify'
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import NoteItem from "../components/NoteItem"
import { closeTicket } from '../features/ticket/ticketSlice'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'

function Ticket() {
  
    const customStyles = {
        content: {
          width : '600px',
          top : '50%',
          left : '50%',
          right : 'auto',
          bottom : 'auto',
          marginRight : '-50%',
          transform : 'translate(-50% , -50%)',
          position: 'relative'

        },
      };

      Modal.setAppElement('#root')

      const [modalIsOpen , setModalIsOpen] = useState(false)
      const [noteText , SetNoteText] = useState('')

      const openModal = () => {
        setModalIsOpen(true)
      }

      const closeModal = () => {
        setModalIsOpen(false)
      }


      const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({noteText , ticketId}))
        closeModal()
      }



    const {ticket , isLoading , isError , isSuccess , message} = useSelector(state => state.ticket)
    const {notes , isLoading : notesIsLoading} = useSelector(state => state.note)
  
    const {ticketId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    
    
    useEffect(()=>{

        if(isError){
            toast.error(message)
        }

        dispatch(getTicket(ticketId))

        dispatch(getNotes(ticketId))

    },[isError , message , ticketId])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.error("Ticket Closed!!")
        navigate('/tickets')
    }

    if(isLoading || notesIsLoading){
        return <Spinner/>
    }

    if(isError){
        return <h1>Something Went Wrong!!</h1>
    }

    return (
   <div className="ticket-page">
    <header className="ticket-header">
        <BackButton url={'/tickets/'}/>
        <h2>
            Ticket ID : {ticket._id}
        <span className={`status status-${ticket.status}`} >
            {ticket.status}
        </span>
        </h2>
        <h3>Date Submitted : {new Date(ticket.createdAt).toLocaleString('en-IN')}</h3>
        <h3>Product Name : {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
            <h3>Description of issue</h3>
            <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
    </header>

    {
        ticket.status !== 'closed' && (
            <button className='btn' onClick={()=>openModal()}> <FaPlus/> Add Note </button>
        )
    }

    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
        <button className="btn-close" onClick={closeModal}>X</button>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-group">
            <textarea name="noteText" id="noteText" className='form-control' placeholder='Enter Note' value={noteText} onChange={(e)=>SetNoteText(e.target.value)}></textarea>
        </div>
        <div className="form-group">
            <button className="btn" type='submit'>Submit</button>
        </div>
        </form>
    </Modal>

        {
            notes.map(note => <NoteItem key={note._id} note={note} />)
        }


    {
            ticket.status !== 'closed' && (
                <button className='btn btn-block btn-danger' onClick={()=>onTicketClose()}>Close Ticket</button>
            )
        }
   </div>
  )
}

export default Ticket