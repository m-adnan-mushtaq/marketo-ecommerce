import {  Container} from "reactstrap"
import "Layout/layout.css"
import Navbar from "components/Navbar/Navbar"
import NewsLetter from "components/Layout/NewsLetter"
import Footer from "components/Footer/Footer"
import  {Outlet} from "react-router-dom"
const Layout = (props) => {
  return (
    <>
      <Navbar />
      <Container  className='container-margin'>
       <Outlet/>
        <NewsLetter/>
      </Container>
      <Footer/>
    </>
  )
}

export default Layout