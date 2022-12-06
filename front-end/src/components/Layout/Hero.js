import { Row ,Col, Alert} from "reactstrap"
import CategoryShop from "components/Layout/CategoryShop"
import InfoMsg from "components/UI/InfoMsg"

const Hero = ({cats}) => {
  if(!cats.length){
    return <InfoMsg msg='No Catagories added yet!' />
  }
  return (
    <Row className="my-4">
          {cats.map((cat) => (
            <Col key={cat._id} md={6} lg={4}>
              <CategoryShop 
              name={cat.name}
              id={cat._id}
              />
            </Col>
          ))}
        </Row>
  )
}

export default Hero