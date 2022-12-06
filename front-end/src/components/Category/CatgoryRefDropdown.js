import { forwardRef } from 'react'
import { FormGroup, FormText, Input } from "reactstrap"

const CatgoryRefDropdown = forwardRef(({ cats ,defaultValue}, ref) => {
    return (
        <FormGroup>
            <FormText>Category</FormText>
            <Input defaultValue={defaultValue} innerRef={ref} type='select'>
                {cats.map(cat => (
                    <option
                    defaultChecked={cat._id === defaultValue}
                     key={cat._id} value={cat._id} >{cat.name}</option>
                ))}
            </Input>
        </FormGroup>
    )
})

export default CatgoryRefDropdown