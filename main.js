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

  /**
   *  Add a function that will be called when the window is loaded.
   */
  window.addEventListener("load", init);

  /**
   *  Adds responsiveness to the search button
   */
  function init() {
    qs("button").addEventListener("click", search);
  }

  /**
   * Retrieves information from The Movie Database's api and displays it to the user.
   * Removes all previously displayed movies.
   */
  function search() {
    //removes old movies
    let section = qs("section");
    while(section.firstChild){
      section.firstChild.remove();
    }

    //creates new ones
    let url = BASE_URL + "?api_key=" + API_KEY;
    url += "&query=" + qs("input").value;
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(createMovieCards);
      // .catch(function (err){
      //   console.log("error");
      //   // fix this
      // });
  }

  /**
   * Creates a movie "card" html element for every movie in the given json object,
   * and displays them to the user.
   * @param  {JSON object} myJson - the json object returned from The Movie Database
   */
  function createMovieCards(jsonResponse) {
    let movies = jsonResponse.results;
    for(let i = 0; i < movies.length; i++){
      let movie = document.createElement("div");
      let title = document.createElement("h3");
      let poster = document.createElement("img");
      let desc = document.createElement("p");

      title.innerText = movies[i].title;
      desc.innerText = movies[i].overview;
      poster.src = POSTER_URL+movies[i].poster_path;

      movie.appendChild(poster);
      movie.appendChild(title);
      movie.appendChild(desc);
      qs("section").appendChild(movie);
    }
    console.log(movies.length);
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
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

})();
