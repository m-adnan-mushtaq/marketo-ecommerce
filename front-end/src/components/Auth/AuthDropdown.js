import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { DropdownItem, DropdownMenu } from "reactstrap"
import { selectUser } from "store/reducer/authReducer"

const AuthDropdown = () => {
    const user = useSelector(selectUser)

    return (
        <DropdownMenu className='me-2' >
            {
                !user ? (
                    <>
                        <DropdownItem tag={Link} to='/sign-in'>Sign In</DropdownItem>
                        <DropdownItem tag={Link} to='/sign-up'>Sign Up</DropdownItem>
                    </>

                ) : (
                    <>
                        <DropdownItem>{user.name}</DropdownItem>
                        {
                            (user.role === 'ADMIN' || user.role === 'SUPERADMIN') ? (
                                <>
                                <DropdownItem tag={Link} to='/admin'>Dashboard</DropdownItem>
                                <DropdownItem tag={Link} to='/admin/profile'>My Profile</DropdownItem>
                                </>
                            ):(
                                <DropdownItem tag={Link} to='/profile'>My Profile</DropdownItem>
                            )
                        }
                        <DropdownItem tag={Link} to='/logout'>Sign Out</DropdownItem>
                    </>

                )
            }
        </DropdownMenu>
    )
}

export default AuthDropdown