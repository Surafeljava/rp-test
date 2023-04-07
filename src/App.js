import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LandingScreen, MarketScreen, OrderBookScreen } from "./screens";

import AppBar from "./screens/shared/AppBar";

function App() {
  return (
    <Router>
      <AppBar/>
      <Routes>
        <Route path="/" element={<LandingScreen/>}/>
        <Route path="/market/:token" element={<MarketScreen/>}/>
        <Route path="/orderbook/:token" element={<OrderBookScreen/>}/>
      </Routes>
    </Router>
  );
}

export default App;
