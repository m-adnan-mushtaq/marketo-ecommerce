import { Table, Button, Input } from "reactstrap"
import ProductRow from "components/Dashboard/ProductRow"
import { Link, useSearchParams} from "react-router-dom"
import withCatList from "components/hoc/withCatList"
import { useDeleteProductMutation, useGetAdminProductsQuery, useUpdateProductMutation } from "store/api/productApi"
import { useSelector } from "react-redux"
import { selectUserId } from "store/reducer/authReducer"
import { ProductPagination } from "components/Product/ProductPagination"
import PageBtn from "components/Pagination/PageBtn"
import { useState } from "react"
import Loader from "components/UI/Loader"
import InfoMsg from "components/UI/InfoMsg"
import ErrorMsg from "components/UI/ErrorMsg"
import DeleteModal from "components/UI/DeleteModal"
import { toast } from "react-toastify"
import UiModal from "components/UI/UiModal"
import UpdateProductForm from "components/Product/UpdateProductForm"
import { findTargetElmHelper } from "utils/util"
const Products = ({ cats }) => {
  const id= useSelector(selectUserId)
  const [page,setPage]= useState(1)
  const [searchParams]= useSearchParams()
  const [cat, setCat] = useState(searchParams.get('category') || '')
  const {data,isError,error,isLoading} = useGetAdminProductsQuery({id,page,category:cat,search:searchParams.get('q')})
  //update product stuff
  const [updateProduct,{isLoading:productLoading}]=useUpdateProductMutation()
  const [toUpdateProduct,setToUpdateProduct]=useState(null)
  const [showUpdateModal,setShowUpdateModal]=useState(false)
  const updateModalToggleHandler=()=>setShowUpdateModal(!showUpdateModal)
  const showUpdateModalHandler=id=>{
    const targetProduct=findTargetElmHelper(data.products,id)
    setToUpdateProduct(targetProduct)
    setShowUpdateModal(true)
  }
  //function for handling update mutation
  const updateProductHandler=async(id,updateCredentials)=>{
    if(!id || !updateCredentials) return
    try {
      await updateProduct({id,body:updateCredentials}).unwrap()
      toast.info('Product Content Updated!')
      setShowUpdateModal(false)
    } catch (error) {
      console.error(error.message);
      toast.error('Network Error or something went wrong!')
    }
  }

  //delete product stuff
  const [deleteProduct,{isLoading:deleteLoading}]=useDeleteProductMutation()
  const [showDeleteModal,setShowDeleteModal]=useState(false)
  const [deleteId,setDeleteId]=useState(null)
  const deleteModalToggleHandler=()=>setShowDeleteModal(!showDeleteModal)
  //delete modal opener
  const setDeleteIdHandler=id=>{
    setDeleteId(id)
    setShowDeleteModal(true)
  }
  //function to perform delete product mutation
  const deleteProductHandler=async(id)=>{
    try {
        if(!id) return
        await deleteProduct(id).unwrap()
        toast.info('Product Deleted!')
        setShowDeleteModal(false)
    } catch (error) {
      console.error(error.message);
      toast.error('Something Went wrong!')
    }

  }
  let products;
  if (isLoading) {
    products = <Loader />
  }
  if (isError) {
    products = <ErrorMsg msg={error.message} />
  }
  if (data && !data.products.length) {
    products = <InfoMsg msg='No Products found!' />
  }
  if (data && data.products.length) {
    const { total_pages,products:productsArr} = data
    products = <>
     <Table striped responsive >
        <thead>
          <tr>
            <th>#</th>
            <th>Media</th>
            <th>Label</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      {productsArr.map((product,i)=>(
        <ProductRow
        i={i+1}
        {...product}
        key={product._id}
        deleted={()=>setDeleteIdHandler(product._id)}
        updated={()=>showUpdateModalHandler(product._id)}
      />
      ))}
        </tbody>

      </Table>
      <ProductPagination
      total_pages={total_pages}
      btn={PageBtn}
      page={page}
      setPage={setPage}
      />
    </>
  } 
  return (
    <>
    <div className='shadow rounded p-3 bg-light' >
      <div className="hstack  justify-content-between">
        <h3 className=" mb-0">All Products</h3>
        <Button tag={Link} to='/admin/add-product' color="info" className="bg-info text-light rounded-0" >Add New</Button>
      </div>
      <Input value={cat}
      onChange={({ target: { value } }) => {
        setCat(value)
      }}
       type="select" className="my-3 bg-secondary w-50">
        <option value="">All Catagories</option>
        {cats.map(cat => (
          <option key={cat._id} value={cat._id} >{cat.name}</option>
        ))}
      </Input>
      {products}
    </div>
    <UiModal
    open={showUpdateModal}
    closed={updateModalToggleHandler}
    title='Update Product?'
    >
      <UpdateProductForm
      cats={cats}
      updateHandler={updateProductHandler}
      isLoading={productLoading}
      product={toUpdateProduct}
      />
    </UiModal>
    <DeleteModal
    togleHandler={deleteModalToggleHandler}
    open={showDeleteModal}
    loading={deleteLoading}
    deleteHandler={()=>deleteProductHandler(deleteId)}
    />
    </>
  )
}

export default withCatList(Products)