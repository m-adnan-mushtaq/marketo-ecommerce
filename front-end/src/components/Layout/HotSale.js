import HotProdut from "components/Product/HotProdut"
import { useEffect, useState } from "react"
import Circle from "./Circle"
import {Row,Col} from "reactstrap"
import InfoMsg from "components/UI/InfoMsg"

const futureTime= new Date(new Date().getTime()+(2*24*3600*1000)).getTime()
const calculateCountDown= (cTime)=>{
    let timerObj={hours:0,minutes:0,seconds:0}
    const timeLeft= futureTime-cTime
    if(timeLeft<=0) return timerObj
    timerObj.hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    timerObj.minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    timerObj.seconds = Math.floor((timeLeft / 1000) % 60);
    return timerObj
}


const HotSale = ({products}) => {
    const [timer,setTimer]= useState({hours:0,minutes:0,seconds:0}) // after 2 days from current day
    useEffect(()=>{
        let countDown= setInterval(() => {
            let timerObj= calculateCountDown(new Date().getTime())
            setTimer(timerObj)
        }, 1000);
        return ()=> clearInterval(countDown)
    },[])
    return (
    <div className="my-3 bg-light px-3 py-5">
        <div className="d-flex">
            <h1 className="text-danger fw-bold text-uppercase">Hot Sale</h1>
            <div className="stylish-border flex-fill text-right">
                <h3 className="text-warning">16% OFF</h3>
            </div>
        </div>
        <div className="d-flex flex-column align-items-center flex-sm-row  my-5">
            <div className="offer-count mb-3 mb-sm-0">
                <h1 className="display-3 mt-3 fancy-text text-warning">
                    Hurry Up!
                </h1>
                <h5 className="fw-bold my-3">Offer will be close soon!</h5>
                <div className="d-flex">
                <Circle time={timer.hours} label='Hours' />
                <Circle time={timer.minutes} label='Minutes' />
                <Circle time={timer.seconds} label='Seconds' />

                </div>
            </div>
            <Row className="flex-fill">
                {
                    products.length?(
                        <Row>
                        {products.map(doc=>(
                            <Col md={6} lg={4}  key={doc._id}>
                                <HotProdut
                                product={doc}
                                />
                            </Col>
                        ))}
                        </Row>
                    ):(
                        <InfoMsg msg="No Products added yet!" />
                    )
                }
               
            </Row>
        </div>
    </div>
  )
}

export default HotSale