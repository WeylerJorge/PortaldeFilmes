// Initial Values
const MOVIE_DB_API = 'e8ee70fb66e12b3b0a76b198030a6f79';
const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';
const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POST_IMAGE = 'https://via.placeholder.com/150';

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function generateMovieDBUrl(path) {
    const url = `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}&language=pt-BR`;
    return url;
}


function getTopRatedMovies() {
    const url = generateMovieDBUrl(`/movie/top_rated`);
    const render = renderMovies.bind({ title: '<h2 id="recomendacoes" class="lancamentos_text">Mais Bem Avaliados</h2>' })
    requestMovies(url, render, handleGeneralError);
}

function getTrendingMovies() {
    const url = generateMovieDBUrl('/trending/movie/day');
    const render = renderMovies.bind({ title: '<h2 id="recomendacoes" class="lancamentos_text">Tendências</h2>' })
    requestMovies(url, render, handleGeneralError);
}


function searchUpcomingMovies() {
    const url = generateMovieDBUrl('/movie/upcoming');
    const render = renderMovies.bind({ title: '<h2 id="recomendacoes" class="lancamentos_text">Em Cartaz</h2>' })
    requestMovies(url, render, handleGeneralError);
}

function searchPopularMovie() {
    const url = generateMovieDBUrl('/movie/popular');
    const render = renderMovies.bind({ title: '<h2 id="recomendacoes" class="lancamentos_text">Filmes Populares</h2>' });
    requestMovies(url, render, handleGeneralError);
}

// Invoke a different function for search movies
function searchMovie(value) {
    const url = generateMovieDBUrl('/search/movie') + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleGeneralError);
}


function getVideosByMovieId(movieId, content) {
    const url = generateMovieDBUrl(`/movie/${movieId}/videos`);
    const render = createVideoTemplate.bind({ content });
    requestMovies(url, render, handleGeneralError);
}