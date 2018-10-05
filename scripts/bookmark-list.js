'use strict';

const bookmarkList = (function(){
  //tested
  const generateBookmarkItemElement = function(item) {
    if (item.expanded === true) {
      return `<li class="bookmark-item js-bookmark-element" data-item-id="${item.id}">
      <h4>${item.title} ${item.rating}/5</h4>
      <p>${item.desc}</p>
      <div class="bookmark-item-controls">
      <button class="bookmark-item-edit js-item-edit">
        <span class="button-label">edit</span>
      </button>
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
      <h4>${item.title} ${item.rating}/5</h4>
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
    const addBookmarkHTML = `<form class="adding-bookmark-form form-container" id="adding-bookmark-form">
      <label for="bookmark-list-entry-title">Add a bookmark:</label><br>
      <input type="text" name="bookmark-list-entry-title" class="bookmark-list-entry-title" placeholder="Add a title..." required>
      <input type="text" name="bookmark-list-entry-url" class="bookmark-list-entry-url" placeholder="https://example.com" required>
      <input type="text" name="bookmark-list-entry-description" class="bookmark-list-entry-description" placeholder="Add a description...">
      <fieldset class="rating-selection">
        <legend>Rating</legend>
        <div><input type="radio" name="rating" value="5" checked >5 stars</div>
        <div><input type="radio" name="rating" value="4">4 stars</div>
        <div><input type="radio" name="rating" value="3">3 stars</div>
        <div><input type="radio" name="rating" value="2">2 stars</div>
        <div><input type="radio" name="rating" value="1">1 star</div>
      </fieldset>
      <button type="submit" class="submit-button">Submit</button>
      </form>`;

    if(store.addingItem === true) {
      $('#bookmark-list-controls').html(addBookmarkHTML);
    }

    if(store.ratingFilter > 1) {
      bookmarks = store.list.filter(item => item.rating >= store.ratingFilter);
    }

    const bookmarkListString = generateBookmarkListString(bookmarks);
    $('.bookmark-list').html(bookmarkListString);
  };

  const handleAddBookmarkForm = function() {
    $('.default-bookmark-list-form').on('click','.add-bookmark', event => {
      event.preventDefault();
      store.setAddingItem();
      render();
    });
  };

  const handleNewBookmarkSubmit = function () {
    $('#adding-bookmark-form').submit( event => {
      event.preventDefault();
      const newItemTitle = $('.bookmark-list-entry-title').val();
      $('.bookmark-list-entry-title').val('');
      const newItemUrl = $('.bookmark-list-entry-url').val();
      $('.bookmark-list-entry-url').val('');
      const newItemDesc =  $('.bookmark-list-entry-description').val();
      $('.bookmark-list-entry-description').val('');
      const newItemRating = event.currentTarget.rating.value;
      api.createBookmark(newItemTitle, newItemUrl, newItemDesc, newItemRating, response => {
        store.addItem(response);
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
    $('#select').click( event => {
      const ratingVal = parseInt($('#select option:selected').val(), 10);
      store.setRatingFilter(ratingVal);
      console.log(store.ratingFilter);
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
  };

  return {
    render,
    bindEventListeners

  };
}());