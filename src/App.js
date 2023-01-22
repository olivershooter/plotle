import React, { useState, useEffect } from "react";
import { getFilmForToday } from "./services/requests";

import "./App.css";

function App() {
  const [imdbID, setImdbID] = useState("");
  const [plot, setPlot] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [runtime, setRuntime] = useState("");
  const [actors, setActors] = useState("");
  const [rating, setRating] = useState("");
  const [poster, setPoster] = useState("");

  //failsafe loading
  const [loading, setLoading] = useState(false);

  //used to check the game logic
  const [gameState, setGameState] = useState("playing"); //this is the state of the game, it can be 'playing', 'won' or 'lost'

  //grabbing the data from the API
  //API comes in with quotes, so we need to remove them with .replace()
  //also might not be needed to stringify them, but I'm not sure yet + it should be easier to work with a string
  const fetchFilmForToday = async () => {
    console.log("fetching film for today");
    setLoading(true);
    const filmForTodaysDate = await getFilmForToday();
    if (!filmForTodaysDate || Object.keys(filmForTodaysDate).length === 0) {
      console.log("Error: Empty object returned, reloading page.");
      window.location.reload();
      return;
    }
    if (filmForTodaysDate.error) {
      console.log(`Error: ${filmForTodaysDate.error}, reloading page.`);
      window.location.reload();
      return;
    }
    setLoading(false);
    setImdbID(filmForTodaysDate.imdbID);
    setPlot(filmForTodaysDate.Plot);
    setTitle(filmForTodaysDate.Title);
    setYear(filmForTodaysDate.Year);
    setRuntime(filmForTodaysDate.Runtime);
    setActors(filmForTodaysDate.Actors);
    setRating(filmForTodaysDate.Ratings && filmForTodaysDate.Ratings[0].Value);
    setPoster(filmForTodaysDate.Poster);

    setLoading(false);

    console.log(filmForTodaysDate.imdbID);
    console.log(filmForTodaysDate.Plot);
    console.log(filmForTodaysDate.Title);
    console.log(filmForTodaysDate.Year);
    console.log(filmForTodaysDate.Runtime);
    console.log(filmForTodaysDate.Actors);
    console.log(filmForTodaysDate.Ratings[0].Value);
  };

  //obviously on run grab the film for today
  useEffect(() => {
    fetchFilmForToday();
  }, []);

  // little loading function to show the user that the data is loading
  // uncomment after development <-------------------------------------------------------------------
  // if (loading) {
  //   return <div className="py-10 justify-center">Loading...</div>;
  // }

  return (
    <div className="wrapper">
      <>
        <div className="context">
          <div className="area">
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>

            <div className="container">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-icon"></div>
                  <p className="loading-text">Loading...</p>
                </div>
              ) : title ? (
                <>
                  <div className="film-container">
                    <div className="film-title-title">Title:</div>
                    <div className="film-title">{title}</div>
                    <div className="film-details">
                      <div className="film-title-year">year:</div>
                      <div className="film-year">{year}</div>
                      <div className="film-title-plot">plot:</div>
                      <div className="film-plot">{plot}</div>
                      <div className="film-title-actors">actors:</div>
                      <div className="film-actors">{actors}</div>
                      <div className="film-title-runtime">runtime:</div>
                      <div className="film-runtime">{runtime}</div>
                      <div className="film-title-rating">rating:</div>
                      <div className="film-rating">{rating}</div>
                    </div>
                    <img className="poster-image" src={poster} alt={title} />
                  </div>
                </>
              ) : (
                <div className="error-container">
                  <div className="error-icon"></div>
                  <p className="error-text">
                    Error: No film found, please try again!
                  </p>
                </div>
              )}
            </div>
            <div className="button-container">
              <button
                onClick={fetchFilmForToday}
                disabled={loading}
                className="fetch-button"
              >
                Fetch Film
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
