// Name: Ludvig Liljenberg
// Date: 03/30/2019
// Section: CSE 154AF
//
// This script makes use of the fetch api to query The Movie Database for movies
// using a string entered by the user. The resulting movies are displayed to the user.
//

(function() {
  "use strict";
  const BASE_URL = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "fc6ca6162c5996649327d4c5d3e46554";
  const POSTER_URL = "https://image.tmdb.org/t/p/original";

  window.addEventListener("load", init);

  /**
   *  Adds responsiveness to the search button
   */
  function init() {
    qs("button").addEventListener("click", search);
  }

  /**
   * Retrieves information from The Movie Database's api and displays it to the user.
   * Removes all previously displayed movies. Updates the result count.
   */
  function search() {
    //removes old movies
    let article = qs("article");
    while (article.firstChild) {
      article.firstChild.remove();
    }

    let url = BASE_URL + "?api_key=" + API_KEY;
    url += "&query=" + qs("input").value;
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(createMovieCards)
      .then(updateCount)
      .catch(console.log);
  }

  /**
   * Creates a "card" html element for every movie in the given json object,
   * and displays them to the user.
   * @param  {JSONobject} jsonResponse - the json object containing movies.
   * @return {Number} Number of movies in the given JSON object.
   */
  function createMovieCards(jsonResponse) {
    let movies = jsonResponse.results;
    for (let i = 0; i < movies.length; i++) {
      let movie = document.createElement("div");
      let title = document.createElement("h3");
      let poster = document.createElement("img");
      let desc = document.createElement("p");
      let rating = document.createElement("h4");

      title.innerText = movies[i].title;
      desc.innerText = movies[i].overview;
      rating.innerText = "Rating: " + movies[i].vote_average + " (of "
          + movies[i].vote_count + " total votes";
      if (movies[i].poster_path != null) { // to avoid a pesky error
        poster.src = POSTER_URL + movies[i].poster_path;
        poster.alt = "Movie poster for " + movies[i].title;
        movie.appendChild(poster);
      }
      movie.appendChild(title);
      movie.appendChild(rating);
      movie.appendChild(desc);
      qs("article").appendChild(movie);
    }
    return movies.length;
  }

  /**
   * Sets the text of the "results" heading to be equal to the number of movies
   * in the fetch response.
   * @param  {Number} n - the number of movies in the fetch result.
   */
  function updateCount(n) {
    qs("h2").innerText = "Results: " + n;
  }

  /* ------------------------------ Helper Functions  ------------------------------ */
  // Note: You may use these in your code, but do remember that your code should not have
  // any functions defined that are unused.

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();
