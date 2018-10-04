'use strict';

const api =(function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/alex';
  //tested
  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  //tested
  const createBookmark = function(title, url, desc, rating, callback){
    const newBookmark = JSON.stringify({ title, url, desc, rating, });
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback
    });
  };

  //tested
  const deleteBookMark = function (id, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback
    });
  };

  return {
    getBookmarks,
    createBookmark,
    deleteBookMark
  };
}());