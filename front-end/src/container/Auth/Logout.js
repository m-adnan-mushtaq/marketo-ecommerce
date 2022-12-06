import { Navigate } from "react-router-dom"
import { useLogOutQuery } from "store/api/authApiSlice"
const Logout = () => {
    const {isLoading,isSuccess}= useLogOutQuery()
  return (
   (!isLoading && isSuccess)?<Navigate to='/sign-in' replace  />:null
  )
}

export default Logout