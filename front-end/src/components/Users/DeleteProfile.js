import Loader from "components/UI/Loader"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, UncontrolledCollapse } from "reactstrap"
import { useDeleteProfileMutation } from "store/api/authApiSlice"
import { selectUserId } from "store/reducer/authReducer"

const DeleteProfile = ({id}) => {
    const [deleteProfile,{isLoading}]= useDeleteProfileMutation()
    const navigate=useNavigate()
    const userId=useSelector(selectUserId)
    const deleteProfileHandler=async()=>{
        try {
            await deleteProfile(id).unwrap()
            toast.info('Profile Deleted Succesfully!')
            if(userId === id){
                navigate('/sign-up')
            }

        } catch (error) {
            toast.error('Error occured while deleting! Make sure to have valid credentials!')
            console.error(error.message);
        }
    }
  return (
    isLoading?<Loader/>:(
        <>
            <button id={`deleteUser${id}`} className="btn btn-toggle btn-danger align-items-center rounded collapsed" >
            <i className="fa fa-trash me-1"></i> Delete Profile
        </button>
        <UncontrolledCollapse  toggler={`deleteUser${id}`} >
            <h5>Are you Sure?</h5>
            <p className="text-danger">
                After deleting profile, all products & categoires will be also deleted permanently.
                <br />This is one-way drive, Be careFul <i className="fa fa-warning"></i>
            </p>
            <Button onClick={deleteProfileHandler} color="danger" className="rounded-0 bg-danger text-light">
                    Confirm
            </Button>
        </UncontrolledCollapse>
        </>
    )
  )
}

export default DeleteProfile