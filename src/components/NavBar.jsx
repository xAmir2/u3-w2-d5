import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar variant="secondary" expand="lg" className="shadow-sm backgroundFN">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-light">
          🌤 Weather App
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
