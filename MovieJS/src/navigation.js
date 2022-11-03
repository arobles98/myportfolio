
searchFormBtn.addEventListener('click', () => {
    location.hash = "#search=" +searchFormInput.value;

  });
  
trendingBtn.addEventListener('click', () => {
    location.hash = "#trends";
  });
  
arrowBtn.addEventListener('click', () => {
  window.history.back();
  //history.back()
  //location.hash = "#home";
});
  
  window.addEventListener("DOMContentLoaded", navigator, false)
  window.addEventListener("hashchange", navigator, false)
  
  function navigator() {
    if (location.hash.startsWith("#trends")) {
      trendsPage()
    } else if (location.hash.startsWith("#search=")) {
      searchPage()
    } else if (location.hash.startsWith("#movie=")) {
      movieDetailsPage()
    } else if (location.hash.startsWith("#category=")) {
      categoriesPage()
    } else {
      homePage()
    }
    document.body.scrollTop = 0;
    //document.documentElement.scrollTop = 0;
  }
  
  function homePage() {
    console.log("Home!!")
  
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
  
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
  
    getTrendingMoviesPreview()
    getCategoriesPreview()
  }
  
  function categoriesPage() {
    console.log("Categories!!")
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
  
    //location.hash.split('=') => ['#category', 'id- name']
//ecmascript
    const url = location.hash.split('=');
    const categoryData = url[1];

    const [categoryId, categoryName] = categoryData.split('-');
    
   // console.log(categoryData)
   // console.log(categoryId)
    
    headerCategoryTitle.innerHTML=categoryName
    getMoviesByCategory(categoryId);
  }
  
  function movieDetailsPage() {
    console.log("Movie!!")
    headerSection.classList.add('header-container--long');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    //ej de location hash === '#movie=3485', al final movieId = 3485
    const [_,movieId] = location.hash.split('=')
    getMovieById(movieId);
  }
  
  function searchPage() {
    console.log("Search!!");
  
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
  
    const [_,searchValue] = location.hash.split('=');
    getMoviesBySearch(searchValue);

  }
  
  function trendsPage() {
    console.log("TRENDS!!");
  
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias'
    getTrendingMovies();
    
  }