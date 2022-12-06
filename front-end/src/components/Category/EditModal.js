import LoadingButton from "components/UI/LoadingButton"
import { useRef } from "react"
import { FormGroup, Form, Input, Label } from "reactstrap"
export const EditModal = ({ category,editHandler ,isLoading}) => {
  const catRef=useRef()
  const submitHandler=(e)=>{
    e.preventDefault()
    editHandler(catRef.current.value,category._id)
  }
  return (
    <Form onSubmit={submitHandler} >
      <FormGroup floating>
        <Input
        innerRef={catRef}
          id="catName"
          name="name"
          placeholder="category name"
          type="text"
          defaultValue={category?.name}
        />
        <Label for="catName">
          Category Name
        </Label>
      </FormGroup>
      <div className="clearfix my-2">
        <LoadingButton loading={isLoading} 
        addons={{
          className:'float-end'
        }}
       >
            Update
        </LoadingButton>
      </div>
    </Form>
  )
}
