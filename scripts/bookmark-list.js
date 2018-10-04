'use strict';

const bookmarkList = (function(){
  //tested
  const generateBookmarkItemElement = function(item) {
    
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
    let list = store.list;
    const bookmarkListString = generateBookmarkListString(list);

    $('.bookmark-list').html(bookmarkListString);
  };

  const handleNewBookmarkSubmit = function () {
    $('#adding-bookmark-form').submit(event => {
      event.preventDefault();
      const newItemTitle = $('.bookmark-list-entry-title').val();
      const newItemUrl = $('.bookmark-list-entry-url').val();
      const newItemDesc =  $('.bookmark-list-entry-description').val();
      const newItemRating = event.currentTarget.rating.value;
      console.log(newItemTitle, newItemUrl, newItemDesc, newItemRating);
      api.createBookmark(newItemTitle, newItemUrl, newItemDesc, newItemRating, response => {
        console.log(response);
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
      window.open(bookmark.url, _blank);
    });
  };


  const bindEventListeners= function() {
    handleNewBookmarkSubmit();
    handleDeleteBookmarkClicked();
    handleVisitSiteClicked();
  };

  return {
    render,
    bindEventListeners

  };
}());