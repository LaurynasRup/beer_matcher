import { DOMs } from '../base';

//Function to shorten the name
export function reduceStrLength(limit = 10, str) {
	let string = [];
	if (str.length >= limit) {
		str.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				string.push(cur);
			}
			return acc + cur.length;
		}, 0);
		return `${string.join(' ')}...`;
	}
	return str;
}

// Function to insert DOM element
function insertCardsToDOM(arr) {
	arr.forEach((item) => {
		const beerItemEl = `
            <div class="beer-card" id="${item.id}">
                <img class="card-img" src="${
									item.image !== null ? item.image : './img/blankBeer.png'
								}" alt="${item.name}">
                <h3>${reduceStrLength(15, item.name)}</h3>
                <p>${reduceStrLength(60, item.description)}</p>
            </div>
        `;
		DOMs.resultCont.insertAdjacentHTML('beforeend', beerItemEl);
	});
}

// Function to display paginated results
function insertPaginated(page = 1, res, arr) {
	res = resPerPageChange();
	let start = (page - 1) * res;
	let end = page * res;
	let pages = Math.ceil(arr.length / res);
	// Slice the array and display 4 items per page
	let newArr = arr.slice(start, end);
	insertCardsToDOM(newArr);
	// Last page - remove next arrow
	if (pages === page) {
		DOMs.rightArrow.classList.add('hide');
	} else {
		DOMs.rightArrow.classList.remove('hide');
	}
	// First page - remove prev arrow
	if (page === 1) {
		DOMs.leftArrow.classList.add('hide');
	} else {
		DOMs.leftArrow.classList.remove('hide');
	}
}

// Create cards with search items
export function displayCards(arr) {
	// Move up search cont
	DOMs.mainHeading.classList.add('active');
	if (arr.length < (window.innerWidth < 768 ? 2 : 4)) {
		insertCardsToDOM(arr);
	} else {
		let page = 1;
		let res = window.innerWidth < 768 ? 2 : 4;
		insertPaginated(page, res, arr);
		// listen for right arrow click
		DOMs.rightArrow.addEventListener('click', () => {
			DOMs.resultCont.innerHTML = '';
			page++;
			insertPaginated(page, res, arr);
		});
		//listen for left arrow click
		DOMs.leftArrow.addEventListener('click', () => {
			DOMs.resultCont.innerHTML = '';
			page--;
			insertPaginated(page, res, arr);
		});
	}
}

// Function to change results per page to 2 if inner width is less than 768px
function resPerPageChange() {
	if (window.innerWidth > 768) {
		return 4;
	} else {
		return 2;
	}
}

// Function to change placeholder on option change
export function optionChange() {
	const selectedOption =
		DOMs.searchOption.options[DOMs.searchOption.selectedIndex].value;
	if (selectedOption === 'random') {
		DOMs.searchInput.value = '';
		DOMs.searchInput.placeholder = 'Random beer search...';
		DOMs.searchInput.disabled = 'true';
	} else if (selectedOption === 'name') {
		DOMs.searchInput.placeholder = 'Find a beer by name...';
		DOMs.searchInput.disabled = '';
	} else {
		DOMs.searchInput.placeholder = 'Enter a meal to match... ';
		DOMs.searchInput.disabled = '';
	}
}
