'use strict';

$(document).ready(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  api.getBookmarks(items => {
    items.forEach(item => store.addItem(item));
    store.addExpandedProp();
    bookmarkList.render();
  });
});
