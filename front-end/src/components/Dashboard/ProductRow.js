import { Badge, Button } from "reactstrap"

const ProductRow = ({ i, title,imagePath,category,price ,deleted,updated}) => {
    return (
        <tr className="align-middle">
            <th scope="row">{i}</th>
            <td >
                <div className="cart-img-box">
                    <img src={imagePath} alt={title} loading='lazy' />
                </div>
            </td>
            <td>
                <h5>{title} </h5>
            </td>
            <td>{parseFloat(price).toFixed(2)}$</td>
            <td>
                <Badge pill>{category.name}</Badge>
            </td>
            <td className="">
                <div className="hstack gap-1">
                <Button onClick={updated} color="info" className="rounded-0 bg-info text-light" > <i className="fa fa-edit"></i> </Button>
                <Button onClick={deleted} color="danger" className="bg-danger text-light rounded-0" > <i className="fa fa-trash"></i> </Button>
                </div>
            </td>
        </tr>
    )
}

export default ProductRow