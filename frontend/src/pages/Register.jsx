import {FaUser} from 'react-icons/fa'
import {useState , useEffect} from 'react'
import { toast } from 'react-toastify'
import {useSelector , useDispatch} from 'react-redux'
import { register , reset } from '../features/auth/authSlice'
import {useNavigate} from "react-router-dom"
import Spinner from '../components/Spinner'


function Register() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user , isLoading , isSuccess , message , isError} = useSelector(state => state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    // Redirect when logged in
    if(isSuccess || user){
      navigate("/")
    }

    dispatch(reset())

  },[user , isLoading , isSuccess , message , isError , navigate])

  const [formData , setFormData] = useState({
    name : "",
    email : "",
    password : "",
    password2 : "",
  })


    const {name , email , password , password2} = formData

  const onSubmit = (e)=>{
    e.preventDefault()
    if(password !== password2){
      toast.error('Passwords not match', {
        position: "top-center",
        autoClose: 1000
      })
    }else{
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))

    }

    

  }

  const onChange = (e)=>{
    
    setFormData((prevState) =>(
      {
        ...prevState,
        [e.target.name] : e.target.value
      }
    ))
  }
 
 if(isLoading){
  return (
    <Spinner/>
  )
 }

 
  return (
    <>
    <section className="heading">
        <h1>
            <FaUser/> Register 
        </h1>
        <p>Please Create An Account</p>
    </section>
    
    <form onSubmit={onSubmit}>
        <div className="form-group">
            <input type="text" 
            className='form-control'
            id='name'
            value={name}
            onChange={onChange}
            placeholder = 'Enter Your Name'
            name='name'
            required/>
        </div>
        <div className="form-group">
            <input type="email" 
            className='form-control'
            id='email'
            value={email}
            onChange={onChange}
            placeholder = 'Enter Your Email'
            name='email'
            required/>
        </div>
        <div className="form-group">
            <input type="password" 
            className='form-control'
            id='password'
            value={password}
            onChange={onChange}
            placeholder = 'Enter Your Password'
            name='password'
            required/>
        </div>
        <div className="form-group">
            <input type="password" 
            className='form-control'
            id='password2'
            value={password2}
            onChange={onChange}
            placeholder = 'Confirm Your Password'
            name='password2'
            required/>
        </div>
        <button className="btn btn-block">Register</button>
    </form>
    
    </>
  )
}

export default Register