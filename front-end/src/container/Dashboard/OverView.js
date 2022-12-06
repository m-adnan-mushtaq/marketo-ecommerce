import { useGetAdminCatsQuery } from 'store/api/adminApi'
import { useSelector } from 'react-redux'
import {  selectUserId } from 'store/reducer/authReducer'
import CatList from "components/Overview/CatList"
import Summary from "components/Overview/Summary"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button} from "reactstrap"
import { findTargetElmHelper } from 'utils/util'
import { toast } from 'react-toastify'
import { useDeleteCatMutation, useUpdateCatMutation } from 'store/api/categoryApi'
import UiModal from 'components/UI/UiModal'
import { EditModal } from 'components/Category/EditModal'
import DeleteModal from 'components/UI/DeleteModal'
const OverView = () => {
  const [showEditModal,setShowEditModal]=useState(false)
  const editModalToggleHandler=()=>setShowEditModal(!showEditModal)
  const [showDeleteModal,setShowDeleteModal]=useState(false)
  const deleteModalToggleHandler=()=>setShowDeleteModal(!showDeleteModal)
  const id = useSelector(selectUserId)
  const {data,isError,isLoading} = useGetAdminCatsQuery(id)
  const [editCat,setEditCat]=useState(null)
  const [deleteId,setDeleteId]=useState(null)
  const [updateCat,{isLoading:updateLoading}]= useUpdateCatMutation()
  const [deleteCat,{isLoading:deleteLoading}] = useDeleteCatMutation()
  const modalOpenHandler=id=>{
    //find target cateogy
    let targetCat=findTargetElmHelper(data,id)
    setEditCat(targetCat)
    setShowEditModal(true)
  }

  const setDeleteIdHandler=id=>{
    setDeleteId(id)
    setShowDeleteModal(true)
  }
  const editCatHandler=async(name,id)=>{
    try {
        if(!name || updateLoading || !id) return
         await updateCat({id,body:{name}}).unwrap()
        toast.info(`Category Name ${name} updated!`)
        setShowEditModal(false)
    } catch (error) {
      console.error(error.message);
      toast.error('Something Went wrong!')
    }

  }

  const deleteCatHandler=async(id)=>{
    try {
        if(!id) return
        await deleteCat(id).unwrap()
        toast.warning('Category Deleted!')
        setShowDeleteModal(false)
    } catch (error) {
      console.error(error.message);
      toast.error('Something Went wrong!')
    }

  }
  return (
    <>
      <Summary/>
      <div className="my-3 p-3 bg-light shadow rounded">
      <div className="hstack  justify-content-between">
        <h3 className=" mb-0">All Catagories</h3>
        <Button tag={Link} color="primary" className="bg-primary text-light rounded-0" to='/admin/add-category' >Add New</Button>
        </div>  
        <CatList
        data={data}
        isError={isError}
        isLoading={isLoading}
        opened={modalOpenHandler}
        deleted={setDeleteIdHandler}
        />
      </div>
      <UiModal 
      open={showEditModal}
      closed={editModalToggleHandler}
      title='Edit Catogory?'
      >
        <EditModal
        category={editCat}
        editHandler={editCatHandler}
        isLoading={updateLoading}
        />
      </UiModal>
        <DeleteModal
        open={showDeleteModal}
        togleHandler={deleteModalToggleHandler}
        deleteHandler={()=>deleteCatHandler(deleteId)}
        loading={deleteLoading}
        />
    </>
  )
}

export default OverView