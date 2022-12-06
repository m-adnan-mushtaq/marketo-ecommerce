import Product from "components/Product/Product"
import { Col, Row } from "reactstrap"

const Category = ({products}) => {
    return (
        <div className="category-section">
            <div className="d-flex justify-content-between">
                <h3 className="fw-bold">Top Category This Week</h3>
                <div className="stylish-border flex-fill text-right text-uppercase">
                    <h4 className="">{products[0]?(products[0]?.category?.name):''}</h4>
                </div>
            </div>
            <Row className="my-3">
            {products.map(doc => (
                <Col md={6} 
                key={doc._id}
                >
                    <Product
                    {...doc}
                    doc={doc}
                    />
                </Col>
            ))}
            </Row>

        </div>
    )
}

export default Category