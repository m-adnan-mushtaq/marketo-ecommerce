import PropTypes from "prop-types"
import {  Modal, ModalBody, ModalHeader, } from 'reactstrap';
const UiModal = (props) => {
    return (
        <Modal  fullscreen='sm' centered isOpen={props.open} toggle={props.closed} {...props.addons}>
            <ModalHeader toggle={props.closed}>{props.title}</ModalHeader>
            <ModalBody>
                {props.children}
            </ModalBody>
        </Modal>
    )
}

UiModal.propTypes = {
    title: PropTypes.string.isRequired,
    closed: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}
export default UiModal