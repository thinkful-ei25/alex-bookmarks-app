'use strict';

$(document).ready(function() {
  bookmarkList.render();
  api.getBookmarks(items => {
    items.forEach(item => store.addItem(item));
    bookmarkList.render();
  });
});