// Imports
import { DOMs } from './base';
import * as searchModule from './modules/Search';
import * as searchView from './views/searchView';
import * as cardsModule from './modules/Cards';
import * as cardsView from './views/cardsView';
import * as likesModule from './modules/Likes';
import * as likesView from './views/likesView';

// Store state
let state = {
	searchedItems: [],
	likedItems: likesModule.retrieveLocal(),
};

async function searchControl() {
	// Clear state array
	state.searchedItems = [];
	// Get input values
	const term = DOMs.searchInput.value;
	const opt = DOMs.searchOption.value;

	if (term !== '') {
		// Perform API call
		await searchModule.searchAPI(term, opt, state.searchedItems);
		// clear result container
		DOMs.resultCont.innerHTML = '';
		DOMs.rightArrow.classList.add('hide');
		DOMs.leftArrow.classList.add('hide');
		// If there are results
		if (state.searchedItems.length > 0) {
			// Insert cards
			searchView.displayCards(state.searchedItems);
		} else {
			DOMs.mainHeading.classList.remove('active');
			DOMs.resultCont.innerHTML =
				'<h2 class="search-error">No beers were found...<h2>';
		}
		// Clear input
		DOMs.searchInput.value = '';
	} else if (term === '' && opt === 'random') {
		// Perform API call
		await searchModule.searchAPI(term, opt, state.searchedItems);
		// clear result container
		DOMs.resultCont.innerHTML = '';
		DOMs.rightArrow.classList.add('hide');
		DOMs.leftArrow.classList.add('hide');
		// If there are results
		if (state.searchedItems.length > 0) {
			// Insert cards
			searchView.displayCards(state.searchedItems);
		} else {
			DOMs.mainHeading.classList.remove('active');
			DOMs.resultCont.innerHTML =
				'<h2 class="search-error">No beers were found...<h2>';
		}
		// Clear input
		DOMs.searchInput.value = '';
	}
}

function likesControl(e) {
	// check if like button is pressed
	if (e.target.classList.contains('like-btn')) {
		const target = e.target.closest('.like-btn');
		// Change appearance of like button
		likesView.toggleLikeBtn(target);
		// add/remove liked item into state.likes array
		likesModule.storeLikes(e, state.searchedItems, state.likedItems);
		// Push items into local storage
		likesModule.storeLocally(state.likedItems);
		// Retrieve likes from local storage && asign to state.likes arr
		state.likedItems = likesModule.retrieveLocal();
		likesView.displayLikes(state.likedItems);
	}
}

// Event listeners
function initEventListeners() {
	// Event listener for search button
	DOMs.searchBtn.addEventListener('click', searchControl);

	// Maniplute placeholder and input
	DOMs.searchOption.addEventListener('change', searchView.optionChange);

	// Listen for click on beer card
	DOMs.resultCont.addEventListener('click', (e) => {
		cardsModule.showCard(
			e,
			state.searchedItems,
			cardsView.insertDom,
			state.likedItems
		);
	});

	// Listen for click outside beer card
	window.addEventListener('click', cardsView.closeCard);

	// listen for like button to be pressed
	window.addEventListener('click', likesControl);

	// Listen for delete like button click
	window.addEventListener('click', (e) => {
		likesModule.deleteLike(e, state.likedItems, state.likedItems);
		likesView.displayLikes(state.likedItems);
	});
	// listen for like menu item click
	window.addEventListener('click', (e) => {
		likesView.showLikedItem(e, state.likedItems);
	});
}

// Init
function init() {
	initEventListeners();
	likesView.displayLikes(state.likedItems);
	DOMs.searchInput.focus();
}

init();
