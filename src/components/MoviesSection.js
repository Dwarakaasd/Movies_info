import React, { useEffect, useState } from "react";
import Moviesmain from "./Moviesmain";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
const MoviesSection = (props) => {
  const [moviesInfo, setMoviesInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  // const CapitalizeFirstLetter = (string) => {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // };
  // document.title = `${CapitalizeFirstLetter(props.categories)} - my movies`;

  const updateMoviesSection = async () => {
    props.setProgress(10);
    const IMDBURL = `https://api.themoviedb.org/3/movie/${
      props.categories
    }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page + 1}`;
    setLoading(false);
    try {
      const response = await fetch(IMDBURL);
      const data = await response.json();

      if (data.results) {
        // Use a temporary variable to hold the fetched data
        const fetchedMovies = data.results;
        setMoviesInfo(fetchedMovies);
        setTotalResults(data.totalResults);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateMoviesSection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchMoreData = async () => {
    let IMDBURL = `https://api.themoviedb.org/3/movie/${
      props.categories
    }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page + 1}`;
    setPage(page + 1);
    try {
      const response = await fetch(IMDBURL);
      const data = await response.json();

      if (data.results) {
        setMoviesInfo(moviesInfo.concat(data.results));
        setTotalResults(data.totalResults);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <h2> Top Latest Movies</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={moviesInfo.length}
        next={fetchMoreData}
        hasMore={moviesInfo.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {moviesInfo.map((element) => {
              return (
                <div className="col-md-3" key={element.id}>
                  <Moviesmain
                    title={
                      element.title ? element.title : element.original_title
                    }
                    year={element.release_date}
                    rating={
                      element.vote_average >= 1 ? element.vote_average : "None"
                    }
                    genre={element.Genre}
                    actors={element.Actors}
                    ImageUrl={`https://image.tmdb.org/t/p/w300${element.poster_path}`}
                    imdbUrl={`https://www.imdb.com/title/${element.IMDBID}/`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

MoviesSection.defaultProps = {
  categories: "upcoming",
};
MoviesSection.propTypes = {
  categories: PropTypes.string,
};

export default MoviesSection;
