import Link from "components/UI/Link";
import ShopButton from "components/UI/ShopButton";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "store/actionCreator";
import { selectUser } from "store/reducer/authReducer";

const AddCartBtn = ({ product }) => {
  const dipstach = useDispatch();
  const user = useSelector(selectUser);
  const clickHandler = () => {
    dipstach(addToCart(product));
  };
  return !user ? (
    <Link path='/sign-in'>
        <ShopButton>
      Sign in to Shop <i className="fa fa-lock"></i>
      </ShopButton>
      </Link>
  ) : (
    <Link path={"/shop/cart"}>
        <ShopButton clicked={clickHandler}>
        Add to cart <i className="fa fa-shopping-cart ms-1"></i>
      </ShopButton>
      </Link>
  );
};

export default AddCartBtn;
