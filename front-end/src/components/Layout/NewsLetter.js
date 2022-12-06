import { Button, Input } from "reactstrap"

const NewsLetter = () => {
  return (
    <div className="my-3 py-5 d-flex align-items-center justify-content-center border-top">
        <div className="text-center responsive-width ">
            <h1 className="lead my-3 display-5">Sign up for
            <span className="fw-bold text-dark ms-2">NEWSLETTER</span>
             </h1>
            <Input
            name="email"
            type="email"
            className="rounded-pill"
            
            />
            <Button className="bg-dark text-light  my-3 px-5">Subscribe</Button>
        </div>

    </div>
  )
}

export default NewsLetter