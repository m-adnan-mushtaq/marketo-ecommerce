import AuthWrapper from "components/Auth/AuthWrapper"
import CustomInput from "components/Form/CustomInput"
import LoadingButton from "components/UI/LoadingButton"
import useValidation from "hooks/useValidation"
import { useState } from "react"
import {  Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Form, FormGroup, Input, Label,  FormFeedback } from "reactstrap"
import { useSignUpMutation } from "store/api/authApiSlice"

const SignUp = () => {
  const navigate = useNavigate()
  const [name, changeName, isNameValid] = useValidation()
  const [email, changeEmail, isEmailValid] = useValidation()
  const [password, changePassword, isPasswordValid] = useValidation()
  const [role,setRole]= useState('CUSTOMER')
  const roleChangeHandler= ({target:{value}}) => setRole(value)
  const [signUp, { isLoading }] = useSignUpMutation()

  const submitHandler = async e => {
    e.preventDefault()
    try {
        if (!isNameValid || !isEmailValid || !isPasswordValid || isLoading) return

        const result = await signUp({
            name, email, password, role
        }).unwrap()
        if (!result.success) throw Error('something went wrong!')
        navigate('/sign-in')
        toast.success('Successfully created account!')

    } catch (error) {
        // console.log(error?.data.error)
        toast.error(error?.data?.error || 'Invalid Credentials!')

    }
}
  return (
    <AuthWrapper>
      <h1 className="fw-bold text-primary text-center my-2">Join Us Today!</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label>Your Name</Label>
          <CustomInput 
          type='name'
          value={name}
          handleChange={changeName}
          isValid={isNameValid}
          />
          <FormFeedback>Use only letters [aA-zZ] and spaces and should be 3 charactes long!</FormFeedback>
        </FormGroup>
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
        <FormGroup tag="fieldset" >
          <legend>Choose Account Type:</legend>
          <FormGroup check  >
            <Label check>
              <Input checked={role === 'CUSTOMER'} onChange={roleChangeHandler} type="radio" name="radio1" value='CUSTOMER' />
              Register me as Customer (for only shopping!)
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" onChange={roleChangeHandler} checked={role === 'ADMIN'} name="radio1" value='ADMIN' />
              Register me as Admin (I want to open my store here!)
            </Label>
          </FormGroup>
        </FormGroup>
        <div className="text-center">

          <LoadingButton
          disabled={!isNameValid || !isEmailValid || !isPasswordValid || !name || !email || !password}
          addons={{
            color:'primary',
            className:'bg-primary px-5 text-light'
          }}
          loading={isLoading}
          >
            Sign Up
          </LoadingButton>
        </div>
        <p className="text-center mt-2">
          Already have an account? <Link className="link-primary" to='/sign-in'>Sign In</Link>
        </p>
      </Form>

    </AuthWrapper>
  )
}

export default SignUp