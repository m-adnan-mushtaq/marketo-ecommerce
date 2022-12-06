import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { selectUser } from "store/reducer/authReducer"

const EnsureAuth = () => {

    //check state of user
    const user =useSelector(selectUser)
  return (
    (user )?<Outlet/>:<Navigate replace to={'/sign-in'} />
  )
}

export default EnsureAuth