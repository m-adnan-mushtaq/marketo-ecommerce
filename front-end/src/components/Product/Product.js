import { Card, CardBody , Badge} from "reactstrap"
import "./product.css"
// import laptopImg from "assets/laptop.png"
import { pickRandowBg } from "utils/util"
import AddCartBtn from "components/Cart/AddCartBtn"
const Product = (props) => {
    return (
        <Card className="bg-light shadow m-2">
        <CardBody className="d-flex px-3 py-3">
            <div className="img-wrapper">
                <img className="img-fluid" src={props.imagePath || props.imgUrl} alt={props.title} />
            </div>
            <div className="details p-2 flex-fill ">
                <h4 className="my-1 text-truncate text-wrap">{props.title}</h4>
                <Badge
                    color={pickRandowBg()}
                    pill
                    className="mb-3"
                >
                    {props.category?.name}
                </Badge>
                <br />
                <h3 className=" text-primary ">{parseFloat(props.price).toFixed(2)}$</h3>
                <AddCartBtn
                product={props.doc}
                />
            </div>

        </CardBody>

        </Card>
    )
}

export default Product