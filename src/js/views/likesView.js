import {DOMs} from '../base'; 
import {reduceStrLength} from './searchView';
import {insertDom} from './cardsView';

// Function to toggle like btn
export function toggleLikeBtn(t) {
    t.classList.toggle('liked');
}

// Function to display Likes Menu and its items
export function displayLikes(arr) {
    if(arr.length > 0) {
        DOMs.likesMenu.classList.add('active');
        DOMs.likesMenuCont.innerHTML = '';
        arr.forEach(item => {
            const likesListEl = document.createElement('li');
            likesListEl.classList.add('liked-item');
            likesListEl.dataset.itemid = item.id;
            likesListEl.innerHTML = 
            `
                <img class="liked-img" src="${item.image ? item.image : './img/blankBeer.png'}" alt="${item.name}">
                <p class="liked-name">${reduceStrLength(18, item.name)}</p>
                <i class="fa fa-times"></i>
            `;
            DOMs.likesMenuCont.appendChild(likesListEl);
        })
    } else {
        DOMs.likesMenu.classList.remove('active');
    };
};

export function showLikedItem(e, arr) {
    if(e.target.classList.contains('liked-item') || e.target.classList.contains('liked-img') || e.target.classList.contains('liked-name') ) {
        const targetEl = e.target.closest('.liked-item');
        // Get item ID
        const itemID = +targetEl.dataset.itemid;
        // Find item in Liked Items array
        const itemObj = arr.find(el=> el.id === itemID)
        // Insert open card to DOM
        insertDom(itemObj, arr)
    };
};

