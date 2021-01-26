// Store likes in likes array
export function storeLikes(e, searchArr, likesArr) {
    // get nearest card
    const itemId = +e.target.closest('.open-card').dataset.itemid;
    // Search For item in search array
    const searchedItem = searchArr.find(el => el.id === itemId);
    // change isLiked status
    // searchedItem.isLiked === false ? searchedItem.isLiked = true : searchedItem.isLiked = false;
    
    // Push item into likes array if it doesnt exist, else - remove;
    if(likesArr.some(like => like.id === itemId)) {
        const itemIndex = likesArr.findIndex(el => el.id === itemId);
        likesArr.splice(itemIndex, 1);
    } else {
        likesArr.push(searchedItem);
    }
}

// Store likes array locally
export function storeLocally(arr) {
    localStorage.setItem('likedItems', JSON.stringify(arr));
}

// Retrieve likes from local storage
export function retrieveLocal() {
    const likes = JSON.parse(localStorage.getItem('likedItems'));
    if(likes !== null) {
        return likes
    }
}

// Delete like item on button click
export function deleteLike(e, arr, arr1) {
    if (e.target.classList.contains('fa-times')) {
        e.target.closest('.liked-item').style.display = 'none';
        // e.target.closest('.likes-menu-cont').style.opacity = '-1';
        // Get item id from dataset
        const itemId = +e.target.closest('.liked-item').dataset.itemid;
        // Find item in the likes arr
        const itemIndex = arr.findIndex(el => el.id === itemId);
        // Delete item from like arr
        arr.splice(itemIndex, 1);
        // Update local storage
        storeLocally(arr);
        // Update the state.likes arr
        arr1 = retrieveLocal();
    }
}