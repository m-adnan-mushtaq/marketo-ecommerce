import AuthDropdown from "components/Auth/AuthDropdown";
import CartButton from "components/UI/CartButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink as RouterLink } from "react-router-dom";
import {
  Collapse,
  Navbar as StrapNav,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
import { selectUser } from "store/reducer/authReducer";
import "./navbar.css";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const user = useSelector(selectUser);
  return (
    <div>
      <StrapNav
        expand="md"
        fixed="top"
        container="md"
        className="py-3 bg-light shadow-sm"
      >
        <NavbarBrand tag={Link} to="/">
          <h2 title="Marketo" className="logo text-primary fw-bold">
            Marketo
          </h2>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink tag={RouterLink} to="/shop">
                Shop
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#contact">Contact Us</NavLink>
            </NavItem>
            <UncontrolledDropdown className="me-2" inNavbar nav size="small">
              <DropdownToggle nav caret>
                <i className="fa fa-user fa-lg"></i>
              </DropdownToggle>
              <AuthDropdown />
            </UncontrolledDropdown>
            {user && (
              <NavItem>
                <CartButton />
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </StrapNav>
    </div>
  );
};

export default Navbar;
