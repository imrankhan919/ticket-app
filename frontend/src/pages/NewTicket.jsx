import {useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createTicket , reset} from "../features/ticket/ticketSlice"
import Spinner from "../components/Spinner"
import BackButton from '../components/BackButton'

function NewTicket() {
  


  const {user} = useSelector(state => state.auth)
  const {isLoading , isError , isSuccess , message} = useSelector(state => state.ticket)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product , setProduct] = useState('iPhone')
  const [description , setDescription] = useState('') 


  useEffect(()=>{

    if(isError){
      toast.error(message)
    }

    if(isSuccess){
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())

  },[dispatch , isError , isSuccess , navigate , message])


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({product , description}))
  }

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
    <BackButton url={"/"}/>
    <section className="heading">
      <h1>Create New Ticket</h1>
      <p>Please Fill Out The Form Here</p>
    </section>

    <section className="form">
      <div className="form-group">
        <label htmlFor="name">Customer Name</label>
        <input type="text" className='form-control' value={name} disabled/>
      </div>
      <div className="form-group">
        <label htmlFor="name">Customer Email</label>
        <input type="email" className='form-control' value={email} disabled/>
      </div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="product">Select Product</label>
        <select name="product" id="product" value={product} onChange={(e)=>setProduct(e.target.value)}>
          <option value="iPhone">iPhone</option>
          <option value="iPad">iPad</option>
          <option value="Macbook">Macbook</option>
          <option value="iMac">iMac</option>
        </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Describe Your Issue Here</label>
          <textarea name="description" id="description" onChange={(e)=>setDescription(e.target.value)}></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type='submit'>Raise Ticket</button>
        </div>
      </form>
    </section>
    
    
    </>

  )
}

export default NewTicket