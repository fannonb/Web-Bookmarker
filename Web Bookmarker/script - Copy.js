document.addEventListener('DOMContentLoaded', function(){
    

    const modal = document.getElementById('modal');
    const modalShow = document.getElementById('show-modal');
    const modalClose = document.getElementById('close-modal');
    const bookmarkForm = document.getElementById('bookmark-form');
    const websiteNameEl = document.getElementById('website-name');
    const websiteUrlEl = document.getElementById('website-url');
    const bookmarksContainer = document.getElementById('bookmarks-container');


    let bookmarks = [];
// Show modal and focus on the input

function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

function hideModal(){
    modal.classList.remove('show-modal');
}

// Modal Event Listeners 

modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', hideModal);
window.addEventListener('click', (e) => { if(e.target === modal){
    modal.classList.remove('show-modal');}});

//Regex Validation
function validate(name, urlInput){
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    const regex = new RegExp(expression);  
    if (!name || !urlInput) {
        alert('Please submit values for both fields.');
        return false;
      }
      if (!urlInput.match(regex)) {
        alert('Please provide a valid web address.');
        return false;
      }
      // Valid
      return true;
} 


//Build Bookmarks DOM

function buildBookmarks(){
    bookmarksContainer.textContent = '';
  // Build items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // Item
    const item = document.createElement('div');
    item.classList.add('item');
    // Close Icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fa-solid', 'fa-xmark');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);

        
    // Favicon / Link Container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    // Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

//Get Bookmarks

function fetchBookmarks(){
    //get data from localStorage

    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    } else{
        bookmarks = [
            {
                name: 'Fannon Benjamin',
                url: 'https://wiztech.co.ke',
            },
        ];

        localStorage.setItem(bookmarks, JSON.stringify(bookmarks));
    }

    buildBookmarks();
}


//Delete Bookmark

function deleteBookmark(url) {
    // Loop through the bookmarks array
    bookmarks.forEach((bookmark, i) => {
      if (bookmark.url === url) {
        bookmarks.splice(i, 1);
      }
    });
    // Update bookmarks array in localStorage, re-populate DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
  }


function storeBookmark(e){
    e.preventDefault();
    const name = websiteNameEl.value;
    let urlInput = websiteUrlEl.value;
    
    if(!urlInput.includes('https://','http://')){
        urlInput =  `https://${urlInput}`;
    }
    
    if(!validate(name, urlInput)){
        return false;
    }

    const bookmark = {
        name: name,
        url: urlInput,
    };

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks(); 
    bookmarkForm.reset();
    websiteNameEl.focus();
}
// 
bookmarkForm.addEventListener('submit', storeBookmark);

fetchBookmarks();

});