import CategoryDropDown from "components/Category/CategoryDropDown"
import PageBtn from "components/Pagination/PageBtn"
import ProductCard from "components/Product/ProductCard"
import ProductInfo from "components/Product/ProductInfo"
import { ProductPagination } from "components/Product/ProductPagination"
import ErrorMsg from "components/UI/ErrorMsg"
import InfoMsg from "components/UI/InfoMsg"
import Loader from "components/UI/Loader"
import UiModal from "components/UI/UiModal"
import { useRef } from "react"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Input, InputGroup, Button, Row, Col} from "reactstrap"
import { useGetAllCatsQuery, useGetPaginatedProductsQuery } from "store/api/storeApiSlice"
import { findTargetElmHelper } from "utils/util"


const Shop = () => {
  const [searchParams]=useSearchParams()
  //fetch all categories
  const { data: cats, isLoading:catLoading, error:catError } = useGetAllCatsQuery()
  const [showModal, setShowModal] = useState(false)
  const [targetProduct,setTargetProduct]=useState(null)
  const modalCloseHandler = (id) => {
    //find target product
    const product=findTargetElmHelper(data.products,id)
    setTargetProduct(product)
    setShowModal(!showModal)
  }
  const [search,setSearch]=useState('')
  const [cat, setCat] = useState(searchParams.get('category')|| '')
  const [page, setPage] = useState(1)
  const searchInput=useRef()
  
  // get paginated data query
  const { data, isLoading, error, isError } = useGetPaginatedProductsQuery({ page, category:cat ,search})
  
  const selectChangeHandler = ({ target: { value } }) => {
    setCat(value)
  }
  const searchHandler=()=>{
    setSearch(searchInput.current.value)
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
      <Row className="g-3 my-4">
        {productsArr.map(doc => (
          <Col sm={6} md={4}
            key={doc._id}
          >
            <ProductCard 
            product={doc}
            opened={()=>modalCloseHandler(doc._id)} />
          </Col>
        ))}
      </Row>
      <ProductPagination
      total_pages={total_pages}
      btn={PageBtn}
      page={page}
      setPage={setPage}
      />
    </>
  }
  return (

    <div className="py-5">
      <div className="d-flex align-items-center flex-column flex-sm-row gap-5">
        <CategoryDropDown
          value={cat}
          handleChange={selectChangeHandler}
          isLoading={catLoading}
          error={catError}
          cats={cats}

        />
        <InputGroup className="flex-fill border-0 shadow-none bg-transparent">
          <Input
            type="search"
            name="search"
            placeholder="find your product"
            className="px-3 bg-light "
            innerRef={searchInput}
          />
          <Button className="bg-primary text-light" onClick={searchHandler} >
            <i className="fa fa-search"></i>
          </Button>
        </InputGroup>

      </div>
      {products}
      <UiModal open={showModal} closed={modalCloseHandler} title="Add to Cart?">
          <ProductInfo
          addons={{
            className:'item-modal'
          }} 
          product={targetProduct}
          isCenter />
      </UiModal>
    </div>
  )
}

export default Shop