import PropTypes from "prop-types"
import { Modal, ModalBody, ModalFooter, ModalHeader,Button } from 'reactstrap';
import LoadingButton from "./LoadingButton";
const DeleteModal = (props) => {
    return (
        <Modal centered isOpen={props.open} toggle={props.togleHandler} {...props.addons}>
            <ModalHeader className="text-danger" toggle={props.togleHandler}>
                Delete Confirmation?
            </ModalHeader>
            <ModalBody>
                Are you sure, You want to delete this premanently?
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" className="rounded-0" onClick={props.togleHandler}>
                    Cancel
                </Button>
                <LoadingButton
                loading={props.loading}
                addons={{
                    color:"danger",
                    className:"text-light bg-danger rounded-0"
                }}
                clicked={props.deleteHandler}>
                    Confirm
                </LoadingButton>
               
            </ModalFooter>
        </Modal>
    )
}

DeleteModal.propTypes = {
    togleHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    loading: PropTypes.bool
}
export default DeleteModal