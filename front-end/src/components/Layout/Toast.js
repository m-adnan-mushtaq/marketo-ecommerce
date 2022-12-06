import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const Toast = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            limit="3"
        />
    )
}

export default Toast