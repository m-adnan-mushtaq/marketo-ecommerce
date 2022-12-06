import CartItem from "components/CartItem"
import { useSelector } from "react-redux"
import {  Badge, Button   } from "reactstrap"
import { selectCartItems, selectTotalPricce } from "store/reducer/cartReducer"
const Cart = () => {
    const cartItems=useSelector(selectCartItems)
    const totalPrice= useSelector(selectTotalPricce)
    return (
        <div style={{ "marginTop": "7rem" }} className=" py-3 shadow-lg rounded bg-light">
            <h1 className="text-center my-2">Your Cart <i className="fa fa-shopping-bag"></i></h1>
            {
                cartItems.length>0 ? cartItems.map(item=>(
                    <CartItem
                    key={item._id}
                    item={item}
                    />
                   )):(
                    <div className="text-center my-4">
                            <i className="fa fa-5x fa-shopping-cart text-primary"></i>
                            <h1>
                                Your Cart is Empty :)
                            </h1>
                            <p>Try adding items, make cart full 😁</p>
                    </div>
                   )
            }
           
            <div className="hstack justify-content-between my-3 px-5">
                <div>
                <Badge pill  >Total Price</Badge>
                <h2 className="text-primary fw-bold mt-1">
                    {parseFloat(totalPrice).toFixed(2)}$
                </h2>
                </div>
                <Button color="primary" className=" bg-primary text-light">
                    Purchase <i className="fa fa-money"></i>
                </Button>
            </div>
        </div>
    )
}

export default Cart