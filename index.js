const URL = {
  'MOVIE_SEARCH': 'https://api.themoviedb.org/3/search/movie',
  'MOVIE_POSTER': 'https://image.tmdb.org/t/p/w1280/',
}

const searchForm = document.querySelector('.search-form');
const searchFormInput = document.querySelector('.search-form__input');

searchForm.addEventListener('submit', searchMovies);

const moviesContainer = document.querySelector('.movies');

function searchMovies() {
  const searchText = searchFormInput.value;
  if (searchText.trim()) {
    getData(searchText);
  }
}

async function getData(searchText) {
  const API_KEY = '76baa0e85eae02e00442382baebc9c50';
  const url = `${URL.MOVIE_SEARCH}?query=${searchText}&api_key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  showData(data);
}

function showData(data) {
  moviesContainer.textContent = '';
  data['results'].forEach(createMovieItem);
}

function createMovieItem(movieData) {
  const movieItem = `<div class="movies__item">
    <img class="movies__item-poster" src="${URL.MOVIE_POSTER + movieData['poster_path']}" alt="${movieData['original_title']}">
    <h3 class="movies__item-name">${movieData['original_title']}</h3>
    <div class="movies__item-rating">${movieData['vote_average']}</div>
  </div>`;

  moviesContainer.insertAdjacentHTML('beforeend', movieItem);
}