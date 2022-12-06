import CustomInput from "components/Form/CustomInput"
import useValidation from "hooks/useValidation"
import { useSelector } from "react-redux"
import { Form, FormGroup, Label, FormFeedback } from "reactstrap"
import LoadingButton from "components/UI/LoadingButton"
import { selectUser } from "store/reducer/authReducer"
import { toast } from "react-toastify"
import { useUpdateProfileMutation } from "store/api/authApiSlice"
import DeleteProfile from "components/Users/DeleteProfile"
const Profile = () => {
  const user = useSelector(selectUser)
  const [name, changeName, isNameValid] = useValidation(user.name)
  const [email, changeEmail, isEmailValid] = useValidation(user.email)
  const [updateProfile,{isLoading}] = useUpdateProfileMutation()
  const submitHandler = async e => {
    e.preventDefault()
    try {
      if (!isNameValid || !isEmailValid || isLoading) return

      const result = await updateProfile({
        id:user._id,body:{email,name} 
      }).unwrap()
      if (!result) throw Error('something went wrong!')
      toast.info('Profile Updated!')
    } catch (error) {
      console.log(error.message)
      toast.error('Invalid Credentials, or Network Error')

    }
  }
  return (
    <div className="shadow rounded my-3 responsive-width mx-auto p-4 bg-light ">
      <Form onSubmit={submitHandler}>
        <h1 className="text-primary">My Profile</h1>
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
          <LoadingButton
            disabled={!isNameValid || !isEmailValid || !name || !email}
            loading={isLoading}
            addons={{
              color: 'primary',
              className: 'bg-primary px-5 text-light'
            }}
          >
            Update Profile
          </LoadingButton>
      </Form>
      <div className="clearfix">
        <p className=" mt-4 float-end">*Visible to You Only!</p>
      </div>
      <h5 className="text-center text-danger fw-bold">Danger Zone <i className="fa fa-warning"></i></h5>
      <DeleteProfile
      id={user._id}
      />
    </div>
  )

}

export default Profile