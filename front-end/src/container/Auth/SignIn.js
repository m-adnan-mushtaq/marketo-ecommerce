import { useDispatch} from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Form, FormGroup,Label,FormFeedback} from "reactstrap"
import { setUserCredentials } from "store/actionCreator"
import { useSignInMutation } from "store/api/authApiSlice"
import AuthWrapper from "components/Auth/AuthWrapper"
import CustomInput from "components/Form/CustomInput"
import LoadingButton from "components/UI/LoadingButton"
import useValidation from "hooks/useValidation"
const SignIn = () => {
  const [email, changeEmail, isEmailValid] = useValidation()
  const [password, changePassword, isPasswordValid] = useValidation()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [signIn,{isLoading}]=useSignInMutation()
  //function that  handle login
  const submitHandler=async e=>{
    e.preventDefault()
    try {
      if(!isEmailValid || !isPasswordValid || isLoading) return 
      //get result
      const result=await signIn({
        email,password
      }).unwrap()
      dispatch(setUserCredentials({
        token:result.accessToken,
        user:result.user
      }))
      //persist the user data
      const role= result.user?.role
      if(role === 'CUSTOMER') navigate('/shop/cart')
      else navigate('/admin')
      localStorage.setItem('persist',true)
    } catch (error) {
      // console.log(error.message)
      toast.error('Invalid Credentials or Network Error')
    }
  }
  return (
    <AuthWrapper>
      <h1 className="fw-bold text-primary text-center my-2">Welcome Back!</h1>
      <Form onSubmit={submitHandler} >
      <FormGroup>
          <Label>Your Email</Label>
          <CustomInput 
          type='email'
          value={email}
          handleChange={changeEmail}
          isValid={isEmailValid}
          />
        <FormFeedback>Enter a valid email address "example@gmail.com" </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label>Your Password</Label>
          <CustomInput 
          type='password'
          value={password}
          handleChange={changePassword}
          isValid={isPasswordValid}
          />
          <FormFeedback>Password should be 6 characters long!</FormFeedback>
        </FormGroup>
        <div className="text-center">
        <LoadingButton
          disabled={ !isEmailValid || !isPasswordValid || !email || !password}
          loading={isLoading}
          addons={{
            color:'primary',
            className:'bg-primary px-5 text-light'
          }}
          >
            Sign In
          </LoadingButton>
        </div>
        <p className="text-center mt-2">
          Not have an account Yet? <Link className="link-primary" to='/sign-up'>Sign Up</Link>
        </p>
      </Form>
    </AuthWrapper>
  )
}

export default SignIn