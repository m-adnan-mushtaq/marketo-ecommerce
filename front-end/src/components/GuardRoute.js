import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { selectUser } from "store/reducer/authReducer"

const GuardRoute = () => {

    //check state of user
    const user =useSelector(selectUser)
  return (
    (user && ( user.role === 'ADMIN'  || user.role=== 'SUPERADMIN' ) )?<Outlet/>:<Navigate replace to={'/sign-in'} />
  )
}

export default GuardRoute