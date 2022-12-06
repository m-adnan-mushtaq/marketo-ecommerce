import Sidebar from "components/Dashboard/Sidebar"
import Topbar from "components/Dashboard/Topbar"
import { useRef } from "react"
import { Outlet } from "react-router-dom"
import { Col, Row } from "reactstrap"
import "./sidebarLayout.css"

const DashboardLayout = () => {
  const sidebar = useRef()
  const openSideBar= ()=>{
    sidebar.current.classList.add('active')
  }
  const closeSideBar= ()=> sidebar.current.classList.remove('active')
  return (
    <Row className="position-relative vh-100 g-0">
      <div ref={sidebar}  className='col-md-2 h-100 bg-light sidebar-col' >
        <Sidebar closeSideBar={closeSideBar}/>
      </div>

      <Col md={10} className='h-100' >
        <Topbar openSideBar={openSideBar} />
        <div className="py-4 px-3 " style={{"overflow":"auto","maxHeight":"calc(100% - 88px )"}} >
          <Outlet/>
        </div>
      </Col>
    </Row>
  )
}

export default DashboardLayout