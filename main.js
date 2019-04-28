// Name: _your name here_
// Date: _add date here_
// Section: CSE 154 _your section here_
//
// -- your description of what this file does here --
// Do not keep comments from this template in any work you submit (functions included under "Helper
// functions" are an exception, you may keep the function names/comments of checkStatus/id/qs/qsa)

(function() {
  "use strict";



  /**
   *  Add a function that will be called when the window is loaded.
   */
  window.addEventListener("load", init);

  /**
   *  CHANGE: Describe what your init function does here.
   */
  function init() {
    qs("button").addEventListener("click", search);
  }

  function search() {
    let section = qs("section");
    while(section.firstChild){
      section.firstChild.remove();
    }
    let title = qs("input").value;
    let url = "https://api.themoviedb.org/3/search/movie?api_key=fc6ca6162c5996649327d4c5d3e46554&query=";
    url += title;
    fetch(url).then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        let j = myJson.results;
        for(let i = 0; i < myJson.results.length; i++){
          let movie = document.createElement("div");
          let title = document.createElement("h3");
          let poster = document.createElement("img");
          let desc = document.createElement("p");

          title.innerText = j[i].title;
          desc.innerText = j[i].overview;
          poster.src = "https://image.tmdb.org/t/p/original"+j[i].poster_path;

          movie.appendChild(poster);
          movie.appendChild(title);
          movie.appendChild(desc);
          qs("section").appendChild(movie);
        }
      })
      .catch(function (err){
        console.log("error");
        // fix this
      });
  }


  /**
   *  Make sure to always add a descriptive comment above
   *  every function detailing what it's purpose is
   *  Use JSDoc format with @param and @return.
   */
  function exampleFunction1() {
    /* SOME CODE */
  }

  /**
   *  Make sure to always add a descriptive comment above
   *  every function detailing what it's purpose is
   *  @param {variabletype} someVariable This is a description of someVariable, including, perhaps, preconditions.
   *  @returns A description of what this function is actually returning
   */
  function exampleFunction2(someVariable) {
    /* SOME CODE */
    return something;
  }

  /* ------------------------------ Helper Functions  ------------------------------ */
  // Note: You may use these in your code, but do remember that your code should not have
  // any functions defined that are unused.

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
