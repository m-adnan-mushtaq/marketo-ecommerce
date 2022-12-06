import { forwardRef } from "react"
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
//custom styles 
import "./pond.css"
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize);


const ProductPond = forwardRef((props, ref) => (
    <FilePond
        ref={ref}
        {...props.config}
        allowMultiple={false}
        maxFiles={1}
        imagePreviewHeight={250}
        imagePreviewMinHeight={250}
        imagePreviewMaxHeight={250}
        allowFileSizeValidation={true}
        allowFileTypeValidation={true}
    />
))

export default ProductPond