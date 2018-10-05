'use strict';

const bookmarkList = (function(){
  //tested
  const generateError= function(err) {
    let errMessage = '';
    if(err.responseJSON && err.responseJSON.message){
      errMessage = err.responseJSON.message;
    } else{
      errMessage = `${err.code} Server Error`;
    }

    return`
        <section class="error-content">
        <button id="cancel-error">X</button>
        <p class="error-message">${errMessage} [title: 1 char min, url: http(s):// 5 char min]</p>
      </section>`;
  };
  
  const generateBookmarkItemElement = function(item) {
    if (item.expanded === true) {
      return `<li class="bookmark-item js-bookmark-element" data-item-id="${item.id}">
      <h4>${item.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rating:&nbsp;${item.rating}/5</h4>
      <p>${item.desc}</p>
      <div class="bookmark-item-controls">

      <button class="bookmark-item-delete js-item-delete">
        <span class="button-label">delete</span>
      </button>
      <button class="bookmark-item-visit js-item-visit">
        <span class="button-label">Visit Site</span>
      </button>
      </div>
      </li>`; 
    }

    return `<li class="bookmark-item js-bookmark-element" data-item-id="${item.id}">
      <h4>${item.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rating:&nbsp;${item.rating}/5</h4>
      </li>`;
  };
  
  //tested
  const generateBookmarkListString = function (bookmarkArr) {
    const bookmarks = bookmarkArr.map(item => generateBookmarkItemElement(item));
    return bookmarks.join('');
  };

  const getBookmarkIdFromElement = function(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('item-id');
  };

  const render = function () {
    let bookmarks = store.list;
    
    const defaultBookmarkHTML= `      
      <form class = "default-bookmark-list-form">
        <button type="click" class="add-bookmark">Add a Bookmark</button>
        <select name="minimum-rating" id="select">
          <option name="filter-rating" value="">All Bookmarks</option>
          <option name="filter-rating" value="5">5 Stars</option>
          <option name="filter-rating" value="4">4 Stars+</option>
          <option name="filter-rating" value="3">3 Stars+</option>
          <option name="filter-rating" value="2">2 Stars+</option>
          <option name="filter-rating" value="1">1 Star (All)</option>
        </select>
      </form>`;

    const addBookmarkHTML = `
    <form class="adding-bookmark-form form-container" id="adding-bookmark-form">
      <label for="bookmark-list-entry-title">Add a bookmark:</label><br>
      <div class="input-field">
        <input type="text" id="bookmark-list-entry-title" class="bookmark-list-entry-title" placeholder="Add a title...">
        <input type="text" name="bookmark-list-entry-url" class="bookmark-list-entry-url" placeholder="https://example.com">
        <br><textarea rows =6 cols= 48 name="bookmark-list-entry-description" class="bookmark-list-entry-description" placeholder="Add a description..."></textarea>
      </div>
        <div class="rating-selection">
        <legend>Rate it!</legend>
        <div><input type="radio" name="rating" value="5" checked >5 stars</div>
        <div><input type="radio" name="rating" value="4">4 stars</div>
        <div><input type="radio" name="rating" value="3">3 stars</div>
        <div><input type="radio" name="rating" value="2">2 stars</div>
        <div><input type="radio" name="rating" value="1">1 star</div>
      </div>
      <button class="submit-button">Submit</button><button class="cancel-button">Cancel</button>
    </form>`;


    if(store.error){
      const err = generateError(store.error);
      $('#error-container').html(err);
    } else {
      $('#error-container').empty();
    }

    if(store.addingItem === true) {
      $('#bookmark-list-controls').html(addBookmarkHTML);
    } else {
      $('#bookmark-list-controls').html(defaultBookmarkHTML);
    }

    if(store.ratingFilter > 1) {
      bookmarks = store.list.filter(item => item.rating >= store.ratingFilter);
    }

    const bookmarkListString = generateBookmarkListString(bookmarks);
    $('.bookmark-list').html(bookmarkListString);
  };

  const handleAddBookmarkForm = function() {
    $('#bookmark-list-controls').on('click','.add-bookmark', event => {
      event.preventDefault();
      store.setAddingItem(true);
      render();
    });
  };

  const handleNewBookmarkSubmit = function () {
    $('#bookmark-list-controls').on('click','.submit-button', event => {
      event.preventDefault();
      const newItemTitle = $('.bookmark-list-entry-title').val();
      $('.bookmark-list-entry-title').val('');
      const newItemUrl = $('.bookmark-list-entry-url').val();
      $('.bookmark-list-entry-url').val('');
      const newItemDesc =  $('.bookmark-list-entry-description').val();
      $('.bookmark-list-entry-description').val('');
      const newItemRating = $('input[name=rating]:checked').val();
      api.createBookmark(newItemTitle, newItemUrl, newItemDesc, newItemRating, response => {
        store.addItem(response);
        store.setAddingItem(false);
        render();
      },
      err => {
        console.log(err);
        store.setError(err);
        render();
      });
    });
  };

  const handleDeleteBookmarkClicked = function() {
    $('.bookmark-list').on('click', '.js-item-delete', event =>{
      const id = getBookmarkIdFromElement(event.currentTarget);
      store.findAndDelete(id);
      api.deleteBookMark(id, res => console.log(res));
      render();
    });
  };

  const handleVisitSiteClicked = function() {
    $('.bookmark-list').on('click', '.js-item-visit', event =>{
      const id = getBookmarkIdFromElement(event.currentTarget);
      let bookmark = store.list.find(item => item.id === id);
      window.open(bookmark.url, '_blank');
      store.setExpandedProp(bookmark);
      render();
    });
  };

  const handleExtendedBookmark = function() {
    $('.bookmark-list').on('click', '.js-bookmark-element', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      let bookmark = store.list.find(item => item.id === id);
      store.setExpandedProp(bookmark);
      render();
    });
  };

  const handleFilterBookmarkList= function() {
    $('#bookmark-list-controls').on('change', '#select', () => {
      const ratingVal = parseInt($('#select option:selected').val(), 10);
      store.setRatingFilter(ratingVal);
      render();
    });
  };

  const handleCloseError = function() {
    $('#error-container').on('click', '#cancel-error', () =>{
      store.setError(null);
      render();
    });
  };

  const handleNewBookmarkCancel = function() {
    $('#bookmark-list-controls').on('click','.cancel-button', (event) => {
      event.preventDefault();
      store.setAddingItem(false);
      render();
    });
  }; 

  const bindEventListeners= function() {
    handleAddBookmarkForm();
    handleNewBookmarkSubmit();
    handleDeleteBookmarkClicked();
    handleVisitSiteClicked();
    handleFilterBookmarkList();
    handleExtendedBookmark();
    handleCloseError();
    handleNewBookmarkCancel();
  };
  
  return {
    render,
    bindEventListeners

  };
}());