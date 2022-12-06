import  { useRef, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
  Input,
  InputGroup,
  Form
} from 'reactstrap';

function Topbar(props) {
  const searchRef=useRef()
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigateHandler=e=>{
    e.preventDefault()
    let value=searchRef.current.value
    value=value.trim()
    navigate(`/admin/products?q=${value}`)

  }
  return (
    <div>
      <Navbar expand='sm' className='bg-light  m-0 py-3'>
        <Button onClick={props.openSideBar} className="show-md shadow-0 border-0 bg-transparent">
            <i className="fa fa-bars"></i>
        </Button>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto me-2" navbar>
            <NavItem>
                <Form onSubmit={navigateHandler} >
                <InputGroup className='my-3 my-sm-0 bg-transparent rounded-pill border-primary'>
                <Input
                type='search'
                className='px-2'
                placeholder='find your products...'
                innerRef={searchRef}
                />
                <Button type='submit' color='primary' className='bg-primary text-light'><i className="fa fa-search"></i></Button>
                </InputGroup>

                </Form>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Topbar;