import CatgoryRefDropdown from "components/Category/CatgoryRefDropdown";
import LoadingButton from "components/UI/LoadingButton";
import { useRef } from "react";
import { toast } from "react-toastify";
import { FormGroup, Form, Input, Label } from "reactstrap";
const UpdateProductForm = ({ cats, product,isLoading ,updateHandler}) => {
  const titleRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const submitHandler=e=>{
    e.preventDefault()
    // grab update object
    let updateObject={}
    let title=titleRef.current.value
    let price=priceRef.current.value
    let category=categoryRef.current.value
    if(!([title,price,category].every(Boolean))){
      toast.warning('Please fill all input fileds!')
      return
    }
    updateObject.title=title
    updateObject.price=price
    updateObject.category=category
    updateHandler(product._id,updateObject)
  }
  return (
    product && (
      <Form onSubmit={submitHandler}>
        <FormGroup floating>
          <Input
            innerRef={titleRef}
            id="title"
            name="title"
            placeholder="product title"
            type="text"
            defaultValue={product?.title}
          />
          <Label for="catName">Product Title</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            innerRef={priceRef}
            id="price"
            name="price"
            placeholder="product price"
            type="number"
            min={5}
            defaultValue={product?.price}
          />
          <Label for="catName">Product Price</Label>
        </FormGroup>
        <CatgoryRefDropdown
          defaultValue={product?.category?._id}
          cats={cats}
          ref={categoryRef}
        />

        <div className="clearfix my-2">
          <LoadingButton
            loading={isLoading}
            addons={{
              className: "float-end",
            }}
          >
            Update
          </LoadingButton>
        </div>
      </Form>
    )
  );
};

export default UpdateProductForm;
