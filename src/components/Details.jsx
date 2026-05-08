import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Badge } from "react-bootstrap";

const Details = () => {
  const { city } = useParams();

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const apiKey = "5134f57117165bd6cea5e775316cde15";

  useEffect(() => {
    // CURRENT WEATHER
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
    )
      .then((res) => res.json())
      .then((data) => {
        const today = new Date().toISOString().split("T")[0];

        const grouped = {};

        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];

          if (date === today) return;

          if (!grouped[date]) {
            grouped[date] = item;
          }
        });

        const next5Days = Object.values(grouped).slice(0, 5);

        setForecast(next5Days);
      });
  }, [city]);

  if (!weather) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-lg city-card text-light rounded-4 overflow-hidden">
        <Card.Body className="p-5">
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="display-3 fw-bold">{weather.name}</h1>

              <div className="d-flex align-items-center gap-3 mb-3">
                <h2 className="display-1 fw-bold mb-0">
                  {Math.round(weather.main.temp)}°
                </h2>

                <Badge bg="info" className="fs-6 px-3 py-2">
                  {weather.weather[0].main}
                </Badge>
              </div>

              <p className="fs-5 text-light fst-italic">
                {capitalize(weather.weather[0].description)}
              </p>
            </Col>

            <Col md={4}>
              <Card className="city-card2 border-0 text-light rounded-4">
                <Card.Body>
                  <h5 className="mb-4">Weather Details</h5>

                  <p className="mb-3">
                    💧 Humidity: <strong>{weather.main.humidity}%</strong>
                  </p>

                  <p className="mb-3">
                    🌬 Wind: <strong>{weather.wind.speed} km/h</strong>
                  </p>

                  <p className="mb-3">
                    🌡 Feels like:{" "}
                    <strong>{Math.round(weather.main.feels_like)}°C</strong>
                  </p>

                  <p className="mb-0">
                    ☁ Pressure: <strong>{weather.main.pressure} hPa</strong>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="mt-5 text-center">
        <h2 className="fw-bold mb-4 text-light">5-Day Forecast</h2>

        <Row className="g-4 d-flex justify-content-center">
          {forecast.map((item) => (
            <Col xs={12} sm={6} lg={4} xl={2} key={item.dt}>
              <Card className="h-100 border-0 shadow city-card text-light rounded-4">
                <Card.Body className="text-center">
                  <h5 className="fw-bold mb-3">
                    {new Date(item.dt_txt).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </h5>

                  <p className="text-light fst-italic small mb-3">
                    {new Date(item.dt_txt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>

                  <h2 className="fw-bold mb-3">
                    {Math.round(item.main.temp)}°
                  </h2>

                  <Badge bg="primary" className="mb-3 px-3 py-2">
                    {item.weather[0].main}
                  </Badge>

                  <p className="small text-light fst-italic mb-2">
                    {capitalize(item.weather[0].description)}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Details;
