const menuBtn = document.querySelector(".menu-label");
const menu = document.querySelector(".navbar_list");
const favsBtn = document.querySelector(".favs-label");
const favs =  document.querySelector(".favs-container");
const loginRegisterBtn = document.querySelector(".login_register");
const loginRegister = document.querySelector('.login-list');
const newsContainer = document.querySelector(".news_conteiner");
const showMoreBtn = document.querySelector(".more");
const showLessBtn = document.querySelector(".less");
const categoriesContainer = document.querySelector(".category_btn_container");
const categoriesBtn = document.querySelectorAll(".btnNews_category");
const favsContainer = document.querySelector(".favNews-container");
const favsDeleteAllBtn = document.querySelector(".fav-btn-delete");
const successAddMsg = document.querySelector(".add-modal");
const favNewsBtn = document.querySelector(".fav-newsBtn");
const favItemBtn = document.querySelector(".item-btn");
const deleteAllFavsBtn = document.querySelector(".fav-btn-delete");
const aboutContainer = document.querySelector(".about_container");
const aboutCardBigContainer = document.querySelector(".about-big");
const aboutBtn= document.querySelectorAll(".about-btn");
const contactFormBtn = document.querySelector(".buttonContact");
const contactForm = document.querySelector(".contact-formContainer");



let favorites = JSON.parse(localStorage.getItem("fav")) || [];

const saveFavs = () => {
    localStorage.setItem("fav", JSON.stringify(favorites));
} 

// overlay



        // SHOW MENU && FAVS 
const toggleMenu = () =>{
    menu.classList.toggle("open");
    if(favs.classList.contains("open")   || loginRegister.classList.contains('open')){
        favs.classList.remove("open");
        loginRegister.classList.remove("open");
        return
    }
    // overlay.classList.toggle("show-overlay");
}

const toggleFavs = () =>{
    favs.classList.toggle("open");
    if(menu.classList.contains("open") || loginRegister.classList.contains('open')){
        menu.classList.remove("open");
        loginRegister.classList.remove('open');
        return
    }
   // overlay.classList.toggle("show-overlay"); 
}


const toggleLoginRegister = () =>{
    loginRegister.classList.toggle('open');
    if(menu.classList.contains('open')  || favs.classList.contains('open')){
        menu.classList.remove('open');
        favs.classList.remove('open');
        return
    }
}

const closeOnScroll = () =>{
    if (!menu.classList.contains("open") && !favs.classList.contains('open') 
    && !loginRegister.classList.toggle('open')){
        return
    }
    menu.classList.remove("open");
    favs.classList.remove("open");
    loginRegister.classList.remove('open')
    // overlay.classList.remove("open");
}

const closeOnClick = (e) =>{
    if (!e.target.classList.contains("navbar-link")){
        return
    }
    menu.classList.remove('open');
}

//  const closeOnOverlayClick = () => {
//  	barsMenu.classList.remove("open-menu");
//  	cartMenu.classList.remove("open-cart");
//  	overlay.classList.remove("show-overlay"); 
// };










        // TEMPLATE Y RENDER NEWS

const templateNews = (news) => {
    const {id, name, cardImg, title, info} = news
    return `
    <div class="news_card">
        <img src=${cardImg} alt=${name}>
        <h3>${title}</h3>
        <a href="#"><p>${info}</p></a>
        <button class="fav-newsBtn" >
                <i class="fa-regular fa-heart" data-id="${id}" data-name="${name}" data-img=${cardImg} data-title="${title}" data-info="${info}"></i>
        </button>
    </div>
    `
}

const renderNews = (newsList) =>{
    newsContainer.innerHTML += newsList.map(templateNews).join("");

}
 const desRender = (newsList) => {
     newsContainer.innerHTML = newsList.map(templateNews).join("");
 }

const isTheLastOf = () => {
    return appState.currentNewsIndex === appState.newsLimit - 1;
}
const isTheFirstOf = () => {
    return appState.currentNewsIndex === 0;
}


const showMoreNews = () => {
    appState.currentNewsIndex += 1;
    let { news, currentNewsIndex } =  appState;
    renderNews(news[currentNewsIndex]);
    if(isTheLastOf()) {
        showMoreBtn.classList.add("hidden");
        showLessBtn.classList.remove("hidden");
    }
}

const showLessNews = () => {
    appState.currentNewsIndex -= 1;
    let {news, currentNewsIndex} = appState;
    desRender(news[currentNewsIndex]);
    if(isTheFirstOf()){
        showLessBtn.classList.add("hidden");
        showMoreBtn.classList.remove("hidden");
    }
}



                // FILTERED NEWS

const isInactiveBtnFilter = (element) => {
    return (element.classList.contains("btnNews_category") &&
           !element.classList.contains("active"));
};


const changeBtnState = (btn, selectedCategory) => {
    const categories = [...btn];
    categories.forEach((categorieBtn) =>{
        if(categorieBtn.dataset.category !== selectedCategory){
            categorieBtn.classList.remove("active")
            return;
        }
        categorieBtn.classList.add("active");
    }
    );
};

const setShowMoreVisibility = () => {
    if(!appState.activeFilter) {
        showMoreBtn.classList.remove("hidden");
        return
    }
    showMoreBtn.classList.add("hidden");
}

const renderFilteredNews = () => {
    const filteredNews = newsData.filter((news) => {
        return news.category === appState.activeFilter;
    });
    renderNews(filteredNews);
};


const changeFilterState = (btn) =>{
    appState.activeFilter = btn.dataset.category;

    changeBtnState(categoriesBtn, appState.activeFilter);
    setShowMoreVisibility();
}


const applyFilter = (e) => {
    if (!isInactiveBtnFilter(e.target)) {
        return
    };
    changeFilterState(e.target);
    newsContainer.innerHTML = "";
    if(appState.activeFilter) {
        renderFilteredNews();
        appState.currentNewsIndex = 0;
        return
    }
    renderNews(appState.news[0]);
};


// RENDER FAVS

const showAddMsg = (msg) => {
    successAddMsg.classList.add("active-modal");
    successAddMsg.textContent = msg;
    setTimeout(() => {
        successAddMsg.classList.remove("active-modal");
    }, 2000);
}

const createFavNews = (favNews) =>{
    const {id, name, img, title, info} = favNews;
    return `
    <div class="fav-item">
        <img src=${img} alt="${name}">
        
        <h3 class="item-title">${title}</h3>
        <a href="#"><p>${info}</p></a>
        <button class="item-btn" data-id="${id}">Borrar</button>
    </div>
    `
} 
 
 const renderFav = () => {
      if (!favorites.length) {
         favsContainer.innerHTML = `<p> Todavia no elegiste tus noticias favoritas!</p>`
          favsDeleteAllBtn.classList.add("hidden");
          return
        }
    favsContainer.innerHTML = favorites.map(createFavNews).join("");

};

const createNewsData = (newsItem) => {
	const { id, name, img, title, info } = newsItem;
	return { id, name, img, title, info};
};

const isExistingFavNews = (newsId) => {
	return favorites.find((item) => {
		return item.id === newsId;
	});
};

const createFavsItem = (item) => {
	favorites = [
		...favorites,
		{
			...item,

		},
	];
};

const updateFavsState = () => {
    saveFavs();
    renderFav();    
}

const addNewsToFavs = (e) => {
    if(!e.target.classList.contains("fa-heart")) {
        return;
    } 

    const newsItem = createNewsData(e.target.dataset);

    if(isExistingFavNews(newsItem.id)){
        showAddMsg(`La noticia ya se encuentra agregada a tus favoritos`);

    } else {

    createFavsItem(newsItem);
    showAddMsg(`Agregaste la noticia a tus favoritas`);
    e.target.classList.add("color")
    favsDeleteAllBtn.classList.remove("hidden");
    
};

    updateFavsState();

}



const removeNews = (existingNews) => {
	favorites = favorites.filter((product) => {
		return product.id !== existingNews.id;
	});
	updateFavsState();
};



const removeNewsFromFavs = (e) => {
	if (e.target.classList.contains("item-btn")) {
		if (window.confirm("¿Deseas eliminar la noticia de tus favoritas?")) {
			removeNews(e.target.dataset);}
        return
	}
	updateFavsState();
};



const resetFavItem = () => {
	if (window.confirm("¿Deseas eliminar todas tus noticias favoritas?")){
    favorites = [];
	updateFavsState();}
    return
};



// RENDER ABOUT


const activeAboutBtn = (e) => {
        aboutBtn.forEach((btn)=>{
            btn.classList.remove("active")
            return;
        })        
    
        e.target.classList.add("active");
}

const resetAbout = () =>{
    aboutCardBigContainer.classList.remove("correr1");
    aboutCardBigContainer.classList.remove("correr2");
}



const aboutCarrousel = (e) => {
        if(e.target.classList.contains("streamig")){
            resetAbout();
            activeAboutBtn(e);
            
            return
        } else {
            if(e.target.classList.contains("news")){
            resetAbout();
            aboutCardBigContainer.classList.add("correr1");
            
            activeAboutBtn(e)

            return
            }
            else if(e.target.classList.contains("programs")) {
           resetAbout();
           aboutCardBigContainer.classList.add("correr2");
           activeAboutBtn(e);
           return
        }
    }
}

const contactSubmitHandler = (e) =>{
    e.preventDefault()
    contactForm.innerHTML = "<p>Gracias por contactarnos! Te responderemos a la brevedad</p>"
}

console.log(favorites)
console.log(aboutData)



const init = () =>{
    menuBtn.addEventListener("click", toggleMenu);
    favsBtn.addEventListener("click", toggleFavs);
    menu.addEventListener("click", closeOnClick); 
    loginRegisterBtn.addEventListener("click", toggleLoginRegister);
    window.addEventListener("scroll", closeOnScroll);
    // overlay.addEventListener("click", closeOnOverlayClick);
    renderNews(appState.news[appState.currentNewsIndex]);
    showMoreBtn.addEventListener("click", showMoreNews);
    showLessBtn.addEventListener("click", showLessNews);
    categoriesContainer.addEventListener("click", applyFilter);
    document.addEventListener("DOMContentLoaded", renderFav);
    newsContainer.addEventListener("click", addNewsToFavs);
    favsContainer.addEventListener("click", removeNewsFromFavs);
    deleteAllFavsBtn.addEventListener("click", resetFavItem);
    aboutContainer.addEventListener("click", aboutCarrousel);
    contactFormBtn.addEventListener("click", contactSubmitHandler)
    

};

init();
