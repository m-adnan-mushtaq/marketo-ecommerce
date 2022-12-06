import { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

const UserDropDown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);
  
    return (
      <div>
        <Dropdown  isOpen={dropdownOpen} toggle={toggle} direction='down' >
          <DropdownToggle className='bg-transparent shadow-none  text-light' >
            <i className="fa fa-user fa-lg"></i>
          </DropdownToggle>
          <DropdownMenu className='bg-light' >
            <DropdownItem>Some Action</DropdownItem>
            <DropdownItem text>Dropdown Item Text</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Foo Action</DropdownItem>
            <DropdownItem>Bar Action</DropdownItem>
            <DropdownItem>Quo Action</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
}

export default UserDropDown