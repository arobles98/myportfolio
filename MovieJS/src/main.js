const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers:{
        'Content-Type':'application/json;charset=utf-8',
    },
    params:{
        'api_key': API_KEY,
    }
})

// Utils
function createMovies(movies, container){
    container.innerHTML = '';

    movies.forEach(movie => {

        const movieContainer = document.createElement("div");
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', ()=>{
            location.hash = '#movie='+movie.id;
        })

        const movieImg = document.createElement("img");
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300'+movie.poster_path)

        movieContainer.appendChild(movieImg);

        container.appendChild(movieContainer)})

}

function createCategories(categories, container){
    categoriesPreviewList.innerHTML = "";
    categories.forEach(category => {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id','id'+ category.id)

        categoryTitle.addEventListener('click', ()=>{
            location.hash=`#category=${category.id}-${category.name}`
        })

        const categoryTitleText = document.createTextNode(category.name)
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
        

    });
}

//Llamados a API
async function getTrendingMoviesPreview(){
    const res = await api('/trending/movie/day');
    //con axios ya no tienes que hacer data= res.json()
    const movies = res.data.results;

    createMovies(movies,trendingMoviesPreviewList)


    //console.log(data,movies)
    //const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')

}


async function getCategoriesPreview(){
    const res = await api('/genre/movie/list');
    const categories = res.data.genres;

    //console.log(res.data)
    //const previewCategoryContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')


    createCategories(categories,categoriesPreviewList);
}


async function getMoviesByCategory(id){
    const res = await api('/discover/movie',{
        params:{
            with_genres: id,
        }
    });
    //con axios ya no tienes que hacer data= res.json()
    const movies = res.data.results;
    createMovies(movies,genericSection)
}

async function getMoviesBySearch(searchValue){
    const res = await api('/search/movie',{
        params:{
            query: searchValue,
        }
    });

    const movies = res.data.results;
    createMovies(movies,genericSection)
}

async function getTrendingMovies(){
    const res = await api('/trending/movie/day');
    const movies = res.data.results;

    createMovies(movies, genericSection)

}

async function getMovieById(id){
    const res = await api(`/movie/${id}`);
    const movie = res.data;

    movieDetailCategoriesList.innerHTML = '';

    const movieImgUrl ='https://image.tmdb.org/t/p/w500'+movie.poster_path;

    headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 
        19.27%, 
        rgba(0, 0, 0, 0) 
        29.17%
        ), 
    url(${movieImgUrl})`;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;



    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesId(id)
}

async function getRelatedMoviesId(id){
    const res = await api(`/movie/${id}/similar`);
    const relatedMovies = res.data.results;

    createMovies(relatedMovies, relatedMoviesContainer)
}

