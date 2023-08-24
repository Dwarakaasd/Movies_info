import React, { useState, useEffect } from "react";

const Moviesmain = (props) => {
  const { title, year, rating, genre, actors, ImageUrl } = props;
  const [imdbUrl, setImdbUrl] = useState(""); // State to hold IMDb URL

  useEffect(() => {
    const API_KEY = "16e01d51";
    const BASE_URL = "http://www.omdbapi.com/";

    async function fetchMovieDetails(title) {
      const params = {
        apikey: API_KEY,
        t: title,
      };

      try {
        const response = await fetch(
          `${BASE_URL}?${new URLSearchParams(params)}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          const imdbId = data.imdbID;
          const imdbUrl = `https://www.imdb.com/title/${imdbId}/`;
          setImdbUrl(imdbUrl); // Set the IMDb URL in state
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchMovieDetails(title);
  }, [title]); // Run the effect whenever the title changes

  return (
    <div className="my-3">
      <div className="card">
        <img src={ImageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{year}</p>
          <p className="card-text">{rating}</p>
          <p className="card-text">{genre}</p>
          <p className="card-text">{actors}</p>
          <a href={imdbUrl} target="_main" className="btn btn-primary">
            See more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Moviesmain;
