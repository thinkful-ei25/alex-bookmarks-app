'use strict';

const bookmarkList = (function(){
  const generateBookmarkItemElement = function(item) {
    
    return `<li class="bookmark-item js-bookmark-element" data-item-id="${item.id}">
      <h4>${item.title} ${item.rating}/5</h4>
      </li>`;
  };
  const generateBookmarkListString = function (bookmarkArr) {
    const bookmarks = bookmarkArr.map(item => generateBookmarkItemElement(item));
    return bookmarks.join('');
  };

  const render = function () {
    let list = store.list;
    const bookmarkListString = generateBookmarkListString(list);

    $('.bookmark-list').html(bookmarkListString);
  };

  const handleNewBookmarkSubmit = function () {
    $('.bookmark-list-controls').submit(event => {
      event.preventDefault();

    });
  };

  return {
    render,

  };
}());