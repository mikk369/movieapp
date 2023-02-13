const menu = document.querySelector('#mobile-menu');
const menulinks = document.querySelector('.navbar-menu');

// Display mobile menu
const mobileMenu = (e) => {
  menu.classList.toggle('is-active');
  menulinks.classList.toggle('active');
};
menu.addEventListener('click', mobileMenu);

document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = '679160b126ed0a1f34b5b2e43aaa1c59';

  // FETCH DATA
  const getMovies = async () => {
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      );
      // convert data
      const data = await response.json();

      // clear old
      document.querySelector('.movie-card-grid').innerHTML = '';

      // loop over response
      data.results.forEach((movies) => {
        // create div
        const card = document.createElement('div');
        // give classname
        card.classList.add('card');
        // create the innerHTML
        card.innerHTML = `<img src=" ${
          'https://image.tmdb.org/t/p/w500/' + movies.poster_path
        }" alt="movie-image" />
        <p class="description">
          ${movies.overview}
        </p>
        <div class="movie-info">
          <h3 class="title">${movies.original_title}</h3>
          <p class="year">Release: ${movies.release_date}</p>
          <div class="rating-button-wrapper">
            <button class="get-more-info-button">Get More Info</button>
            <p class="rating" id="rating-${movies.id}">${
          movies.vote_average
        }</p>
          </div>
        </div>`;

        // changes background color depending on the score
        const ratings = document.querySelectorAll('.rating');
        ratings.forEach((rating) => {
          const score = parseFloat(rating.textContent);
          if (score >= 8) {
            rating.style.backgroundColor = '#76FF03';
          } else if (score >= 6) {
            rating.style.backgroundColor = '#FFD600';
          } else {
            rating.style.backgroundColor = '#FF5733';
          }
          rating.style.backgroundColor;
        });
        // add card to the grid
        document.querySelector('.movie-card-grid').appendChild(card);
      });
    } catch (error) {
      console.log(error);
    }
  };
  getMovies();

  // SEARCH FUNCTION
  const searchMovies = async (search) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${search}`
      );
      // convert data
      const data = await response.json();
      console.log(data);

      // clear old
      document.querySelector('.movie-card-grid').innerHTML = '';
      // loop over response
      data.results.forEach((movie) => {
        // create div
        const card = document.createElement('div');
        // give classname
        card.classList.add('card');
        // create the innerHTML
        card.innerHTML = `<img src=" ${
          'https://image.tmdb.org/t/p/w500/' + movie.poster_path
        }" alt="movie-image" />
        <p class="description">
          ${movie.overview}
        </p>
        <div class="movie-info">
          <h3 class="title">${movie.original_title}</h3>
          <p class="year">Release: ${movie.release_date}</p>
          <div class="rating-button-wrapper">
            <button class="get-more-info-button">Get More Info</button>
            <p class="rating" id="rating-${movie.id}">${movie.vote_average}</p>
          </div>
        </div>`;

        // changes background color depending on the score
        const ratings = document.querySelectorAll('.rating');
        ratings.forEach((rating) => {
          const score = parseFloat(rating.textContent);
          if (score >= 8) {
            rating.style.backgroundColor = '#76FF03';
          } else if (score >= 6) {
            rating.style.backgroundColor = '#FFD600';
          } else {
            rating.style.backgroundColor = '#FF5733';
          }
          rating.style.backgroundColor;
        });
        // add card to the grid
        document.querySelector('.movie-card-grid').appendChild(card);
      });
    } catch (error) {
      console.log(error);
    }
  };
  document.querySelector('.search-button').addEventListener('click', (e) => {
    e.preventDefault();
    // get search term from input
    const search = document.querySelector('.text-input').value;
    searchMovies(search);
  });
});
