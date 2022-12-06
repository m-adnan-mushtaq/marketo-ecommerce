import CatgoryRefDropdown from "components/Category/CatgoryRefDropdown"
import ProductPond from "components/Dashboard/ProductPond"
import withCatList from "components/hoc/withCatList"
import LoadingButton from "components/UI/LoadingButton"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Col, Form, FormGroup, FormText, Input, Row } from "reactstrap"
import { useAddNewProductMutation } from "store/api/productApi"

const mediaConfig = {
    name: "productPic",
    labelIdle: 'Drag & Drop Product or <span class="filepond--label-action">Browse</span>',
    acceptedFileTypes: ['image/jpg', 'image/jpeg', 'image/png'],
    labelFileTypeNotAllowed: 'File of invalid type, try using image formats!',
    maxFileSize: '4MB',
    labelMaxFileSizeExceeded: 'File is larger than 4MB, try using compress ones',
    labelMaxFileSize: 'Maximum file size is 4MB'
}
const AddProduct = ({ cats }) => {
    const titleRef = useRef()
    const priceRef = useRef()
    const categoryRef = useRef()
    const pond = useRef()
    const [addBook, { isLoading }] = useAddNewProductMutation()
    const navigate=useNavigate()

    const addBookHandler = async e => {
        e.preventDefault()
        try {
            let instance = pond.current
            if (!instance) return
            let fileCredentials = instance.getFile()
            if (!fileCredentials) {
                toast.error('Make sure to select product pic!')
                return
            }
            let title = titleRef.current.value
            let price = priceRef.current.value
            let category = categoryRef.current.value
            //grab actual file
            const file = fileCredentials.file
            if (!title || !price || !category) {
                toast.error('Fill all input fileds!')
                return
            }
            const formData=new FormData()
            formData.append('title',title)
            formData.append('category',category)
            formData.append('price',price)
            formData.append('image',file)
             await addBook(formData).unwrap()
            toast.success('New Product Added!')
            navigate('/admin/products')
        } catch (error) {
            console.error(error.message);
            toast.error('Request Failed! Something Went Wrong ,Try again!')
        }



    }

    return (
        <div className="p-3 shadow-lg rounded">
            <h2>Add New Product</h2>
            <Form onSubmit={addBookHandler} >
                <FormGroup>
                    <FormText>Title</FormText>
                    <Input innerRef={titleRef} type="text" />
                </FormGroup>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <FormText>Price</FormText>
                            <Input innerRef={priceRef} type="number" min={0} />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                       <CatgoryRefDropdown
                       ref={categoryRef}
                       cats={cats}
                       />
                    </Col>
                </Row>
                <ProductPond
                    ref={pond}
                    config={mediaConfig}
                />
                <div className="clearfix">
                    <LoadingButton
                    loading={isLoading}
                    addons={{
                        className:'floa-end rounded-0 bg-primary text-light'
                    }}
                    >
                        Add Product
                    </LoadingButton>
                </div>
            </Form>
        </div >
    )
}

export default withCatList(AddProduct)