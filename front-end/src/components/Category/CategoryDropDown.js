import ErrorMsg from "components/UI/ErrorMsg"
import InfoMsg from "components/UI/InfoMsg"
import { Input, Spinner } from "reactstrap"
const CategoryDropDown = ({value,handleChange,error,isLoading,cats}) => {
  let content = null
  if (isLoading) {
    content = <Spinner color="info" className="my-2" />
  }
  if (error) {
    content = <ErrorMsg msg={JSON.stringify(error.message)} />
  }
  if (cats && !cats.length) {
    content = <InfoMsg msg="No Catagories found!" />
  }
  if (cats?.length) {
    content = <Input type="select" 
    value={value}
    onChange={handleChange}
    >
      <option value="">All Catagories</option>
      {cats.map(cat => (
        <option key={cat._id} value={cat._id}>{cat.name}</option>
      ))}
    </Input>
  }
  return content
}

export default CategoryDropDown