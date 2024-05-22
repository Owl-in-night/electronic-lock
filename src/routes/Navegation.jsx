import { Route, Routes } from 'react-router-dom'
import Home from '../pages/app'
import SignIn from '../pages/sign-in'
import SignUp from '../pages/sign-up'
//import { AuthProvider } from '../../context/authContext'

function Navegation () {
  return (
    <div className='Navegation'>
      {/*<AuthProvider>*/}
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/App' element={<Home />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      {/*</AuthProvider>*/}
    </div>
  )
}
export default Navegation
