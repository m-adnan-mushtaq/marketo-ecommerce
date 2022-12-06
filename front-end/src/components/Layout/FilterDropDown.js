import { Button, InputGroup ,Input} from "reactstrap"

const FilterDropDown = () => {
  return (
    <InputGroup className="rounded-pill shadow-none">
        <Input
        type="select"
        name="select-category"
        className="rounded-pill shadow-sm "

        >
            <option value="a">Al Catagories</option>
            <option value="a">Al Catagories</option>
            <option value="a">Al Catagories</option>
            <option value="a">Al Catagories</option>
            <option value="a">Al Catagories</option>
        </Input>
        <Input
        type="text"
        name="search"
        placeholder="find your product"
        className="px-3"
        />
        <Button className="bg-secondary shadow-none text-primary" >
            <i className="fa fa-search"></i>
        </Button>
    </InputGroup>
  )
}

export default FilterDropDown