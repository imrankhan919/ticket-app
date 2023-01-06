import {useState , useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {useSelector , useDispatch} from 'react-redux'
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import {login , reset} from "../features/auth/authSlice"
import Spinner from '../components/Spinner'

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const {user , isLoading , isError , isSuccess , message} = useSelector(state => state.auth)


  const [formData , setFormData] = useState({
    email : "",
    password : "",
  })


    const { email , password , } = formData

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

  

  const onSubmit = (e)=>{
    e.preventDefault()
    const userData = {
      email,
      password
    }
    
    dispatch(login(userData))
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
   return  <Spinner/>
  }
 

  return (
      <>
      <section className="heading">
          <h1>
              <FaUser/> Login 
          </h1>
          <p>Please Login Here</p>
      </section>
      
      <form onSubmit={onSubmit}>
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
          <button className="btn btn-block">Login</button>
      </form>
      
      </>
    )
}

export default Login