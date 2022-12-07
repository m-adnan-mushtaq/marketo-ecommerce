import InfoCard from "components/Dashboard/InfoCard"
import withQuery from "components/hoc/withQuery"
import { Col, Row } from "reactstrap"
import { useGetDashboardDataQuery } from "store/api/adminApi"

const Summary = ({data:{totalCats,totalProducts}}) => {
    return (
        <Row className="gap-3  align-items-center">
            <Col sm={5} >
                <InfoCard
                    label='My Catagories'
                    count={totalCats}
                />
            </Col>
            <Col sm={5} >
                <InfoCard
                    label='My Products'
                    count={totalProducts}
                />
            </Col>
        </Row>
    )
}

export default withQuery(Summary,useGetDashboardDataQuery)