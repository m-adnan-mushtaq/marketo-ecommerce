import "./product.css"
import { Card, CardBody} from "reactstrap"
import ProductInfo from "./ProductInfo"
const HotProdut = ({product}) => {
  return (
    <Card  >
    <CardBody className="px-1">
        <ProductInfo
        product={product}
        />
    </CardBody>

    </Card>
  )
}

export default HotProdut