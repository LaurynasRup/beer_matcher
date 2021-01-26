// Imports
import { APIkey } from '../base';

// Create a class for each beer item
class BeerItem {
	constructor(id, name, tagline, description, image, food) {
		this.id = id;
		this.name = name;
		this.tagline = tagline;
		this.description = description;
		this.image = image;
		this.food = food;
		this.isLiked = false;
	}
}

// Function to trim and replace spaces
function cleanString(str) {
	const newStr = str.trim().split(' ').join('_');
	return newStr;
}

// Perform an API call
export async function searchAPI(term, opt, arr) {
	// If search option is 'Meal'
	if (term) {
		if (opt === 'meal') {
			const res = await fetch(`${APIkey}?food=${cleanString(term)}`);
			const data = await res.json();
			// console.log(data);
			// Push returned items into state array
			data.forEach((item) => {
				const beerItem = new BeerItem(
					item.id,
					item.name,
					item.tagline,
					item.description,
					item.image_url,
					item.food_pairing
				);
				arr.push(beerItem);
			});
			// return data;
			// If search option is 'Name'
		} else if (opt === 'name') {
			const res = await fetch(`${APIkey}?beer_name=${cleanString(term)}`);
			const data = await res.json();
			// console.log(data);
			// Push returned items into state array
			data.forEach((item) => {
				const beerItem = new BeerItem(
					item.id,
					item.name,
					item.tagline,
					item.description,
					item.image_url,
					item.food_pairing
				);
				arr.push(beerItem);
			});
			// return data;
			// If search option is random
		}
	} else if (!term && opt === 'random') {
		const res = await fetch(`${APIkey}/random`);
		const data = await res.json();
		// console.log(data);
		data.forEach((item) => {
			const beerItem = new BeerItem(
				item.id,
				item.name,
				item.tagline,
				item.description,
				item.image_url,
				item.food_pairing
			);
			arr.push(beerItem);
		});
		// return data;
	}
}
