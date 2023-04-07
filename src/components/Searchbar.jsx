import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import CityInfo from ""
const auth = "62d27c813f254c1c799dabc5dfdd9ada"


const Searchbar = () => {
    const [search, setSearch] = useState('')
    const [city, setCity] = useState([])
    const [weather, setWeather] = useState([])

    console.log(weather)

        const handleChange = (e) => {
            setSearch(e.target.value)
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
        
            try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${auth}`)
            if (response.ok) {
                const data = await response.json()
                setCity(data)
            } else {
                alert('Error fetching results')
            }
            } catch (error) {
                console.log(error)
            }

            try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city[0].lat}&lon=${city[0].lon}&appid=${auth}`)
            if (response.ok) {
                const data = await response.json()
                setWeather(data)
            } else {
                alert('Error fetching results')
            }
            } catch (error) {
                console.log(error)
            }
        }

        return (
            <Container>
            <Row>
                <Col xs={10} className="mx-auto my-3">
                <h1>Look for your city weather!</h1>
                </Col>
                <Col xs={10} className="mx-auto">
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                    type="search"
                    value={search}
                    onChange={handleChange}
                    placeholder="Enter your city here..."
                    />
                </Form>
                </Col>
                <Col xs={10} className="mx-auto mb-5">
                    <CityInfo/>
                    {weather && (
                        <>
                        <p>The weather today in {weather.name} seems to be like {weather.weather[0].main}!</p>
                        </>
                    )}
                </Col>
            </Row>
            </Container>
        )
};

export default Searchbar;