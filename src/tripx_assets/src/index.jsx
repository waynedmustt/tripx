import * as React from "react";
import { createRoot } from 'react-dom/client'
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import Login from './pages/login'
import Map from './pages/map'
import Mint from './pages/mint'
import StartTrip from './pages/start-trip'
import Quest from './pages/quest'
import WonNFT from './pages/won-nft'
import 'bootstrap/dist/css/bootstrap.min.css'
import { StoicIdentity } from "ic-stoic-identity"
import { coreService } from '../src/core/service'

const TripXdApp = () => {
  function Logout() {
    StoicIdentity.disconnect();

    return <Navigate to="/" state={{ from: location }} />;
  }
  function IsAuthorized({ children }) {
    const isLoggedIn = coreService.getItem('_scApp')
    let location = useLocation()

    if (isLoggedIn) {
      return <Navigate to="/map" state={{ from: location }} />;
    }
  
    return children;
  }
  function RequireAuth({ children }) {
    const isLoggedIn = coreService.getItem('_scApp')
    let location = useLocation();
  
    if (!isLoggedIn) {
      return <Navigate to="/" state={{ from: location }} />;
    }
  
    return children;
  }
  return (
    <Router>
      <Routes>
          <Route path="logout" element={<Logout />} />
          <Route path="/map" element={<RequireAuth><Map /></RequireAuth>} />
          <Route path="/start-trip" element={<RequireAuth><StartTrip /></RequireAuth>} />
          <Route path="/quest" element={<RequireAuth><Quest /></RequireAuth>} />
          <Route path="/won-nft" element={<RequireAuth><WonNFT /></RequireAuth>} />
          <Route path="/" element={<IsAuthorized><Login /></IsAuthorized>} />
          <Route path="/minter-area" element={<Mint />} />
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
    </Router>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<TripXdApp />);
