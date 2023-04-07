import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const auth = "62d27c813f254c1c799dabc5dfdd9ada"

const Details = () => {
    const predictions = useSelector((state) => state.days.content)
    const [info, setInfo] = useState([]);
    console.log(info)
    const fiveDays = async () =>{
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${predictions[0][0].lat}&lon=${predictions[0][0].lon}&appid=${auth}`)
            if(response.ok){
                const data = await response.json()
                setInfo(data.list)
            }else{
                alert("Could not get forecast")
            }
        } catch (error) {
            alert("Could not get forecast" + error.message)
        }
    }

    useEffect(()=>{
        fiveDays()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <Row>
            <Col md={10}>
                {info.map((day)=>{
                    return(
                        <>
                        <p className="">{day.weather[0].description}</p>
                        </>
                    )
                })}
            </Col>
            
        </Row>
    )
};
export default Details;