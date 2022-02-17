const API_KEY = '76baa0e85eae02e00442382baebc9c50';

const URL = {
  'MOVIES_SEARCH': 'https://api.themoviedb.org/3/search/movie',
  'MOVIE_SEARCH': 'https://api.themoviedb.org/3/movie/',
  'MOVIE_POSTER': 'https://image.tmdb.org/t/p/w1280/',
}

const searchForm = document.querySelector('.search-form');
const searchFormInput = document.querySelector('.search-form__input');

searchForm.addEventListener('submit', searchMovies);

const moviesContainer = document.querySelector('.movies');
moviesContainer.addEventListener('click', searchMovie);

const movieContainer = document.querySelector('.movie');

const lostContainer = document.querySelector('.lost');

function searchMovies(event) {
  event.preventDefault();

  const searchText = searchFormInput.value;
  if (searchText.trim()) {
    getMoviesData(searchText);
  }
}

async function getMoviesData(searchText) {
  const url = `${URL.MOVIES_SEARCH}?query=${searchText}&api_key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    show404NotFound();
    return;
  }

  const data = await response.json();
  if (!data['results'].length) {
    show404NotFound();
    return;
  }

  showMoviesData(data);
}

function showMoviesData(data) {
  moviesContainer.textContent = '';
  data['results'].forEach(createMoviesItem);
  lostContainer.classList.add('hidden');
  movieContainer.classList.add('hidden');
  moviesContainer.classList.remove('hidden');
}

function createMoviesItem(movieData) {
  const moviesItem = `<div class="movies__item" data-movie-id="${movieData['id']}">
    <img class="movies__item-poster" src="${(movieData['poster_path']) ? URL.MOVIE_POSTER + movieData['poster_path'] : './assets/img/movie-poster.jpg'}" alt="${movieData['original_title']}">
    <h3 class="movies__item-name">${movieData['original_title']}</h3>
    <div class="rating movies__item-rating">${movieData['vote_average']}</div>
  </div>`;

  moviesContainer.insertAdjacentHTML('beforeend', moviesItem);
}

function searchMovie(event) {
  const item = event.target;
  const isMoviesItem = item.classList.contains('movies__item');
  const movieId = isMoviesItem ? item.dataset['movieId'] : item.parentElement.dataset['movieId'];
  getMovieData(movieId);
}

async function getMovieData(movieId) {
  const url = `${URL.MOVIE_SEARCH}${movieId}?api_key=${API_KEY}`;

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    showMovieData(data);
  } else {
    show404NotFound();
  }
}

function showMovieData(data) {
  movieContainer.textContent = '';
  createMovieItem(data);
  lostContainer.classList.add('hidden');
  moviesContainer.classList.add('hidden');
  movieContainer.classList.remove('hidden');
}

function createMovieItem(movieData) {
  const movieItem = `<img class="movie__backdrop" src="${(movieData['backdrop_path']) ? URL.MOVIE_POSTER + movieData['backdrop_path'] : './assets/img/movie-poster.jpg'}" alt="${movieData['original_title']}">
  <div class="movie__inner">
    <h2 class="movie__title">${movieData['original_title']}</h2>
    <div class="movie__info">
      <img class="movie__poster" src="${(movieData['poster_path']) ? URL.MOVIE_POSTER + movieData['poster_path'] : './assets/img/movie-poster.jpg'}" alt="${movieData['original_title']}">
      <div class="movie__details">
        <p class="movie__tagline">${movieData['tagline']}</p>
        <p class="movie__description">${movieData['overview']}</p>
        <div class="rating movie__rating">${movieData['vote_average']}</div>
        <ul class="movie__details-list">
          <li class="movie__details-item">
            <span class="movie__details-item-key">Release Date</span>
            <span class="movie__details-item-value">${movieData['release_date']}</span>
          </li>
          <li class="movie__details-item">
            <span class="movie__details-item-key">Run time</span>
            <span class="movie__details-item-value">${movieData['runtime']} min</span>
          </li>
          <li class="movie__details-item">
            <span class="movie__details-item-key">Genres</span>
            <span class="movie__details-item-value">${movieData['genres'].map(genre => genre['name']).join(', ')}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>`;

  movieContainer.insertAdjacentHTML('beforeend', movieItem);
}

function show404NotFound() {
  movieContainer.classList.add('hidden');
  moviesContainer.classList.add('hidden');
  lostContainer.classList.remove('hidden');
}
