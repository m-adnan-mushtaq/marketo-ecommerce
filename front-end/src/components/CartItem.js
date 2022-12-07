import { useDispatch } from "react-redux"
import { Badge, Button,  InputGroup, } from "reactstrap"
import { addToCart, removeFromCart } from "store/actionCreator"
const CartItem = ({item}) => {
    const dispatch = useDispatch()
   const addHandler=()=> dispatch(addToCart(item))
   const removeHandler=()=> dispatch(removeFromCart(item))
  return (
    <div>
         <div className="d-flex flex-column flex-md-row align-items-center px-3">
                <div className="d-flex  align-items-center">
                    <div className="cart-img-box">
                        <img src={item.imagePath || item.imgUrl} alt={item.title} />
                    </div>
                    <h4 className="p-2">{item.title}</h4>
                </div>
                <div className="actions mx-1 my-3 my-sm-0">
                        <InputGroup size="small" className="flex-nowrap bg-transparent  align-items-center border-0 rounded-pill">
                            <Button onClick={addHandler}>
                                <i className="fa fa-plus "></i>
                            </Button>
                            <h3 className="mx-2">
                                {item.quantity}
                            </h3>
                            <Button onClick={removeHandler}>
                                <i className="fa fa-minus"></i>
                            </Button>
                        </InputGroup>
                </div>
                <div className="d-flex mx-3 align-items-center gap-2">
                    
                    <Badge  pill >{item.category?.name}</Badge>
                    <h1 className="text-primary mx-1">{parseFloat(item.price).toFixed(2)}$</h1>

                </div>
            </div>
            <div className="stylish-border"></div>
    </div>
  )
}

export default CartItem