import LoadingButton from "components/UI/LoadingButton"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Alert, Form, FormGroup, FormText, Input } from "reactstrap"
import { useAddNewCatMutation } from "store/api/categoryApi"
const AddCategory = () => {
  const navigate=useNavigate()
  const catRef= useRef()
  const [addCat,{isLoading,isError}] = useAddNewCatMutation()
  const addCatHandler= async e=>{
    e.preventDefault()
    try {
      let value= catRef.current?.value
      if(!value) return
      await addCat({name:value.trim()}).unwrap()
      toast.success(`New Category ${value} added!`)
      navigate('/admin')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="shadow rounded my-3 responsive-width mx-auto p-4 bg-light ">
        <Form onSubmit={addCatHandler}>
            <h5 className="text-primary">Add New Category</h5>
            {isError && <Alert color="danger" className="text-light">Request Failed, Something went wrong!</Alert>}
            <FormGroup>
                <FormText>Label</FormText>
                <Input className="my-2" innerRef={catRef}  type="text" />
            </FormGroup>
            <LoadingButton
            loading={isLoading}
             >Add Category
             </LoadingButton>
        </Form>
    </div>
  )
}

export default AddCategory