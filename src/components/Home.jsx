import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const Home = () => {
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const capitals = [
    "Rome",
    "London",
    "Sydney",
    "Beijing",
    "Los Angeles",
    "New York",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city !== "") {
      navigate(`/details/${city}`);
    }
  };

  const goToCity = (selectedCity) => {
    navigate(`/details/${selectedCity}`);
  };

  return (
    <Container className="py-5 text-center">
      <h1 className="display-4 fw-bold mb-4">Weather App</h1>

      <p className="lead mb-5">Search weather conditions around the world</p>

      <Form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center mb-5"
      >
        <Form.Control
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-50 me-2 shadow-sm"
        />

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      <h2 className="mb-4">Popular Cities</h2>

      <Row className="g-4">
        {capitals.map((capital) => (
          <Col xs={12} sm={6} lg={4} key={capital}>
            <Card
              className="city-card shadow border-0 h-100"
              onClick={() => goToCity(capital)}
            >
              <Card.Body className="d-flex align-items-center justify-content-center">
                <h4 className="mb-0">{capital}</h4>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
