import { Alert } from "reactstrap"
import PropTypes from "prop-types"

const InfoMsg = ({msg}) => {
  return (
    <div className="my-5 responsive-width mx-auto rounded">
        <Alert  color="info" className="text-light lead fw" >
           <i className="fa fa-info-circle me-2"></i> {msg}
          </Alert>
    </div>
  )
}


InfoMsg.propTypes={
    msg:PropTypes.string.isRequired
}
export default InfoMsg