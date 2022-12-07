import {  Badge} from "reactstrap"
import AddCartBtn from "components/Cart/AddCartBtn"
const ProductInfo = ({product,isCenter,addons}) => {
    return (
        product?(
            <div {...addons}>
                <div className="img-wrapper">
                    <img loading="lazy" src={product.imagePath || product.imgUrl} alt={product.title} />
                </div>
                <div className={`details p-2 ${isCenter && 'text-center'} `}>
                    <h4 className="my-1 turncate-title">{product.title}</h4>
                    <Badge
                        color="warning"
                        pill
                        className="my-1"
                    >
                        {product.category.name}
                    </Badge>
                    <h3 className=" text-primary ">{parseFloat(product.price).toFixed(2)}$</h3>
                    <div className="clearfix my-1">
                        <Badge
                            color="danger float-end"
                            pill
                            className="mb-3"
                        >
                            Hot Sale
                        </Badge>

                    </div>
                    <AddCartBtn
                     product={product}
                     />


                </div>
            </div>

        ):null

    )
}

export default ProductInfo