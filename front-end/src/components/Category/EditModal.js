import LoadingButton from "components/UI/LoadingButton"
import { useRef } from "react"
import { toast } from "react-toastify"
import { FormGroup, Form, Input, Label } from "reactstrap"
export const EditModal = ({ category,editHandler ,isLoading}) => {
  const catRef=useRef()
  const submitHandler=(e)=>{
    e.preventDefault()
    let value=catRef.current.value
    if(!value || !value.trim()) {
      toast.warning('Please fill input!')
      return
    }
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
