import FormLayout from '../../Layouts/Form/FormLayout'
import SignupForm from '../../components/Forms/Signup/SignupForm'
import Navbar from '../../components/Navbar/Navbar'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <>
      <Navbar />
      <FormLayout>
        <Typography variant="h5">Signup</Typography>
        <SignupForm/>
        <p>
          Already Registered? <Link to="/login">Login</Link>
        </p>
      </FormLayout>
    </>
  )
}

export default Signup
