//valores iniciais
const API_KEY = 'e8ee70fb66e12b3b0a76b198030a6f79';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=e8ee70fb66e12b3b0a76b198030a6f79&language=pt-BR';

//Selecionando os elementos do DOM
const buttonElement = document.querySelector('#searchButton');
const InputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');

function movieSection(movies) {
    return movies.map((movie) => {
        return `
             <img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id} />
            `;
    })
}



/*
                                <div class="movie">
                                    <section class="section">
                                        <div class="card movie_card">
                                            <img src="https://www.joblo.com/assets/images/joblo/posters/2019/02/detective-pikachu-trailer-poster-main.jpg"
                                                class="card-img-top" alt="..." data-movie-id="557">
                                            <div class="card-body">
                                                <i class="fas fa-play play_button" data-toggle="tooltip"
                                                    data-placement="bottom" title="Play Trailer">
                                                </i><br>
                                                <h5 class="card-title text-center">POKEMON<br> Detetive Pikachu</h5>
                                                <span class="movie_info">2019</span>
                                                <span class="movie_info float-right"><i class="fas fa-star"></i> 9 /
                                                    10</span>
                                            </div>
                                        </div>
                                    </section>
                                </div>
*/


function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movietemplate = `
        <section class="section col-12 col-sm-8 col-md-8 col-lg-10">
        <div class="card movie_card">
            ${movieSection(movies)}
            <div class="card-body">
                <i class="fas fa-play play_button" data-toggle="tooltip"
                    data-placement="bottom" title="Play Trailer">
                </i><br>
                <h5 class="card-title text-center">POKEMON<br> Detetive Pikachu</h5>
                <span class="movie_info">2019</span>
                <span class="movie_info float-right"><i class="fas fa-star"></i> 9 /
                    10</span>
            </div>
        </div>
        </section>
        `;


    movieElement.innerHTML = movietemplate;
    return movieElement;
}


buttonElement.onclick = function (event) {
    event.preventDefault();
    const value = InputElement.value;

    const newUrl = url + '&query=' + value;

    fetch(newUrl)
        .then((res) => res.json())
        .then((data) => {
            // data.results []
            const movies = data.results;
            const movieBlock = createMovieContainer();
            movieSearchable.appendChild(movieBlock);
            console.log('Data: ', data);
        })
        .catch((error) => {
            console.log('Erro: ', error);
        });
    console.log('Value:', value);
}
