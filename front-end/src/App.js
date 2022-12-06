import EnsureAuth from "components/EnsureAuth";
import GuardRoute from "components/GuardRoute";
import Toast from "components/Layout/Toast";
import Logout from "container/Auth/Logout";
import SignIn from "container/Auth/SignIn";
import SignUp from "container/Auth/SignUp";
import AddCategory from "container/Dashboard/AddCategory";
import AddProduct from "container/Dashboard/AddProduct";
import OverView from "container/Dashboard/OverView";
import Products from "container/Dashboard/Products";
import Profile from "container/Dashboard/Profile";
import Users from "container/Dashboard/Users";
import Home from "container/Home";
import Cart from "container/Shop/Cart";
import Shop from "container/Shop/Shop";
import DashboardLayout from "Layout/Dashboard/DashboardLayout";
import Layout from "Layout/Main/Layout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {Route, Routes, useLocation} from "react-router-dom"
import { useGetrefreshTokenQuery } from "store/api/authApiSlice";
import { selectToken } from "store/reducer/authReducer";
function App() {
  const {pathname} = useLocation()
  const token=useSelector(selectToken)
  useGetrefreshTokenQuery(undefined,{
    skip:(!(!token) ||  (!localStorage.getItem('persist')))
  })
  useEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])
  return (
    <>
      <Toast/>
      <Routes>
        {/* public routes */}
        <Route element={<Layout/>} >
            <Route path="/" element={<Home/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/shop/cart" element={<Cart/>} />
            <Route path="/sign-up" element={<SignUp/>} />
            <Route path="/sign-in" element={<SignIn/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route element={<EnsureAuth />}>
              <Route path="/profile" element={<Profile />}/>
            </Route>
        </Route>
        {/* private routes only for admin && super-admin */}
        <Route element={<GuardRoute/>}>
            <Route path="/admin" element={<DashboardLayout/>}>
            <Route index element={<OverView/>} />
            <Route path="products" element={<Products/>} />
            <Route path="add-product" element={<AddProduct/>} />
            <Route path="add-category" element={<AddCategory/>} />
            <Route path="users" element={<Users/>} />
            <Route path="profile" element={<Profile/>} />
            </Route>
        </Route>
      </Routes>

    </>
  );
}

export default App;
