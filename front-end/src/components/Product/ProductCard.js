import { CardFooter, Card, CardBody } from "reactstrap"
import ShopButton from "components/UI/ShopButton"
import "./product.css"
const ProductCard = (props) => {
    const {product} = props
    return (
        <Card >
            <CardBody className="p-0">
                <div className="img-wrapper">
                    <img loading="lazy" src={product.imagePath} alt={product.title} />
                </div>
            </CardBody>
            <CardFooter className="text-center">
                <h3 className="text-primary fw-bold">${parseFloat(product.price).toFixed(2)}</h3>
                <ShopButton
                clicked={props.opened}
                 addons={{
                    size: 'samll'
                }} >
                    View Details <i className="fa fa-info"></i>
                </ShopButton>
            </CardFooter>
        </Card>
    )
}

export default ProductCard