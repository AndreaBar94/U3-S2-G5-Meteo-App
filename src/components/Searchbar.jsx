import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import logo from "../assets/logo.png";
import thermometer from "../assets/thermometer.png";
import clearsky from "../assets/clearsky.png";
import windlogo from "../assets/windlogo.png";
import citylogo from "../assets/citylogo.png";

const auth = "62d27c813f254c1c799dabc5dfdd9ada"


const Searchbar = () => {
    const [search, setSearch] = useState('')
    const [city, setCity] = useState([])
    const [weather, setWeather] = useState([])
    const [sky, setSky] = useState("");
    const [temp, setTemp] = useState("");
    const [wind, setWind] = useState('');

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
                alert('Error fetching results 1')
            }
            } catch (error) {
                console.log(error)
            }
        }

        const weatherFetch = async () => {
            try {
                const weatherObj = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city[0].lat}&lon=${city[0].lon}&appid=${auth}&units=metric`)
                if (weatherObj.ok) {
                    const weatherData = await weatherObj.json()
                    setWeather(weatherData)
                    setSky(weatherData.weather[0].main)
                    setTemp(weatherData.main.temp)
                    setWind(weatherData.wind.speed)
                } else {
                    alert('Error fetching results 2')
                }
            } catch (error) {
                console.log(error)
            }
        }
        
        useEffect(() => {
            weatherFetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[city])

        return (
            <Container className="main">
            <Row>
                <Col xs={10} className="mx-auto m-3">
                    <img src={logo} alt="logo" className="img-fluid" />
                <h1 className="p-4 m-3 text-light bg-secondary rounded bg-opacity-50">Look for your city weather!</h1>
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
                <Col xs={10} className="mx-auto m-3">
                        {weather && (
                            <>
                            <p className="p-4 fs-5 m-3 text-light bg-secondary rounded bg-opacity-50">
                                <img src={citylogo} alt="city-logo" width="40px"/> Selected city: {weather.name}</p>
                            <p className="p-4 fs-5 m-3 text-light bg-secondary rounded bg-opacity-50">
                                <img src={clearsky} alt="sky-logo" width="40px" /> Sky: {sky}
                            </p>
                            <p className="p-4 fs-5 m-3 text-light bg-secondary rounded bg-opacity-50">
                                <img src={windlogo} alt="wind-logo" width="40px"/> Wind speed: {wind} km/h
                            </p>
                            <p className="p-4 fs-5 m-3 text-light bg-secondary rounded bg-opacity-50">
                                <img src={thermometer} alt="temperature-logo" width="40px"/> Temperature: {temp} °C
                            </p>
                            </>

                    )}
                </Col>
            </Row>
            </Container>
        )
};

export default Searchbar;