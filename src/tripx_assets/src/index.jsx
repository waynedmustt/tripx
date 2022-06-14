import * as React from "react";
import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home'
import Login from './pages/login'
import Mint from './pages/mint'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container
} from 'react-bootstrap';
import Header from './components/Header'

const TripXdApp = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/login" element={<Login />} />
          {/* 👇️ only match this when no other routes match */}
          <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found etc</h2>
              </div>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<TripXdApp />);
