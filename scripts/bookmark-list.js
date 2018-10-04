'use strict';

const bookmarkList = (function(){
  const generateBookmarkItemElement = function(item) {
    
    return `<li class="bookmark-item js-bookmark-element" data-item-id="${item.id}">
      <h4>${item.title} ${item.rating}/5</h4>
      </li>`;
  };
  const generateBookmarkList = function (bookmarkList) {
    const bookmarks = bookmarkList.map(item => generateBookmarkItemElement(item));
    return bookmarks.join('');
  };

  const render = function () {
    let list = store.items;
    if (store.addingItem === true) {
      let addItemElement = ``;
    }
    const bookmarkListString = generateBookmarkList(list);
    $('.bookmark-list').html(bookmarkListString);
  };

  return {
    render,

  }
}());