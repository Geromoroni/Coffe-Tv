const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// inicialmente obtener películas favoritas
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
    //cards
        movieEl.innerHTML = `
        <div class="cards">
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        </div>
        `;

        main.appendChild(movieEl);
    });
}
//funcion evaluacion de las peliculas/series en colores
function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}
//funcion buscador
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});
//funcion buscador del boton
let button = document.getElementById("enviar")

button.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});


//funcion dark mode
const checkbox = document.getElementById(`checkbox`);

checkbox.addEventListener(`change`, ()=> {
    document.body.classList.toggle(`dark`);
});


 ////USO DE JQUERY   btn para scrollear arriba
 scrollTopButton(".scroll-top-btn");

 //funcion para scrollear arriba
 function scrollTopButton(btn) {
   const $ScrollBtn = $(btn);
 
   $(window).scroll(function () {
     let scrollTop = $(this).scrollTop();
     console.log(scrollTop);
     scrollTop >= 200
       ? $ScrollBtn.removeClass("hidden")
       : $ScrollBtn.addClass("hidden");
   });
 
   $ScrollBtn.click(function () {
     window.scrollTo({
       behaviour: "smooth",
       top: 0,
     });
   });
 }

