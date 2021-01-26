
// DOM elements
export const DOMs = {
    searchInput: document.getElementById('search-input'),
    searchOption: document.getElementById('search-select'),
    searchBtn: document.getElementById('search-btn'),
    resultCont: document.getElementById('result-cont'),
    mainHeading: document.getElementById('main-head'),
    rightArrow: document.querySelector('.fa-chevron-right'),
    leftArrow: document.querySelector('.fa-chevron-left'),
    openCardCont: document.getElementById('open-card-cont'),
    likeBtn: document.querySelector('.like-btn'),
    likesMenu: document.getElementById('likes-menu'),
    likesMenuCont: document.getElementById('likes-menu-cont'),
}

export const APIkey = 'https://api.punkapi.com/v2/beers';

export const strings = {
    openCardInnerHtml: ` 
    <div id="open-card" class="open-card" data-itemid=%ID%>
        <div class="open-card-top">
            <img class="card-img" src="%card-image%" alt="%ALT%">
            <div class="headings">
                <h2 class="card-name">%NAME%</h2>
                <h3 class="card-tagline">%TAGLINE%</h3>
            </div>
        </div>
        <p>%DESCRIPTION%</p>
        <h4 class="pair-head">Pair with:</h4>
        <div class="open-card-bottom" id="open-card-bottom">
            <ul class="pair-list" id="pair-list">
                %LI%
            </ul>
            <img class="%LIKE%" id="like-btn" src="img/heart2.png" alt="Like button">
        </div>
    </div>
    `
};