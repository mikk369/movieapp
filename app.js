const menu = document.querySelector("#mobile-menu");
const menulinks = document.querySelector(".navbar-menu");
const loader = document.querySelector(".loading");
const API_KEY = "679160b126ed0a1f34b5b2e43aaa1c59";

// Display mobile menu
const mobileMenu = (e) => {
  menu.classList.toggle("is-active");
  menulinks.classList.toggle("active");
};
menu.addEventListener("click", mobileMenu);
// show loading
function displayLoading() {
  loader.classList.add("display");
}
// hide loading
function hideLoading() {
  loader.classList.remove("display");
}

document.addEventListener("DOMContentLoaded", () => {
  // FETCH DATA
  const getMovies = async () => {
    try {
      displayLoading();
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      );
      // convert data
      const data = await response.json();
      // clear old
      const movieCardGrid = document.querySelector(".movie-card-grid");
      if (movieCardGrid) {
        movieCardGrid.innerHTML = "";
      }
      // loop over response
      data.results.forEach(async (movies) => {
        // create div
        const card = document.createElement("div");
        // give classname
        card.classList.add("card");
        // create the innerHTML
        card.innerHTML = `<img src=" ${
          "https://image.tmdb.org/t/p/w500/" + movies.poster_path
        }" alt="movie-image" />
        <p class="description">
          ${movies.overview}
        </p>
        <div class="movie-info">
          <h3 class="title">${movies.original_title}</h3>
          <p class="year">Release: ${movies.release_date}</p>
          <div class="rating-button-wrapper">
            <button class="get-more-info-button" data-movie-id="${
              movies.id
            }">Get More Info</button>
            <p class="rating">${movies.vote_average}</p>
          </div>
        </div>`;

        // changes background color depending on the score
        const ratings = document.querySelectorAll(".rating");
        ratings.forEach((rating) => {
          const score = parseFloat(rating.textContent);
          if (score >= 8) {
            rating.style.backgroundColor = "#76FF03";
          } else if (score >= 6) {
            rating.style.backgroundColor = "#FFD600";
          } else {
            rating.style.backgroundColor = "#FF5733";
          }
          rating.style.backgroundColor;
        });

        // get all buttons
        const getMoreInfoButtons = document.querySelectorAll(
          ".get-more-info-button"
        );
        // loop over buttons
        getMoreInfoButtons.forEach((button) => {
          button.addEventListener("click", async () => {
            // get the id value from data-movie-id
            const id = button.getAttribute("data-movie-id");
            // Redirect to movie.html page
            window.location.href = `/movie.html?id=${id}`;
          });
        });
        // add card to the grid
        if (movieCardGrid) {
          movieCardGrid.appendChild(card);
        }
        hideLoading();
      });
    } catch (error) {
      console.log(error);
    }
  };
  getMovies();

  // SEARCH FUNCTION
  const searchMovies = async (search) => {
    try {
      displayLoading();
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${search}`
      );
      // convert data
      const data = await response.json();
      // check if there are any results
      if (data.results.length === 0) {
        // navigate to 404 page
        window.location.href = "/404.html";
        return;
      }
      // clear old
      document.querySelector(".movie-card-grid").innerHTML = "";
      // loop over response
      data.results.forEach((movie) => {
        // create div
        const card = document.createElement("div");
        // give classname
        card.classList.add("card");
        // check if poster there
        if (movie.poster_path === null) {
        }
        // create the innerHTML
        card.innerHTML = `<img src="${
          movie.poster_path
            ? // if poster_path is null use default image
              "https://image.tmdb.org/t/p/w500/" + movie.poster_path
            : "./img/no_image.webp"
        }" alt="movie-image" />

        <p class="description">
          ${movie.overview}
        </p>
        <div class="movie-info">
          <h3 class="title">${movie.original_title}</h3>
          <p class="year">Release: ${movie.release_date}</p>
          <div class="rating-button-wrapper">
            <button class="get-more-info-button" data-movie-id="${
              movie.id
            }">Get More Info</button>
            <p class="rating">${movie.vote_average}</p>
          </div>
        </div>`;

        // changes background color depending on the score
        const ratings = document.querySelectorAll(".rating");
        ratings.forEach((rating) => {
          const score = parseFloat(rating.textContent);
          if (score >= 8) {
            rating.style.backgroundColor = "#76FF03";
          } else if (score >= 6) {
            rating.style.backgroundColor = "#FFD600";
          } else {
            rating.style.backgroundColor = "#FF5733";
          }
          rating.style.backgroundColor;
        });
        // get all buttons
        const getMoreInfoButtons = document.querySelectorAll(
          ".get-more-info-button"
        );
        // loop over buttons
        getMoreInfoButtons.forEach((button) => {
          button.addEventListener("click", async () => {
            const id = button.getAttribute("data-movie-id");
            // Redirect to movie.html page
            window.location.href = `/movie.html?id=${id}`;
          });
        });
        // add card to the grid
        document.querySelector(".movie-card-grid").appendChild(card);
        hideLoading();
      });
    } catch (error) {
      console.log(error);
    }
  };
  document.querySelector(".search-button").addEventListener("click", (e) => {
    e.preventDefault();
    // get search term from input
    const search = document.querySelector(".text-input").value;
    searchMovies(search);
  });
  //add search by ENTER key
  document.addEventListener("keydown", function (e) {
    // console.log(e.key);
    if (e.key === "Enter") {
      document.querySelector(".search-button").click();
    }
  });
});

// MOVIE BY ID
document.addEventListener("DOMContentLoaded", () => {
  // check if current path is movie.html
  if (window.location.pathname.includes("movie.html")) {
    // creates a new instance of the URLSearchParams interface
    const searchParams = new URLSearchParams(window.location.search);
    // retrieves the value of the id parameter in the query string.
    const movieId = searchParams.get("id");
    // Get a movie function
    const getMovie = async () => {
      // create a new div to hold the movie details
      const movieDetails = document.createElement("div");
      // add movie-text class name
      movieDetails.classList.add("movie-text");
      // create image div
      const movieImage = document.createElement("div");
      // add a class to image div
      movieImage.classList.add("movie-image");
      try {
        displayLoading();
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        );
        const movie = await response.json();
        // add inner HTML to the image div
        movieImage.innerHTML = `<img src="${
          movie.poster_path
            ? // if poster_path is null use default image
              "https://image.tmdb.org/t/p/w500/" + movie.poster_path
            : "./img/no_image.webp"
        }" alt="movie-image" />
        `;
        // update the innerHTML of the movie details div
        movieDetails.innerHTML = `
        <ul> 
        <h1>${movie.original_title}</h1>
        <li>Year: ${movie.release_date}</li>
        <li>Duration: ${movie.runtime} minutes</li>
        <li>Revenue: ${movie.revenue}</li>
        <li class="overview">Overview: ${movie.overview}</li>
        </ul>`;
      } catch (error) {
        console.log(error);
      }
      // append the movie details to an existing element in your HTML
      const movieDetailsContainer = document.querySelector(".movie-section");
      if (movieDetailsContainer) {
        movieDetailsContainer.appendChild(movieImage);
        movieDetailsContainer.appendChild(movieDetails);
      }
      hideLoading();
    };
    getMovie();
  }
});
