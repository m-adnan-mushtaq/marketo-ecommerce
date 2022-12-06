import Link from "components/UI/Link"
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"
const links = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About Us', path: '/' },
    { label: 'Contact Us', path: '#contact' },
]
const Footer = () => {
    return (
        <>
        <Row className="bg-primary g-2 px-5  align-items-top  text-light  py-5">
            <Col md={4} >
                <h2 className="fw-bold text-light">
                    <Link path='/' addons='text-light'>

                        Marketo
                    </Link>
                </h2>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis illum error doloremque nulla culpa tempore magni labore vero, ad laborum.
                </p>
                <div className="d-flex flex-column gap-2">
                    <div>
                        <i className="fa fa-google me-2"></i>
                        example@gmail.com
                    </div>
                    <div>
                        <i className="fa fa-phone me-2"></i>
                        +00 000 000
                    </div>
                    <div>
                        <i className="fa fa-home me-2"></i>
                        Place your address here
                    </div>
                </div>
            </Col>
            <Col md={3}>
                <h1 className="text-light fw-bold">Links</h1>
                {links.map(e => (
                    <Link key={e.label} addons='text-light my-2 d-block' path={e.path} >
                        {e.label}
                    </Link>
                ))}
            </Col>
            <Col md={5} >
                <div id="contact">
                    <h1 className="text-light fw-bold">Contact Us</h1>
                    <Form action="mailto:test@email.com">
                        <FormGroup>
                            <Label for="email">
                                Email Address
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="email"
                                placeholder="enter your email"
                                type="email"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="message">
                                Your Message
                            </Label>
                            <Input
                                id="message"
                                name="message"
                                placeholder="leave your experience"
                                type="textarea"
                                required
                            />
                        </FormGroup>
                        <div className="text-center">
                            <Button type="submit" className=" w-50 mx-auto shadow-sm">
                                Send <i className="fa fa-send"></i>
                            </Button>
                        </div>
                    </Form>

                </div>
            </Col>

        </Row>
        <div className="d-flex justify-content-center fw-bold text-dark align-items-center py-3 bg-light">
            <p>&copy;Copyrights {new Date().getFullYear()} All Rights Reserved. Made with ❤ by Adnan Malik</p>
        </div>
        </>
    )
}

export default Footer