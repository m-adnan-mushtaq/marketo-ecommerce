import Link from "components/UI/Link";
import ShopButton from "components/UI/ShopButton";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "store/actionCreator";

const AddCartBtn = ({ product }) => {
  const dipstach = useDispatch();
  const clickHandler = () => {
    dipstach(addToCart(product));
  };
  return (
    <ShopButton clicked={clickHandler}>
      <Link path={"/shop/cart"}>
        Add to cart <i className="fa fa-shopping-cart ms-1"></i>
      </Link>
    </ShopButton>
  );
};

export default AddCartBtn;
