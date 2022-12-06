import { Alert } from "reactstrap"
import PropTypes from "prop-types"

const ErrorMsg = ({msg}) => {
  return (
    <div className="my-2 w-50 mx-auto rounded">
        <Alert  color="danger" className="text-light lead fw" >
           <i className="fa fa-exclamation-circle me-2"></i> {JSON.stringify(msg)}
          </Alert>
    </div>
  )
}


ErrorMsg.propTypes={
    msg:PropTypes.string.isRequired
}
export default ErrorMsg