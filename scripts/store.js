'use strict';

const store = (function(){
  const addItem = function(item) {
    this.list.push(item);
  };

  return {
    list: [],
    addItem,
    addingItem: false,

  };

}());