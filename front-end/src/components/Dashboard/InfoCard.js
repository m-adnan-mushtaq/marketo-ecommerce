import { Card, CardBody, CardHeader} from "reactstrap"
import { pickRandowBg } from "utils/util"

const InfoCard = ({label,count}) => {
    const color=pickRandowBg()
    return (
        <Card className={`border-top border-5  shadow rounded bg-light border-${color}`}>
            <CardHeader>{label}</CardHeader>
            <CardBody className={`text-${color} p-0 `}>
                <p className="display-2 text-center">{count}</p>
            </CardBody>
        </Card>
    )
}

export default InfoCard