'use strict';

const api =(function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/alex';
  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createBookmark = function(name, callback){
    const newBookmark = JSON.stringify({ name, });
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback
    });
  };

  return {
    getBookmarks,
    createBookmark,
  };
}());