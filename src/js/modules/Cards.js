import {DOMs} from '../base';

// Function to find beer object in state array using id
function findObj(id, arr) {
    const item = arr.find(el => el.id === id);
    return item;
};

// Function to display card
export function showCard(e, arr, fn, arr2) {
    const target = e.target.closest('.beer-card')
    if(target) {
        const itemId = +target.id;
        const beerObj = findObj(itemId, arr);
        fn(beerObj, arr2);
    }
};
