import Loader from 'components/UI/Loader'
import React from 'react'
import { toast } from 'react-toastify'
import { Badge, CardBody, CardTitle, Card,  Button, UncontrolledCollapse } from 'reactstrap'
import { useUpdateUserRoleMutation } from 'store/api/userApiSlice'
import DeleteProfile from './DeleteProfile'

const User = ({ user }) => {
    const [updateRole,{isLoading}]=useUpdateUserRoleMutation()
    const updateRoleHandler=async(role)=>{
        if(!role) return
        try {
          await updateRole({id:user._id,body:{role}}).unwrap()
          toast.success('User Role Updated!')
        } catch (error) {
          console.error(error.message);
          toast.error('Network Error or something went wrong!')
        }
      }
    if(isLoading){
        return <Loader/>
    }
    return (

        <Card className='text-center shadow rounded'>
            <CardTitle className='fw-bold text-primary text-uppercase'>{user.name}</CardTitle>
            <CardBody className='pt-1'>
                <p className="lead mb-0">{user.email}</p>
                <div className='my-1'>
                    <i className="fa fa-user fa-2x"></i>
                </div>
                <Badge pill color='primary'>
                    {user.role}
                </Badge>
                <br />
                <button id={`user${user._id}`} className="btn btn-toggle my-2 rounded collapsed" >
                    <i className="fa fa-congs me-1"></i> Update Role
                </button>
                <UncontrolledCollapse toggler={`user${user._id}`} >
                    <div className="vstack gap-2 align-items-center">
                    {user.role !== 'ADMIN' && <Button onClick={()=>updateRoleHandler('ADMIN')}
                     size='sm' className='bg-success rounded-0 d-block w-100 text-light' color='success'>Make Admin</Button>}
                    {user.role !== 'SUPERADMIN' && (
                        <>
                        <Button onClick={()=>updateRoleHandler('SUPERADMIN')}
                         size='sm' className='bg-success rounded-0 d-block w-100 text-light' color='success'>Make SuperAdmin</Button>
                        <p>
                        <i className="fa fa-warning"></i> SuperAdmin will have same previlages as you have by now!
                        </p>
                        </>
                    )}
                    </div>
                </UncontrolledCollapse>
                <div className="my-2">
                    <DeleteProfile
                    id={user._id}
                    />
                </div>
            </CardBody>
        </Card>
    )
}

export default User