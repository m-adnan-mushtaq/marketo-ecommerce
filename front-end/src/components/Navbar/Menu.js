import {Nav, NavItem,NavLink} from "reactstrap"
const Menu = () => {
    return (
        <div>
            <Nav pills className="bg-light">
                <NavItem>
                    <NavLink
                        active
                        href="#"
                    >
                        Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        Shop
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        About Us
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        href="#"
                    >
                        Contact Us
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}

export default Menu