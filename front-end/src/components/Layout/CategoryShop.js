import "./category-shop.css"
import shopping from "assets/shopping.png"
import { Link } from "react-router-dom"
const CategoryShop = ({name,id}) => {
    return (
        <div className="shop shadow rounded">
            <div className="shop-img">
                <img src={shopping} alt="shopping sticker" />
            </div>
            <div className="shop-body">
                <h3 className="text-turncate text-uppercase">{name}<br />Collection</h3>
                <Link to={`/shop?category=${id}`} className="cta-btn text-decoration-none">View All <i className="fa fa-arrow-circle-right"></i></Link>
            </div>
        </div>
  )
}

export default CategoryShop