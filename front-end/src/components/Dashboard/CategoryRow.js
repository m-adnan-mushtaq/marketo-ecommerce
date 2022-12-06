import { Link } from "react-router-dom"
import { Button } from "reactstrap"

const CategoryRow = ({i,label,clicked,deleted,id}) => {
  return (
    <tr className="align-middle">
    <th scope="row">{i}</th>
    <td>
        <h5>{label} </h5>
            </td>
    <td >
        <div className="hstack gap-1">
            <Button onClick={clicked} color="warning" className="rounded-0 bg-warning text-light" > <i className="fa fa-edit"></i> </Button>
            <Button onClick={deleted}  color="danger" className="bg-danger text-light rounded-0" > <i className="fa fa-trash"></i> </Button>
        </div>
    </td>
    <td>
    <Button tag={Link} to={`/admin/products?category=${id}`} color="primary" className=" rounded-0" >View Products </Button>
    </td>
  </tr>
  )
}

export default CategoryRow