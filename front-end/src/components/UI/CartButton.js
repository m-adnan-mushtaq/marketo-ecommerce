import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectCartItemsLength } from "store/reducer/cartReducer"
import "./button.css"

const CartButton = (props) => {
    const count= useSelector(selectCartItemsLength)
    return (
        <Link className="text-decoration-none" to='/shop/cart'>
            <span title="My Cart" className="fa-stack fa-lg has-badge" data-count={count}>
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
        </span>
        </Link>
    )
}

export default CartButton