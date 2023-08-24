import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MoviesSection from "./components/MoviesSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
const App = () => {
  const [progress, setProgress] = useState(0);
  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar color="#ff004f" progress={progress} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MoviesSection
                setProgress={setProgress}
                key="top_rated"
                categories="top_rated"
              />
            }
          />
          <Route
            exact
            path="/top_rated"
            element={
              <MoviesSection
                setProgress={setProgress}
                key="top_rated"
                categories="top_rated"
              />
            }
          />
          <Route
            exact
            path="popular"
            element={
              <MoviesSection
                setProgress={setProgress}
                key="popular"
                categories="popular"
              />
            }
          />
          <Route
            exact
            path="upcoming"
            element={
              <MoviesSection
                setProgress={setProgress}
                key="upcoming"
                categories="upcoming"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
