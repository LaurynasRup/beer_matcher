import {strings, DOMs} from '../base';

// Close open card
export function closeCard(e) {
    if(e.target.classList.contains('open-card-cont')) {
        DOMs.openCardCont.classList.remove('open');
    };
};

// Replace inner HTML parts with object properties
export function insertDom(obj, arr) {
    DOMs.openCardCont.classList.add('open');
    const innerEl = strings.openCardInnerHtml;
    let newEl = innerEl.replace('%card-image%', obj.image !== null ? obj.image : '/img/blankBeer.png');
    newEl = newEl.replace('%ID%', obj.id);
    newEl = newEl.replace('%ALT%', obj.name);
    newEl = newEl.replace('%NAME%', obj.name);
    newEl = newEl.replace('%TAGLINE%', obj.tagline);
    newEl = newEl.replace('%DESCRIPTION%', obj.description);
    newEl = newEl.replace('%LIKE%', changeLikeBtn(obj, arr));
    // Insert list item for each food pair
    newEl = newEl.replace('%LI%', insertLis(obj.food))

    // Insert element into the container
    DOMs.openCardCont.innerHTML = newEl;
};

// Change like button if like exists in array
function changeLikeBtn(obj,likesArr) {
    const searchedItem = likesArr.find(item => item.id === obj.id);
    if(searchedItem) {
        return 'like-btn liked';
    } else {
        return 'like-btn';
    };
};

// Display list items
function insertLis(arr) {
    const listItems = arr.map(item => {
        return `<li class="food-pair">${item}</li>`
    })
    .join('');
    return listItems;
};