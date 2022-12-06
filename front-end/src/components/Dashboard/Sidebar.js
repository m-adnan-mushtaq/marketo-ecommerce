import {  UncontrolledCollapse } from "reactstrap"
import { Link, NavLink } from "react-router-dom"
import "./sidebar.css"
import { useSelector } from "react-redux"
import { selectUser } from "store/reducer/authReducer"
const Sidebar = ({closeSideBar}) => {
  const user=useSelector(selectUser)
  return (
    <div className="flex-shrink-0 p-3 bg-light" >
    <div  className="d-flex align-items-center justify-content-between pb-3 mb-3  border-bottom">
      <Link className=" fw-semibold display-6 link-primary text-decoration-none "  to='/' >Marketo.</Link>
      <button onClick={closeSideBar} className="btn btn-close show-md"></button>
    </div>
    <hr className="bg-dark" />
    <ul className="list-unstyled ps-0">
      <li className="my-2">
        <button  id="collapseExample" className="btn btn-toggle align-items-center rounded collapsed">
          <i className="fa fa-shopping-bag me-1"></i> My Store
        </button>
        <UncontrolledCollapse defaultOpen  toggler="collapseExample">
          <ul className="btn-toggle-nav list-unstyled fw-normal p-2 small">
            <li><NavLink to="/admin"  end  className="link-dark rounded">Overview</NavLink></li>
            <li><NavLink to="/admin/products" className="link-dark rounded">Products</NavLink></li>
          </ul>
        </UncontrolledCollapse>
      </li>
      <li className="my-2">
        <button id="manage" className="btn btn-toggle align-items-center rounded collapsed" >
         <i className="fa fa-cogs me-1"></i> Manage Store
        </button>
        <UncontrolledCollapse  toggler="manage" >
          <ul className="btn-toggle-nav list-unstyled fw-normal p-2 small">
          <li><NavLink to="/admin/add-category" className="link-dark rounded">Add Category</NavLink></li>
          <li><NavLink to="/admin/add-product" className="link-dark rounded">Add Product</NavLink></li>
          </ul>
        </UncontrolledCollapse>
      </li>
      {user?.role === 'SUPERADMIN' && (
         <li className="my-2">
         <button id="manageUsers" className="btn btn-toggle align-items-center rounded collapsed" >
          <i className="fa fa-users me-1"></i> Manage Users
         </button>
         <UncontrolledCollapse  toggler="manageUsers" >
           <ul className="btn-toggle-nav list-unstyled fw-normal p-2 small">
           <li><NavLink to="/admin/users" className="link-dark rounded">Manage Users</NavLink></li>
           </ul>
         </UncontrolledCollapse>
       </li>
      )
      }
      <li className="border-top my-3"></li>
      <li className="mb-1">
        <button  id="account" className="btn btn-toggle align-items-center rounded collapsed" >
          <i className="fa fa-user me-1"></i>Account
        </button>
        <UncontrolledCollapse toggler="account" >
          <ul className="btn-toggle-nav list-unstyled fw-normal p-2 small">
          <li><NavLink to="/admin/profile" className="link-dark rounded">Profile</NavLink></li>
          <li><NavLink to="/logout" className="link-dark rounded">Sign Out</NavLink></li>
          </ul>
        </UncontrolledCollapse>
      </li>
    </ul>
  </div>
  )
}

export default Sidebar