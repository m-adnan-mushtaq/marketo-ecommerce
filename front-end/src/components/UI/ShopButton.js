import { Button } from "reactstrap"
import "./shop-button.css"
const ShopButton = ({clicked,dislabled,children,addons}) => {
  return (
    <Button className="diagonal-tr-bl-in mt-1" onClick={clicked} {...addons}  disabled={dislabled}>
        {children}
    </Button>
  )
}

export default ShopButton