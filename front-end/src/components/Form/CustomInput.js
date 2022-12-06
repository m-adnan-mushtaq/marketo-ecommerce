import { Input } from "reactstrap"

const CustomInput = ({ value, handleChange, isValid,type }) => {
    return (
        <Input
            type={type}
            name={type}
            required
            value={value}
            onChange={handleChange}
            invalid={!isValid}
            valid={isValid && value !== ''}
            autoComplete={(type==='password') ? 'true' :'false'}
        />
    )
}

export default CustomInput