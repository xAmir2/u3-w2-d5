import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <NavBar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:city" element={<Details />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
