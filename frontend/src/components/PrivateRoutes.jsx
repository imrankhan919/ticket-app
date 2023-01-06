import {Navigate , Outlet} from 'react-router-dom'
import Spinner from './Spinner'
import { useAuthStatus } from '../hooks/userAuthStatus'

const PrivateRoutes = () => {
  const {loggedIn , checkingStatus} = useAuthStatus()
  
  if(checkingStatus){
    return Spinner
  }

  return loggedIn ? <Outlet/> : <Navigate to={'/login'}/>
  
}

export default PrivateRoutes